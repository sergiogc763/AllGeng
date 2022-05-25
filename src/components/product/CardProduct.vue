<template>
  <div class="card product">
    <img :src="src" class="card-img-top" alt="..." />
    <div class="card-body">
      <div class="top-body">
        <h5 class="card-title">{{ props.producto.nombre }}</h5>
        <img
          src="@/assets/eliminar.png"
          v-if="store.getters.rolId === RolUser.Gestor"
          style="width: 25px; height: 25px"
        />
        <!-- <font-awesome-icon icon="trash-can" /> -->
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
        <div class="btn-group" role="group">
          <button
            id="btnOpciones"
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Modifcar
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnOpciones">
            <li><span class="dropdown-item" @click="actualizarNombre()">Nombre</span></li>
            <li><span class="dropdown-item">Precio</span></li>
            <li><span class="dropdown-item">Descripcion</span></li>
            <li><span class="dropdown-item">Marca</span></li>
            <li><span class="dropdown-item">Categoria</span></li>
            <li><span class="dropdown-item">Tipo</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
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

const src = RoutePaths.BASE + props.producto.img;
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

async function actualizarNombre() {

  const { value: name } = await Swal.fire({
    title: "Modificar nombre",
    input: "text",
    inputLabel: "Nuevo nombre:",
    inputValue: props.producto.nombre,
    showCancelButton: true,
  });

  if (name) {
    Swal.fire(`EL nuevo nombre del producto es-> ${name}`);
  }else{
    Swal.fire(`No puede dejar el campo vacio`);
  }
}

function eliminarProducto() {}
//#endregion
let formData = new FormData();
</script>

<style lang="scss" scoped>
.product {
  background-color: rgb(199, 199, 199);
  width: 14vw;
  margin: 10px;
}

.top-body {
  display: flex;
  justify-content: space-between;
}
.card-footer {
  display: flex;
  justify-content: center;

  .options-gestor {
    display: flex;
    justify-content: center;
    width: fit-content;
  }
}
</style>
