<template>
  <div class="body">
    <div class="filters mb-5">
      <div class="categorias">
        <select
          class="form-select"
          v-model="categoria"
          @change="filtro"
        >
          <option selected disabled>Seleccione una categoría</option>
          <option v-for="options in categorias" v-bind:value="options.value">
            {{ options.text }}
          </option>
        </select>
      </div>
      <div class="tipos">
        <select class="form-select" v-model="tipo" @change="filtro">
          <option selected disabled>Seleccione un tipo</option>
          <option v-for="options in tipos" v-bind:value="options.value">
            {{ options.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="cards">
      <CardProduct
        :producto="ob"
        v-for="ob in productosMostrar"
        @actualizarNombre="refreshDatos"
        @actualizarPrecio="refreshDatos"
        @actualizarDescripcion="refreshDatos"
        @deleteProduct="refreshDatos"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { Producto } from "../core/types/Product";
import CardProduct from "@/components/product/CardProduct.vue";
import Swal from "sweetalert2";

const productos = ref<Array<Producto>>([]);

const categoria = ref<any>("Seleccione una categoría");
const categorias = reactive<Array<any>>([]);

const tipo = ref<any>("Seleccione un tipo");
const tipos = reactive<Array<any>>([]);

const productosMostrar = ref<Array<Producto>>([]);

onBeforeMount(() => {
  refreshDatos();
  getCategorias();
  getTipos();
  console.log(categoria.value);
});

async function refreshDatos() {
  productos.value = [];
  await axios
    .get(`${RoutePaths.API}getProductos.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          console.log(res);
          if (res.data.products.data.length > 0) {
            res.data.products.data.forEach((element: any) => {
              const p: Producto = {
                id: element.prodid,
                nombre: element.prodnom,
                descripcion: element.proddesc,
                img: element.imagen,
                precio: element.prodprec,
                categoria: element.prodcategoria,
                tipo: element.prodtipo,
              };
              productos.value.push(p);
            });
            productosMostrar.value = productos.value;
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
}

async function getCategorias() {
  //Recuperamos las categorías
  await axios
    .get(`${RoutePaths.API}getCategorias.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.categorias.data.forEach((element: any) => {
            categorias.push({ text: element.categnom, value: element.categid });
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

async function getTipos() {
  //Recuperamos las categorías
  await axios
    .get(`${RoutePaths.API}getTipos.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.categorias.data.forEach((element: any) => {
            tipos.push({ text: element.tipnom, value: element.tipid });
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

function filtro() {
  if (!isNaN(categoria.value)) {
    productosMostrar.value = productos.value.filter((p) => {
      return p.categoria === categoria.value;
    });
  }

  if (!isNaN(tipo.value) && !isNaN(categoria.value)) {
    productosMostrar.value = productosMostrar.value.filter((p) => {
      return p.tipo === tipo.value;
    });
  } else if (!isNaN(tipo.value)) {
    productosMostrar.value = productos.value.filter((p) => {
      return p.tipo === tipo.value;
    });
  }

  // if (!isNaN(marca.value) && !isNaN(tipo.value)) {
  //   productosMostrar.value = productosMostrar.value.filter((p) => {
  //     return p.marca === tipo.marca;
  //   });
  // } else if (!isNaN(marca.value)) {
  //   productosMostrar.value = productos.value.filter((p) => {
  //     return p.marca === tipo.marca;
  //   });
  // }
}

</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  .cards {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    width: 95vw;
    border-radius: 5px;
  }
}
</style>
