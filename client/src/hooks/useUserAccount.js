/* eslint-disable no-unused-vars */
import {useMutation, useQuery} from 'react-query'
import {parseJSON} from '../helpers/parseJSON.js'
import queryClient from '../QueryClient.js'

export function useUserAccount() {
  const account = useQuery(
    'account',
    async () => {
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
