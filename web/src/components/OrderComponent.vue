<script setup lang="ts">
  defineProps(['order', 'total'])
  defineEmits(['validateCoupon', 'checkout'])
</script>

<template>
  <input type="text" v-model="order.cpf">
  
  <div v-for="orderItem in order.orderItems">
    {{ orderItem.idItem }}
    {{ orderItem.quantity }}
    <button @click="order.removeOrderItem(orderItem)">-</button>
  </div>
  <br/>
  
  <input type="text" v-model="order.coupon" @blur="$emit('validateCoupon', order.coupon)">
  <br/>
  Total - {{ total }}

  <br/>

  {{ order }}
  <button @click="$emit('checkout', order)">Checkout</button> <br />
</template>