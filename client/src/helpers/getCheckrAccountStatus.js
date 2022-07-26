export function getCheckrAccountStatus(account) {
  const connectedCheckrAccount = account.data && account.data.checkrAccount
  const disconnectedCheckrAccount = account.data && !account.data.checkrAccount
  const uncredentialedCheckrAccount =
    connectedCheckrAccount && !account.data.checkrAccount.credentialed
  const credentialedCheckrAccount =
    connectedCheckrAccount && account.data.checkrAccount.credentialed

  return {
    connectedCheckrAccount,
    disconnectedCheckrAccount,
    uncredentialedCheckrAccount,
    credentialedCheckrAccount,
  }
}
