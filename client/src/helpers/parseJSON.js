export async function parseJSON(response) {
  const text = await response.text()

  try {
    const json = JSON.parse(text)
    return json
  } catch (err) {
    throw err
  }
}
