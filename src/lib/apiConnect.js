import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9000/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchAllWidgets = () => api.get('/widgets').then(res => res.data)

export const createWidget = (widget) => api.post('/widgets', widget).then(res => res.data)

export const updateWidget = (name, updated) =>
  api.put(`/widgets/${encodeURIComponent(name)}`, updated).then(res => res.data)

export const deleteWidget = (name) =>
  api.delete(`/widgets/${encodeURIComponent(name)}`).then(res => res.data)

export const fetchWidgetByName = (name) =>
  api.get(`/widgets/${encodeURIComponent(name)}`).then(res => res.data);
