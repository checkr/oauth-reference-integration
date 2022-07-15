import {toastSuccess, toastFailure} from '../helpers/toasts.js'

const fetchFirstAccount = async () => {
  const response = await fetch('/api/accounts')
  const jsonBody = await parseJSON(response)

  if (!response.ok) {
    throw jsonBody
  }

  localStorage.setItem(
    'reference-integration-session-token',
    jsonBody[0]['reference-integration-session-token'],
  )
  if (jsonBody.length > 0) return jsonBody[0]
  else return null
}

const fetchCandidates = async () => {
  const response = await fetch('/api/candidates')
  const jsonBody = await parseJSON(response)

  if (!response.ok) {
    throw jsonBody
  }

  return jsonBody
}

const editOrAddCandidate = async candidate => {
  const url = candidate.id
    ? `api/candidates/${candidate.id}`
    : 'api/candidates/'
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: candidate.id ? 'PUT' : 'POST',
    body: JSON.stringify(candidate),
  }

  const response = await fetch(url, options)
  const jsonBody = await parseJSON(response)

  if (!response.ok) {
    throw jsonBody
  }

  return jsonBody
}

const linkAccountToCheckr = async (accountId, code, createToast) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      accountId: accountId,
      code: code,
    }),
  }

  const response = await fetch('/api/checkr/oauth', options)
  const jsonBody = await parseJSON(response)

  if (!response.ok) {
    createToast(
      toastFailure({
        body: 'Your request to obtain an access token from Checkr was unable to be processed.',
        header: jsonBody.errors.checkrApiErrors.errors[0],
      }),
    )
    throw jsonBody
  }

  createToast(
    toastSuccess({
      body: 'Your Oauth token has been created successfully, please wait while your account is credentialed by Checkr.',
    }),
  )
  return jsonBody
}

const editAccount = async (accountId, changes) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(changes),
  }

  await fetch(`/api/accounts/${accountId}`, options)
}

const parseJSON = async response => {
  const text = await response.text()

  try {
    const json = JSON.parse(text)
    return json
  } catch (err) {
    throw err
  }
}

export {
  fetchFirstAccount,
  fetchCandidates,
  editOrAddCandidate,
  linkAccountToCheckr,
  editAccount,
}
