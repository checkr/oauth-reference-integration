export function getAccountStatus(account) {
  const deauthorizedAccount = account.data && account.data.deauthorized
  const connectedAccount = account.data && account.data.checkrAccount
  const disconnectedAccount =
    account.data && !account.data.checkrAccount && !deauthorizedAccount
  const uncredentialedAccount =
    connectedAccount && !account.data.checkrAccount.credentialed
  const credentialedAccount =
    connectedAccount && account.data.checkrAccount.credentialed

  return {
    deauthorizedAccount,
    connectedAccount,
    disconnectedAccount,
    uncredentialedAccount,
    credentialedAccount,
  }
}
