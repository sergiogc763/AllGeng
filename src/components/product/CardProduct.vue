<template>
  <div class="card product">
    <!-- <img src="..." class="card-img-top" alt="..." /> -->
    <div class="card-body">
      <h5 class="card-title">{{ props.producto.nombre }}</h5>
      <p class="card-text">
        {{props.producto.precio}}
      </p>
    </div>
    <div class="card-footer text-muted">
      <button type="button" class="btn btn-primary">Primary</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.product {
    background-color: green;
    width: 150px;
    margin: 10px;
  }</style>
