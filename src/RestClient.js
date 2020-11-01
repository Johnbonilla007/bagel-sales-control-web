const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

export const httpDelete = (url, request) =>
  fetch(`${baseUrl}/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(request)
  }).then(r => r.json());

export const httpPost = (url, request) =>
  fetch(`${baseUrl}/${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(request)
  }).then(r => r.json());
