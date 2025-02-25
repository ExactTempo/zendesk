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

### Running and Testing the App

It is possible to run the server locally using `zcli apps:server`, but `zcli` doesn't support replacing secure
settings the same way the Zendesk proxy does. To get around this, we need to deploy the application as a private
application in our development Zendesk account.

```bash
zcli apps:update
```

## Deploying an Update

Package and upload the application via the [Zendesk Portal](https://apps.zendesk.com/apps). Run this in the root 
of the project.

```bash
zcli apps:package
```

Then, upload the package to Zendesk.

## Notes

* Logo
  * The framework will automatically use `logo-small.png` as the logo for the app. (128x128px)
  * The `logo.png` file is used in the marketplace listing. (320x320px)
* Descriptions
  * The `short_description` can only be 80 characters long
  * The `long_description` can only be 3000 characters long