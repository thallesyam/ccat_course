<script setup lang="ts">
  import { inject, onMounted, reactive } from 'vue';
import Order from '../entities/Order';
  import CatalogGateway from '../gateways/catalog-gateway'
  import Checkoutgateway from '../gateways/checkout-gateway'
  import Observer from '../entities/Observer'
import Item from '../entities/Item';
import ItemComponent from '../components/ItemComponent.vue';
import OrderComponent from '../components/OrderComponent.vue';

  const state = reactive({
    items: [] as Item[],
    order: new Order('48950236800'),
    total: 0,
    orders: []
  })

  const catalogGateway = inject('catalogGateway') as CatalogGateway
  const checkoutGateway = inject('checkoutGateway') as Checkoutgateway

  state.order.register(new Observer('addItem', () => {
    preview(state.order)
  }))

  state.order.register(new Observer('removeOrderItem', () => {
    preview(state.order)
  }))


  async function validateCoupon(coupon: string) {
    state.order.coupon = ''
    const isValid = await checkoutGateway.validateCoupon(coupon)

    if(isValid) {
      state.order.coupon = coupon
    }
    preview(state.order)
  }

  async function preview(order: any) {
    state.total = await checkoutGateway.preview(order)
  }
  
  async function checkout(order: any) {
    await checkoutGateway.checkout(order)
    state.order = new Order('48950236800')
  }

  async function getOrdersByCpf(cpf: string) {
    state.orders = await checkoutGateway.getOrdersByCpf(cpf)
  }

  onMounted(async () => {
    state.items = await catalogGateway.getItems()
  })

</script>

<template>
  <div v-for="item in state.items">
    <ItemComponent :item="item" @add="(item) => state.order.addItem(item)"></ItemComponent>
  </div>

  <OrderComponent 
    :order="state.order" 
    :total="state.total" 
    @validate-coupon="(code) => validateCoupon(code)" 
    @checkout="(order) => checkout(order)"
  >
  </OrderComponent>

  <button @click="getOrdersByCpf(state.order.cpf)">get orders by cpf</button>

  <br />

  <div v-for="order in state.orders">
    {{ order }}
  </div>
</template>

<style scoped>
</style>
