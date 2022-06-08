<template>
<div class="container tm-mt-big tm-mb-big">
      <div class="row">
        <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div class="row">
              <div class="col-12">
                <h2 class="tm-block-title d-inline-block">Add Product</h2>
              </div>
            </div>
            <div class="row tm-edit-product-row">
              <div class="col-xl-6 col-lg-6 col-md-12">
                <form action="" class="tm-edit-product-form">
                  <div class="form-group mb-3">
                    <label for="name">Product Name
                    </label>
                    <input id="name" name="name" type="text" class="form-control validate" required="">
                  </div>
                  <div class="form-group mb-3">
                    <label for="description">Description</label>
                    <textarea class="form-control validate" rows="3" required=""></textarea>
                  </div>
                  <div class="form-group mb-3">
                    <label for="category">Category</label>
                    <select class="custom-select tm-select-accounts" id="category">
                      <option selected="">Select category</option>
                      <option value="1">New Arrival</option>
                      <option value="2">Most Popular</option>
                      <option value="3">Trending</option>
                    </select>
                  </div>
                  <div class="row">
                      <div class="form-group mb-3 col-xs-12 col-sm-6">
                          <label for="expire_date">Expire Date
                          </label>
                          <input id="expire_date" name="expire_date" type="text" class="form-control validate hasDatepicker" data-large-mode="true">
                        </div>
                        <div class="form-group mb-3 col-xs-12 col-sm-6">
                          <label for="stock">Units In Stock
                          </label>
                          <input id="stock" name="stock" type="text" class="form-control validate" required="">
                        </div>
                  </div>
                  
              </form></div>
              <div class="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                <div class="tm-product-img-dummy mx-auto">
                  <i class="fas fa-cloud-upload-alt tm-upload-icon" onclick="document.getElementById('fileInput').click();"></i>
                </div>
                <div class="custom-file mt-3 mb-3">
                  <input id="fileInput" type="file" style="display:none;">
                  <input type="button" class="btn btn-primary btn-block mx-auto" value="UPLOAD PRODUCT IMAGE" onclick="document.getElementById('fileInput').click();">
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block text-uppercase">Add Product Now</button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- <div class="main" v-if="store.getters.logged && store.getters.rolId === RolUser.Gestor">
    <form enctype="multipart/form-data" class="containt">
      <div class="mb-3 form-show">
        <label for="nombre" class="form-label">Nombre:</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="nombre"
          placeholder="Nombre del producto"
        />
      </div>
      <div class="mb-3 form-show">
        <label for="precio" class="form-label">Precio:</label>
        <div class="price"><input
          type="number"
          id="precio"
          step="0.01"
          min="0"
          v-model="precio"
        /><span> €</span></div>
        
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">Unidades:</label>
        <input
          type="number"
          id="stock"
          step="0.01"
          min="0"
          v-model="stock"
        /><span> uds</span>
      </div>
      <div class="mb-3">
        <label for="imagen" class="form-label">Imágenes:</label>
        <input type="file" id="images" name="images[]" multiple ref="imagen" />
      </div>
      <div class="mb-3">
        <div class="categorias form-show">
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
  <Page404 v-else/> -->
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
const stock = ref<Number>(1);
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
  axiosUpload();
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
        stock: stock.value
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
 
.tm-mt-big {
  margin-top: 57px;
}
.tm-mb-big {
  margin-bottom: 60px;
}
.tm-mt-small {
  margin-top: 20px;
}
.tm-block-col {
  margin-bottom: 30px;
}
.tm-block {
  padding: 40px;
  -webkit-box-shadow: 1px 1px 5px 0 #455c71;
  -moz-box-shadow: 1px 1px 5px 0 #455c71;
  box-shadow: 1px 1px 5px 0 #455c71;
  min-height: 350px;
  height: 100%;
  max-height: 450px;
}
.tm-block-h-auto {
  min-height: 1px;
  max-height: none;
  height: auto;
}
.tm-block-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 30px;
}
.form-control {
  background-color: #54657d;
  color: #fff;
  border: 0;
}
.form-control:focus {
  background-color: #60738e;
  color: #fff;
  border-color: transparent;
  box-shadow: 0 0 0 0.1rem rgb(180, 206, 233, 0.5);
}
.form-group label {
  color: #fff;
  margin-bottom: 10px;
}

.form-control {
  padding: 19px 18px;
  border-radius: 0;
  height: 50px;
}
.form-group {
  margin-bottom: 15px;
}
.btn {
  border-radius: 0;
  padding: 13px 28px;
  transition: all 0.2s ease;
  max-width: 100%;
}

