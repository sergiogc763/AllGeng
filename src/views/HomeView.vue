<template>
  <div class="body">
    <div class="filters mb-2">
      <div class="categorias">
        <select class="form-select" v-model="categoria" @change="filtro">
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
      <div class="marcas">
        <select class="form-select" v-model="marca" @change="filtro">
          <option selected disabled>Seleccione una marca</option>
          <option v-for="option in marcas" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="order mb-1">
      <select class="form-select" v-model="orden" @change="ordenar">
        <option selected disabled>Ordenar por:</option>
        <option value="1">Precio de menor a mayor</option>
        <option value="2">Precio de mayor a menor</option>
        <option value="3">Nombre</option>
      </select>
    </div>
    <div class="option mb-2">
      <button class="btn btn-primary" @click="resetFilters()">
        Reiniciar filtro
      </button>
    </div>
    <div class="cards mb-2">
      <CardProduct
        v-for="ob in productosMostrar"
        :producto="ob"
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

const marca = ref<any>("Seleccione una marca");
const marcas = reactive<Array<any>>([]);

const orden = ref<any>("Ordenar por:");

const productosMostrar = ref<Array<Producto>>([]);

onBeforeMount(() => {
  refreshDatos();
  getCategorias();
  getTipos();
  getMarcas();
});

async function refreshDatos() {
  productos.value = [];
  await axios
    .get(`${RoutePaths.API}getProductos.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
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
                marca: element.prodmarca,
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
async function getMarcas() {
  //Recuperamos las categorías
  await axios
    .get(`${RoutePaths.API}getMarcas.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.categorias.data.forEach((element: any) => {
            marcas.push({ text: element.marcnom, value: element.marcid });
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
  productosMostrar.value = productos.value;

  if (!isNaN(categoria.value)) {
    productosMostrar.value = productosMostrar.value.filter((p) => {
      return p.categoria === categoria.value;
    });
  }

  if (!isNaN(tipo.value)) {
    productosMostrar.value = productosMostrar.value.filter((p) => {
      return p.tipo === tipo.value;
    });
  }

  if (!isNaN(marca.value)) {
    productosMostrar.value = productosMostrar.value.filter((p) => {
      return p.marca === marca.value;
    });
  }
}

function ordenar() {
  switch (orden.value) {
    case "1":
      productosMostrar.value.sort((a, b) => {
        return a.precio - b.precio;
      });
      break;
    
    case "2":
      productosMostrar.value.sort((a, b) => {
        return b.precio - a.precio;
      });
      break;

    case "3":
      productosMostrar.value.sort((a, b) => a.nombre.localeCompare(b.nombre))
      break;
  }
}

function resetFilters() {
  productosMostrar.value = productos.value;
  categoria.value = "Seleccione una categoría";
  tipo.value = "Seleccione un tipo";
  marca.value = "Seleccione una marca";
  orden.value = "Ordenar por:"
}
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;

  .filters {
    display: flex;

    div {
      margin: 10px;
    }
  }

  .cards {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    width: 95vw;
    border-radius: 5px;
  }
}
</style>
