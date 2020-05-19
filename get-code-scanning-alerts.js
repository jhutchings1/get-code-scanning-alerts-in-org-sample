#!/usr/bin/env node

require('dotenv').config()
const pReduce = require('./lib/p-reduce');
const delay = require('delay');
const {Octokit} = require('@octokit/rest')
const octokit = new Octokit({
  auth: process.env.GH_AUTH_TOKEN,
  previews: ['dorian-preview']
})

var buffer = ""

const [, , ...args] = process.argv
const owner = args

console.log("org,repo,tool,rule_id,severity,open,created_at,closed_by,closed_at,url")
octokit
  .paginate(octokit.repos.listForOrg.endpoint.merge({org: owner}))
  .then(repositories =>
    pReduce(repositories, (repository) => {
      if (repository.archived) {
        return Promise.resolve();
      }
      const repo = repository.name

      return octokit
        .paginate("GET /repos/:owner/:repo/code-scanning/alerts?per_page=100", {
          owner: owner,
          repo: repo
        })
        .then(alerts => {
          if (alerts.length > 0) {

            pReduce(alerts, (alert) => {
              console.log(`${owner},${repo},${alert.tool},${alert.rule_id},${alert.rule_severity},${alert.open},${alert.created_at},${alert.closed_by},${alert.closed_at},${alert.html_url}`)
            }) 
          } 
          delay(300);
        })
        .catch(error => {
         // console.error(`Failed for ${owner}/${repo}\n${error.message}\n${error.documentation_url}`)
        })        
    })
    
  )
  .catch(error => {
    /**console.error(`Getting repositories for organization ${owner} failed.
    ${error.message} (${error.status})
    ${error.documentation_url}`)**/
  })