.btn-primary {
  color: #fff;
  background-color: #f5a623;
  border: 2px solid #f5a623;
  font-size: 90%;
  font-weight: 600;
}
.btn-primary:active,
.btn-primary:hover {
  color: #f5a623;
  background-color: transparent;
  border: 2px solid #f5a623;
}


.tm-bg-primary-dark {
  background-color: #435c70;
}
.tm-bg-gray {
  background-color: rgba(0, 0, 0, 0.05);
}


.custom-select {
  width: 100%;
  border: none;
  color: #acc6de;
  height: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  padding: 15px;
  background: url(../img/arrow-down.png) 98% no-repeat #50657b;
}




.tm-product-img-dummy {
  max-width:75%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #aaa;
}

.custom-file{
  display:flex;
  align-items:center;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #394f62;
}
::-webkit-scrollbar-thumb {
  background: #6d8da6;
}
::-webkit-scrollbar-thumb:hover {
  background: #8ab5d6;
}

.tm-footer-link {
  color: white;
}

.tm-footer-link:hover,
.tm-footer-link:focus {
  color: #aacbea;
}

@media (min-width: 1200px) {
  .navbar-expand-xl .navbar-nav .nav-link {
    padding-left: 28px;
    padding-right: 28px;
  }
  .navbar-collapse {
    height: 100%;
  }
}
@media (min-width: 992px) {
  .navbar-expand-lg .navbar-nav .nav-link {
    padding: 15px 20px;
  }
}
@media (max-width: 1275px) and (min-width: 1200px) {
  .nav-item {
    margin-right: 15px;
  }
}
@media (max-width: 1350px) {
  .nav-item {
    margin-right: 1px;
  }
}
@media (max-width: 1199px) {
  .tm-col-big,
  .tm-col-small {
    width: 49.65%;
  }
  .navbar-collapse {
    padding: 0;
    box-shadow: rgba(255, 255, 255, 0.1) 0 1px 1px 1px;
    position: absolute;
    top: 72px;
    right: 20px;
    width: 200px;
    z-index: 1000;
  }
  .dropdown-menu {
    text-align: center;
  }
  .nav-link {
    color: #fff;
    background-color: #567086;
    padding: 15px;
    flex-direction: row;
  }
  .nav-link > i {
    font-size: 1rem;
    margin-right: 10px;
    margin-bottom: 0;
  }
  .nav-item {
    margin-right: 0;
  }
  .tm-block-taller {
    max-height: 520px;
  }
}
@media (max-width: 1199.98px) {
  .navbar-expand-xl > .container,
  .navbar-expand-xl > .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }
  .navbar-collapse {
    right: 15px;
  }
}
@media (max-width: 991px) {
  .tm-col-big,
  .tm-col-small {
    width: 100%;
    min-height: 383px;
    height: auto;
  }
  .tm-block {
    padding: 30px;
  }
}
@media (max-width: 767px) {
  .tm-col-account-settings,
  .tm-col-avatar {
    width: 100%;
    max-width: 100%;
  }
  .tm-block-avatar {
    display: flex;
    flex-direction: column;
  }
  .tm-avatar {
    align-self: center;
  }
  .tm-hide-sm {
    display: none;
  }
}
@media (max-width: 633px) {
  .page-item {
    margin-top: 10px;
  }
  .custom-select {
    background-position: 96%;
  }
}
@media (max-width: 574px) {
  .navbar-collapse {
    top: 47px;
  }
  .navbar {
    height: 50px;
  }
  .tm-site-title {
    font-size: 1.4rem;
    margin-left: 7px;
  }
  .tm-site-icon {
    font-size: 2em;
  }
}
@media (max-width: 480px) {
  .tm-mt-big {
    margin-top: 45px;
  }
  .tm-mb-big {
    margin-bottom: 45px;
  }
  #barChart,
  #lineChart {
    max-height: 350px;
  }
}

// .main {
//   background-color: rgba(255, 255, 255, 0.964);
//   display: flex;
//   justify-content: center;

//   .containt {
//     border-radius: 5px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     background-color: rgb(201, 201, 201);
//     width: fit-content;
//     margin-top: 10px;
//     margin-bottom: 10px;

//     input,
//     textarea {
//       width: 25vw;
//     }

//     #precio {
//       width: 10vw;
//     }
//   }

//   .form-label{
//     font-weight: bold;
//   }

//   .form-show{
//     display:flex;
//     align-items: center;
//     flex-direction: column;
//   }

//   .price{
//     display:flex;
//     margin: 5px;
//   }
// }
</style>
