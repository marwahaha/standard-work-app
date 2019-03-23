// 1 change urls
// const url = 'https://api.wrightmfg.com/request.php'
// const auth = 'Basic c3dfc3lzdGVtX3VzZXI6QTU1TDRrQTVLdnIqdFprTSloN3k='
const url = process.env.REACT_APP_API_URL

const apiRequest = async requestBody => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    const json = await response.json()
    return json
  } catch (error) {
    return {
      ERROR_ARRAY: {
        STATUS: 'ERROR',
        ERRORS: [error.message]
      },
      RESULTS_STATUS: {
        STATUS: 'RESULTS FOUND'
      }
    }
  }
}

export default apiRequest
