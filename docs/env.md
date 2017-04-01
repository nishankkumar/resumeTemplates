# Example env variables

Setup steps:
- Create empty `.env` file in root directory.
- Copy example and set correct variables.

Example:
```
# Application specific.
WEBSITE_HOSTNAME = worldview.stratfor.com # Domain name for WorldView (Default is localhost).
MARCOM_WEBSITE_HOSTNAME = marcom.stratfor.com # Domain name for Marcom (Default is localhost).

# Api configuration.
API_HOST =  worldview-api-dev.stratfor.com
API_PROTOCOL = https
API_ENDPOINT = /api/v3

BRIGHTCOVE_ID =
RECAPTCHA_SITE_KEY =

PIANO_AID = BRumrnrpDF
PIANO_DEBUG = true
PIANO_SANDBOX = true

GOOGLE_TAG_MANAGER_ID = GTM-KJR4ZWL

HUBSPOT_PORTAL_ID = 515194

FORUM_API_CLIENT_ID = 644347316
FORUM_URL = https://stratfor.vanillastaging.com/sso
```

Env specific variables:

`APP_HOST` - Host/IP addres for application server.
