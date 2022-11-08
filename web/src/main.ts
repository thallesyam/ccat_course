import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './infra/axios-adapter'
import FetchAdapter from './infra/fetch-adapter'
import CatalogHttpGateway from './gateways/catalog-http-gateway'
import CheckoutHttpGateway from './gateways/checkout-http-gateway'

const app = createApp(App)

// const httpClient = new AxiosAdapter()
const httpClient = new FetchAdapter()
const catalogGateway = new CatalogHttpGateway(httpClient, 'http://localhost:3002')
const checkoutGateway = new CheckoutHttpGateway(httpClient, 'http://localhost:3000')

app.provide('catalogGateway', catalogGateway)
app.provide('checkoutGateway', checkoutGateway)

app.mount('#app')
