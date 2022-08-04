/* eslint-disable no-unused-vars */
import {useMutation, useQuery} from 'react-query'
import {parseJSON} from '../helpers/parseJSON.js'
import queryClient from '../QueryClient.js'

export function useCustomerAccount() {
  const account = useQuery(
    'account',
    async () => {
      const response = await fetch('/api/accounts')
      const jsonBody = await parseJSON(response)
      if (!response.ok) {
        throw jsonBody
      }

      // This reference implementation only has one account.
      const account = jsonBody[0]

      // Warning: storing a JWT token in local storage is not secure. It is
      // done here to simplify implementation. This code base is only
      // meant to show how to use Checkr's API and SDKs. It does not cover all
      // best practices for securing your system.
      localStorage.setItem('userJWT', account['userJWT'])

      return account
    },
    {
      refetchInterval: 5000,
    },
  )

  const update = useMutation(
    async (accountId, changes) => {
      const url = `/api/accounts/${accountId}`
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(changes),
      }

      const response = await fetch(url, options)
      const jsonBody = await parseJSON(response)

      if (!response.ok) {
        throw jsonBody
      }

      return jsonBody
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('account')
      },
    },
  )

  return {account, update}
}
