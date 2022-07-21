// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
  process.env.CHECKR_API_URL = 'https://api.checkr-staging.com'
  process.env.CHECKR_OAUTH_CLIENT_SECRET = 'test-secret'
  process.env.NODE_ENV = 'test'
  process.env.NODE_OPTIONS = '--experimental-vm-modules'
  process.env.NODE_NO_WARNINGS = 1 // Mute experimental warning logs in console.
}
