export function getCheckrAccountStatus(account) {
  const deauthorizedCheckrAccount = account.data && account.data.deauthorized
  const connectedCheckrAccount = account.data && account.data.checkrAccount
  const disconnectedCheckrAccount =
    account.data && !account.data.checkrAccount && !deauthorizedCheckrAccount
  const uncredentialedCheckrAccount =
    connectedCheckrAccount && !account.data.checkrAccount.credentialed
  const credentialedCheckrAccount =
    connectedCheckrAccount &&
    account.data.checkrAccount.credentialed &&
    !deauthorizedCheckrAccount

  return {
    deauthorizedCheckrAccount,
    connectedCheckrAccount,
    disconnectedCheckrAccount,
    uncredentialedCheckrAccount,
    credentialedCheckrAccount,
  }
}
