# Zendesk
This is the Zendesk application that gets submitted to Zendesk. It contains the code necessary to display ExactTempo 
information within Zendesk's UI.

## Local Development

The Zendesk CLI is required to run and test this application locally. See the next section for instructions on how to
install the Zendesk CLI.

### Install CLI

If you don't have it installed, you can install it by running the following command:

```bash
sudo npm install @zendesk/zcli -g
```

Verify it is installed by running:

```bash
zcli help
```

Next, you'll need to log into your Zendesk account. You can do this by running:

```bash
zcli login -i
```

Enter `d3v-exacttempo` as the subdomain. Enter your personal Zendesk API token when prompted.

### Running the App

To  run the app locally, you can run the following command:

```bash
zcli apps:server
```

With the server running, you can append `?zcli_apps=true` to the end of a Zendesk ticket's URL to see the app's UI.

## Notes

* Logo
  * The framework will automatically use `logo-small.png` as the logo for the app. (128x128px)
  * The `logo.png` file is used in the marketplace listing. (320x320px)