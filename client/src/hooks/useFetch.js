import {useEffect} from 'react'

export const useFetch = (url, callback) => {
  useEffect(() => {
    fetch(url)
      .then(async response => {
        callback(await response.json())
      })
      .catch(e => {
        console.error(e)
      })
  }, [url, callback])
}
