/* eslint-disable no-unused-vars */
import {useMutation, useQuery} from 'react-query'
import {parseJSON} from '../helpers/parseJSON.js'
import queryClient from '../QueryClient.js'

export function useCandidates() {
  const candidates = useQuery('candidates', async () => {
    const response = await fetch('/api/candidates')
    const jsonBody = await parseJSON(response)

    if (!response.ok) {
      throw jsonBody
    }

    return jsonBody
  })

  const create = useMutation(
    async candidate => {
      const url = 'api/candidates/'
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(candidate),
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
        queryClient.invalidateQueries('candidates')
      },
    },
  )

  const update = useMutation(
    async candidate => {
      const url = `api/candidates/${candidate.id}`
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(candidate),
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
        queryClient.invalidateQueries('candidates')
      },
    },
  )

  return {candidates, create, update}
}
