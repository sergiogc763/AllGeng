<template>
  <div class="containt">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre:</label>
      <input
        type="text"
        class="form-control"
        id="nombre"
        v-model="nombre"
        placeholder="Nombre del producto"
      />
    </div>
    <div class="mb-3">
      <label for="precio" class="form-label">Precio:</label>
      <input type="number" id="precio" step="0.01" min="0" v-model="precio">
    </div>
    <div class="mb-3">
      <label for="imagen" class="form-label">Imagen:</label>
      <input type="file" id="imagen" :v-model="imagen">
    </div>
    <div class="mb-3">
        <div class="categorias">
          <select class="form-select" v-model="categoria">
            <option selected disabled>Seleccione una categoría</option>
            <option v-for="option in categorias" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="tipos">

        </div>
        <div class="marcas">

        </div>
    </div>
    <div class="mb-5">
      <label for="descripcion" class="form-label">Descripción:</label>
      <textarea class="form-control" id="descripcion" rows="3" :v-model="descripcion"></textarea>
    </div>
    <div class="options mb-2">
        <button type="button" class="btn btn-primary">
            Añadir
        </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from '@/core/general/RoutePaths';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, onBeforeMount, reactive } from 'vue';

//#region REF
  const nombre = ref<String>("")
  const precio = ref<Number>(1);
  const imagen = ref<File>()
  const descripcion = ref<String>("")

  const categoria = ref<any>("Seleccione una categoría");
  const categorias = reactive<Array<any>>([]);

  const tipo = ref<any>("Seleccione un tipo");
  const tipos = reactive<Array<any>>([]);

  const marca = ref<any>("Seleccione una marca");
  const marcas = reactive<Array<any>>([]);
//#endregion

onBeforeMount(()=>{
  getCategorias();//Obtenemos las categorías
})
    


//#region FUNCTIONS

function getCategorias(){
  //Recuperamos las categorías
    axios
    .get(`${RoutePaths.API}getCategorias.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.categorias.data.forEach((element: any) => {
            categorias.push({ text: element.categnom, value: element.categid })
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

function getTipos(){
  //Recuperamos las categorías
    axios
    .get(`${RoutePaths.API}getTipos.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.categorias.data.forEach((element: any) => {
            categorias.push({ text: element.categnom, value: element.categid })
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

function getMarcas(){
  //Recuperamos las categorías
    axios
    .get(`${RoutePaths.API}getMarcas.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
          // console.log(res);
          res.data.categorias.data.forEach((element: any) => {
            categorias.push({ text: element.categnom, value: element.categid })
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
//#endregion
</script>

<style lang="scss">
.containt {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(201, 201, 201);
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;

  input,
  textarea {
    width: 25vw;
  }

}
</style>
