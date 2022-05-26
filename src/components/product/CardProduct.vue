<template>
  <div class="card product">
    <img :src="src" class="card-img-top" alt="..." />
    <div class="card-body">
      <div class="top-body">
        <h5 class="card-title">{{ props.producto.nombre }}</h5>
        <font-awesome-icon icon="trash-can"  v-if="store.getters.rolId === RolUser.Gestor"/>
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
            <li><span class="dropdown-item" @click="actualizarPrecio()">Precio</span></li>
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
import axios from "axios";
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

const emit = defineEmits(['actualizarNombre','actualizarPrecio'])

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
    Swal.fire(`El nuevo nombre del producto es-> ${name}`);

    let formData = new FormData();
    formData.append("id", props.producto.id)
    formData.append("name", name)

     await axios.post(`${RoutePaths.API}updateNombreProducto.php`, formData)
     .then((response) => {
              switch (response.status) {
                case 200:
                  if (response.data) {
                    emit('actualizarNombre');
                    Swal.fire({
                      icon: "success",
                      title: "Nombre actualizado",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR",
                      text: "Error interno. Perdone las molestias",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }
                  break;

                case 404:
                  Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Error interno. No se ha encontrado la ruta",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  break;

                case 500:
                  Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Error interno. Fallo de API",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  break;
              }
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
   
  }else{
    Swal.fire(`No puede dejar el campo vacio`);
  }
}

async function actualizarPrecio() {

  const { value: precio } = await Swal.fire({
    title: "Modificar precio",
    input: "text",
    inputLabel: "Nuevo precio:",
    inputValue: props.producto.precio,
    showCancelButton: true,
  });

  if (precio) {
    Swal.fire(`El nuevo nombre del producto es-> ${precio}`);

    let formData = new FormData();
    formData.append("id", props.producto.id)
    formData.append("precio", precio)

     await axios.post(`${RoutePaths.API}updatePrecioProducto.php`, formData)
     .then((response) => {
              switch (response.status) {
                case 200:
                  if (response.data) {
                    emit('actualizarPrecio');
                    Swal.fire({
                      icon: "success",
                      title: "Precio actualizado",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR",
                      text: "Error interno. Perdone las molestias",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  }
                  break;

                case 404:
                  Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Error interno. No se ha encontrado la ruta",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  break;

                case 500:
                  Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Error interno. Fallo de API",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  break;
              }
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
   
  }else{
    Swal.fire(`No puede dejar el campo vacio`);
  }
}


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
