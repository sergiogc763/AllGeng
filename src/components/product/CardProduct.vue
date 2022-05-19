<template>
  <div class="card product">
    <img src="@/assets/n64.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ props.producto.nombre }}</h5>
      <p class="card-text">{{ props.producto.precio }} €</p>
    </div>
    <div class="card-footer text-muted">
      <button type="button" class="btn btn-primary" @click="verProducto()">
        Ver
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

function verProducto() {
  router.push({
    name: "ProductView",
    params: {
      nombre: props.producto.nombre.replace(/\s+/g, "-"),
      id: props.producto.id,
    },
  });
}
</script>

<style lang="scss" scoped>
.product {
  background-color: rgb(199, 199, 199);
  width: 225px;
  margin: 10px;
}

.card-footer {
  display: flex;
  justify-content: center;
}
</style>
