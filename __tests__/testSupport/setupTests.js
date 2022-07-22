// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
  process.env.CHECKR_API_URL = 'https://api.checkr-staging.com/v1'
  process.env.CHECKR_OAUTH_URL = 'https://api.checkr-staging.com/oauth'
  process.env.CHECKR_OAUTH_CLIENT_SECRET = 'test-secret'
  process.env.NODE_ENV = 'test'
  process.env.NODE_OPTIONS = '--experimental-vm-modules'
  process.env.NODE_NO_WARNINGS = 1 // Mute experimental warning logs in console.
  process.env.ENCRYPTION_SECRET_KEY =
    '65520b062cff37a7b7632d0da163025dc39b17497bb16de6c42c3820da88c825'
}
