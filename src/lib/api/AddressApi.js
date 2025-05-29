export const addressCreate = async (token, id, {street, city, province, country, postal_code}) => {
  return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      street,
      city,
      province,
      country,
      postal_code
    })
  })
}

export const addressList = async (token, id) => {
  return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}