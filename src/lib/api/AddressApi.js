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

export const addressDetail = async (token, id, addressId) => {
  return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const addressUpdate = async (token, id, addressId, {street, city, province, country, postal_code}) => {
  return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
    method: 'PUT',
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

export const addressDelete = async (token, id, addressId) => {
  return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}