<template>
  <div class="main" v-if="store.getters.logged && store.getters.rolId === RolUser.Gestor">
    <form enctype="multipart/form-data" class="containt">
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
        <input
          type="number"
          id="precio"
          step="0.01"
          min="0"
          v-model="precio"
        /><span> €</span>
      </div>
      <div class="mb-3">
        <label for="unidades" class="form-label">Unidades:</label>
        <input
          type="number"
          id="precio"
          step="0.01"
          min="0"
          v-model="unidades"
        /><span> €</span>
      </div>
      <div class="mb-3">
        <label for="imagen" class="form-label">Imágenes:</label>
        <input type="file" id="images" name="images[]" multiple ref="imagen" />
      </div>
      <div class="mb-3">
        <div class="categorias">
          <select class="form-select" v-model="categoria">
            <option selected disabled>Seleccione una categoría</option>
            <option v-for="options in categorias" v-bind:value="options.value">
              {{ options.text }}
            </option>
          </select>
        </div>
        <div class="tipos">
          <select class="form-select" v-model="tipo">
            <option selected disabled>Seleccione un tipo</option>
            <option v-for="options in tipos" v-bind:value="options.value">
              {{ options.text }}
            </option>
          </select>
        </div>
        <div class="marcas">
          <select class="form-select" v-model="marca">
            <option selected disabled>Seleccione una marca</option>
            <option v-for="option in marcas" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-5">
        <label for="descripcion" class="form-label">Descripción:</label>
        <textarea
          class="form-control"
          id="descripcion"
          rows="3"
          v-model="descripcion"
        ></textarea>
      </div>
      <div class="options mb-2">
        <button type="button" class="btn btn-primary" @click="add()">
          Añadir
        </button>
      </div>
    </form>
  </div>
  <Page404 v-else/>
</template>

<script lang="ts" setup>
import Page404 from "@/components/Page404.vue";
import { RolUser } from "@/core/general/RolUser";
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

//#region USE
const store = useStore();
//#endregion

//#region REF
const nombre = ref<String>("");
const precio = ref<Number>(1);
const unidades = ref<Number>(1);
const imagen = ref<any>(null);
const descripcion = ref<any>("");

const categoria = ref<any>("Seleccione una categoría");
const categorias = reactive<Array<any>>([]);

const tipo = ref<any>("Seleccione un tipo");
const tipos = reactive<Array<any>>([]);

const marca = ref<any>("Seleccione una marca");
const marcas = reactive<Array<any>>([]);
//#endregion

onBeforeMount(() => {
  getCategorias(); //Obtenemos las categorías
  getTipos(); //Obtenemos los tipos
  getMarcas(); //Obtenemos las marcas
});

//#region FUNCTIONS
const add = async () => {
  // debugger;
  console.log(categoria.value);
  console.log("selected file", imagen.value.files);

  axiosUpload();
  //Upload to server
};

async function axiosUpload() {
  await axios
    .post(`${RoutePaths.API}addProducto.php`, null, {
      params: {
        nombre: nombre.value,
        descripcion: descripcion.value,
        precio: precio.value,
        categoria: categoria.value,
        tipo: tipo.value,
        marca: marca.value,
      },
    })
    .then((response) => {
      switch (response.status) {
        case 200:
          if (response.data) {
            let formData = new FormData();
            for(let i=0; i<imagen.value.files.length;i++){
              formData.append("files[]", imagen.value.files[i]);
            }
            // formData.append("imagenes", imagen.value.files[0]);
            axios
              .post(`${RoutePaths.API}addFotosProducto.php`, formData, {
                headers:{
                  'Content-Type': 'multipart/form-data'
                }    
              })
              .then((response) => {
                switch (response.status) {
                  case 200:
                    if (response.data) {
                      Swal.fire({
                        icon: "success",
                        title: "Nuevo producto añadido",
                        text: "Se ha añadido correctamente el nuevo producto",
                        showConfirmButton: false,
                        timer: 1000,
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
//#endregion
</script>

<style lang="scss" scoped>
.main {
  background-color: rgba(255, 255, 255, 0.964);
  display: flex;
  justify-content: center;

  .containt {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(201, 201, 201);
    width: fit-content;
    margin-top: 10px;
    margin-bottom: 10px;

    input,
    textarea {
      width: 25vw;
    }

    #precio {
      width: 10vw;
    }
  }
}
</style>
