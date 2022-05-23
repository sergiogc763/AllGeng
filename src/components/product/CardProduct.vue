<template>
  <div class="card product">
    <img src="@/assets/n64.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <div class="top-body">
        <h5 class="card-title">{{ props.producto.nombre }}</h5>
        <img src="@/assets/eliminar.png" v-if="store.getters.rolId === RolUser.Gestor" style="width: 25px;height: 25px;">
        </div>
      
      <p class="card-text">{{ props.producto.precio }} €</p>
    </div>
    <div class="card-footer text-muted">
      <button
        type="button"
        class="btn btn-primary"
        @click="verProducto()"
        v-if="store.getters.rolId !== RolUser.Gestor"
      >
        Ver
      </button>
      <div class="options-gestor" v-else>
        <button
          type="button"
          class="btn btn-primary"
          @click="actualizarProducto()"
        >
          Nombre
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="eliminarProducto()"
        >
          Precio
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="eliminarProducto()"
        >
          Descripcion
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="eliminarProducto()"
        >
          Imagen
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RolUser } from "../../core/general/RolUser";

//#region PROPS

const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
});
//#endregion

//#region USE
const router = useRouter();
const store = useStore();
//#endregion

//#region FUNCTIONS
function verProducto() {
  router.push({
    name: "ProductView",
    params: {
      nombre: props.producto.nombre.replace(/\s+/g, "-"),
      id: props.producto.id,
    },
  });
}

function actualizarProducto() {
  router.push({
    name: "UpdateProductView",
    params: {
      nombre: props.producto.nombre.replace(/\s+/g, "-"),
      id: props.producto.id,
    },
  });

}

function eliminarProducto() {

}
//#endregion
</script>

<style lang="scss" scoped>
.product {
  background-color: rgb(199, 199, 199);
  width: 14vw;
  margin: 10px;
}

.top-body{
  display: flex;
  justify-content: space-between;
}
.card-footer {
  display: flex;
  justify-content: center;

  .options-gestor {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    
    button{
      width: 5vw;
      margin: 2px;
    }
  }
}
</style>
