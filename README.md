# Get code scanning alerts in org 
This repo demonstrates how to use the GitHub code scanning API to export all the alerts on an organization to a CSV file. This makes it possible for a security team to quickly audit the known vulnerabilities across their organizations that are using GitHub Advanced Security

### Running the script
1. Clone this repo to your local machine
2. Create a file called .env 
3. Create a [GitHub Token](https://github.com/settings/tokens) which has the `repo` > `security_events` permission. (`repo` permission is needed for private repo)
4. Add the token to your .env file as shown `GH_AUTH_TOKEN=inserttokenhere`
5. Run `npm install` to install node dependencies
6. Run `node get-code-scanning-alerts.js orgname > output.csv` where `orgname` is the name of your target org. Note, if SSO is enabled on your org, you will need to SSO enable your token

### License
This project is licensed under the MIT License. 
