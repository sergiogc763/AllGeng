<template>
  <div class="body">
    <div class="content">
      <CardProduct :producto="ob" v-for="ob in productos" @actualizarNombre="refreshDatos"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { Producto } from "../core/types/Product";
import CardProduct from "@/components/product/CardProduct.vue";
import Swal from "sweetalert2";

const productos = ref<Array<Producto>>([]);

onBeforeMount(() => {
  refreshDatos();
});

function refreshDatos(){
  axios
    .get(`${RoutePaths.API}getProductos.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.products.data.forEach((element: any) => {
            const p: Producto = {
              id: element.prodid,
              nombre: element.prodnom,
              descripcion: element.proddesc,
              img: element.imagen,
              precio: element.prodprec,
            };
            productos.value.push(p);
          });
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
.body {
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  .content {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 5px;
  }
}
</style>
