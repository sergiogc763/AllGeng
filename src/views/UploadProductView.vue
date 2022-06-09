<template>
  <div
    class="container tm-mt-big tm-mb-big"
    v-if="store.getters.logged && store.getters.rolId === RolUser.Gestor"
  >
    <div class="row">
      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
        <div class="tm-bg-primary tm-block tm-block-h-auto">
          <div class="row">
            <div class="col-12">
              <h2 class="tm-block-title d-flex justify-content-center">
                Add Product
              </h2>
            </div>
          </div>
          <form class="row tm-edit-product-row" enctype="multipart/form-data">
            <div class="col-xl-6 col-lg-6 col-md-12">
              <div class="form-group mb-3">
                <label for="name">Product Name </label>
                <input
                  id="name"
                  name="name"
                  v-model="state.nombre"
                  type="text"
                  class="form-control"
                />
                <span class="error" v-if="v$.nombre.$error">
                  {{ v$.nombre.$errors[0].$message }}
                </span>
              </div>
              <div class="form-group mb-3">
                <label for="description">Description</label>
                <textarea class="form-control" v-model="state.descripcion" rows="50"></textarea>
                <span class="error" v-if="v$.descripcion.$error">
                  {{ v$.descripcion.$errors[0].$message }}
                </span>
              </div>
              <div class="form-group mb-3">
                <label for="categoria">Category</label>
                <select
                  id="categoria"
                  class="custom-select tm-select-accounts"
                  v-model="state.categoria"
                >
                  <option selected value disabled>Select a category</option>
                  <option
                    v-for="option in categorias"
                    v-bind:value="option.value"
                    v-bind:key="option"
                  >
                    {{ option.text }}
                  </option>
                </select>
                <span class="error" v-if="v$.categoria.$error">
                  {{ v$.categoria.$errors[0].$message }}
                </span>
              </div>
              <div class="form-group mb-3">
                <label for="tipo">Type</label>
                <select
                  id="tipo"
                  class="custom-select tm-select-accounts"
                  v-model="state.tipo"
                >
                  <option selected value disabled>Select a type</option>
                  <option
                    v-for="option in tipos"
                    v-bind:value="option.value"
                    v-bind:key="option"
                  >
                    {{ option.text }}
                  </option>
                </select>
                <span class="error" v-if="v$.tipo.$error">
                  {{ v$.tipo.$errors[0].$message }}
                </span>
              </div>
              <div class="form-group mb-3">
                <label for="marca">Brand</label>
                <select
                  class="custom-select tm-select-accounts"
                  v-model="state.marca"
                >
                  <option selected value disabled>Select a brand</option>
                  <option
                    v-for="option in marcas"
                    v-bind:value="option.value"
                    v-bind:key="option"
                  >
                    {{ option.text }}
                  </option>
                </select>
                <span class="error" v-if="v$.marca.$error">
                  {{ v$.marca.$errors[0].$message }}
                </span>
              </div>
              <div class="row">
                <div class="form-group mb-3 col-xs-12 col-sm-6">
                  <label for="price">Price €</label>
                  <input
                    id="price"
                    name="price"
                    v-model="state.precio"
                    type="number"
                    min="1"
                    step="0.01"
                    class="form-control validate hasDatepicker"
                  />
                  <span class="error" v-if="v$.precio.$error">
                    {{ v$.precio.$errors[0].$message }}
                  </span>
                </div>
                <div class="form-group mb-3 col-xs-12 col-sm-6">
                  <label for="stock">Stock</label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="1"
                    class="form-control validate"
                    v-model="state.stock"
                  />
                  <span class="error" v-if="v$.stock.$error">
                    {{ v$.stock.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
              <div class="tm-product-img-dummy mx-auto">
                <img src="@/assets/new_product.png" />
              </div>
              <div class="custom-file mt-3 mb-3">
                <input
                  class="btn btn-primary btn-block mx-auto"
                  type="file"
                  id="images"
                  name="images[]"
                  multiple
                  ref="imagen"
                />
              </div>
            </div>
            <div class="col-12">
              <button
                type="button"
                class="btn btn-primary btn-block text-uppercase"
                @click="add()"
              >
                CREATE NEW PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Page404 v-else />
</template>

<script lang="ts" setup>
import Page404 from "@/components/Page404.vue";
import { RolUser } from "@/core/general/RolUser";
import { RoutePaths } from "@/core/general/RoutePaths";
import useVuelidate from "@vuelidate/core";
import { helpers, required, minLength, minValue } from "@vuelidate/validators";
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onBeforeMount, reactive, computed } from "vue";
import { useStore } from "vuex";

/*Vista utilizada para mostrar la función principal de un Gestor de productos, que es poder subir
un producto con sus características correspondientes*/

//#region STORE
const store = useStore();
//#endregion

const state = reactive({
  nombre: "",
  precio: 1,
  stock: 1,
  descripcion: "",
  categoria: "",
  tipo: "",
  marca: "",
});

//#region REF
// const nombre = ref<String>("");
// const precio = ref<Number>(1);
// const stock = ref<Number>(1);
const imagen = ref<any>(null);
// const descripcion = ref<any>("");

// const categoria = ref<any>("Seleccione una categoría");
const categorias = reactive<Array<any>>([]);

// const tipo = ref<any>("Seleccione un tipo");
const tipos = reactive<Array<any>>([]);

// const marca = ref<any>("Seleccione una marca");
const marcas = reactive<Array<any>>([]);
//#endregion

//#region VALIDATE
const rules = computed(() => {
  return {
    nombre: {
      required: helpers.withMessage("*Indique un nombre", required),
    },
    descripcion: {
      required: helpers.withMessage(
        "*Indique una breve descripción sobre el producto",
        required
      ),
    },
    categoria: {
      required: helpers.withMessage(
        "*Indique a que categoría pertenece",
        required
      ),
    },
    tipo: {
      required: helpers.withMessage("*Indique a que tipo pertenece", required),
    },
    marca: {
      required: helpers.withMessage("*Indique a que marca pertenece", required),
    },
    precio: {
      required,
      minValue: helpers.withMessage(
        "*El valor debe ser 0.01 o mayor a este",
        minValue(0.01)
      ),
    },
    stock: {
      required,
      minValue: helpers.withMessage(
        "*El valor debe ser 1 o mayor a este",
        minValue(1)
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);
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
  v$.value.$validate();
  if (!v$.value.$error) {
    if (imagen.value.files.lenght > 0) {
      await axios
        .post(`${RoutePaths.API}addProducto.php`, null, {
          params: {
            nombre: state.nombre,
            descripcion: state.descripcion,
            precio: state.precio,
            categoria: state.categoria,
            tipo: state.tipo,
            marca: state.marca,
            stock: state.stock,
          },
        })
        .then((response) => {
          switch (response.status) {
            case 200:
              if (response.data) {
                let formData = new FormData();
                for (let i = 0; i < imagen.value.files.length; i++) {
                  formData.append("files[]", imagen.value.files[i]);
                }
                axios
                  .post(`${RoutePaths.API}addFotosProducto.php`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "ERROR",
        text: "El producto debe tener una imagen como mínimo",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "ERROR",
      text: "Compruebe que todos los campos seas correctos",
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

async function getCategorias() {
  //Recuperamos las categorías
  await axios
    .get(`${RoutePaths.API}getCategorias.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
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
  //Recuperamos los tipos
  await axios
    .get(`${RoutePaths.API}getTipos.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
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
  //Recuperamos las marcas
  await axios
    .get(`${RoutePaths.API}getMarcas.php`)
    .then((res) => {
      switch (res.status) {
        case 200:
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
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

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
  border-radius: 5px;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
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
  color: rgba(245, 245, 245, 0.876);
  font-weight: bold;
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

.tm-bg-primary {
  background-color: #212529;
}
.tm-bg-gray {
  background-color: rgba(255, 255, 255, 0.05);
}

.text-color-titles {
  color: rgb(243, 243, 243);
  font-weight: bold;
}
.custom-select {
  width: 100%;
  border: none;
  color: #acc6de;
  height: 50px;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  padding: 15px;
  background: #50657b;
}

.tm-product-img-dummy {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40vw;
  }
}

.custom-file {
  display: flex;
  align-items: center;
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

.error {
  color: red;
}
</style>
