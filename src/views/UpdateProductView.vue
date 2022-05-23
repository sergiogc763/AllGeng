<template>
  <form class="update-producto">
    <div class="nombre">
      <input type="text" v-model="updateProducto.nombre" />
    </div>
    <div class="precio">
      <input type="number" v-model="updateProducto.precio" />
    </div>
    <div class="descripcion">
      <input type="text" v-model="updateProducto.descripcion" />
    </div>
    <!-- <div class="imagen">
      <input type="file" /> 
      <img :src="producto.img" style="width: 100px; height: 100px;"/>
    </div> -->
    <div class="options">
        <button class="btn btn-primary">Guardar cambios</button>
        <button class="btn btn-warning">Resetar campos</button>
        <button class="btn btn-danger">Cancelar</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import Swal from "sweetalert2";
import { reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

onBeforeMount(() => {
  getProductById();
});

const route = useRoute();

const producto = {
  nombre: "",
  precio: 0,
  descripcion: "",
  img: "",
};

const updateProducto = reactive({
  nombre: producto.nombre,
  precio: producto.precio,
  descripcion: producto.descripcion,
  img: producto.img,
});

async function getProductById() {
  const formData = new FormData();
  const id: any = route.params.id;
  formData.append("id", id);

  await axios
    .post(`${RoutePaths.API}getProductById.php`, formData)
    .then((response) => {
      switch (response.status) {
        case 200:
          producto.nombre = response.data.response.prodnom;
          producto.precio = response.data.response.prodprec;
          producto.descripcion = response.data.response.proddesc;
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
}
</script>

<style lang="scss" scoped>
.update-producto{
    background-color: rgb(226, 226, 226);
    width: 25vw;
    margin: 10px;
    border-radius: 5px;

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    input{
        width: 25vw;
    }

    button{
        width: 10vw;
    }
    .options{
        display: flex;
        
        align-items: center;
    }
}
</style>
