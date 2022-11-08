<script setup lang="ts">
  defineProps(['item'])
  defineEmits(['add'])
</script>

<template>
  {{ item.description }}
  {{ item.price }}
  <button @click="$emit('add', item)">Add</button>
</template>