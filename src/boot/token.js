import { boot } from "quasar/wrappers"

const token = sessionStorage.getItem('access_token')

const base64Url = token ? token.split('.')[1] : ' '
const base64 = base64Url ? base64Url.replace(/-/g, '+').replace(/_/g, '/') : ''
const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

export default boot(( { app } ) => {
    app.config.globalProperties.$token = jsonPayload ? JSON.parse(jsonPayload) : ''
})

export { token }
