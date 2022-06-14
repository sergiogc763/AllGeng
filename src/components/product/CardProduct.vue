<template>
  <div class="card product">
    <img
      :src="RoutePaths.BASE + src"
      class="card-img-top imgTop"
      alt="..."
      @click="verProducto()"
    />
    <div class="card-body">
      <div class="top-body">
        <h5 class="card-title" @click="verProducto()">
          {{ props.producto.nombre }}
        </h5>
        <font-awesome-icon
          icon="trash-can"
          v-if="store.getters.rolId === RolUser.Gestor"
          @click="deleteProduct()"
        />
      </div>

      <p class="card-text" @click="verProducto()">
        {{ props.producto.precio }} €
      </p>
    </div>
    <div class="card-footer" v-if="store.getters.rolId === RolUser.Gestor">
      <div class="options-gestor">
        <div class="btn-group dropup" role="group">
          <button
            id="btnOpciones"
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ $t("update") }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnOpciones">
            <li>
              <span class="dropdown-item" @click="actualizarNombre()">{{
                $t("name")
              }}</span>
            </li>
            <li>
              <span class="dropdown-item" @click="actualizarPrecio()">{{
                $t("price")
              }}</span>
            </li>
            <li>
              <span class="dropdown-item" @click="actualizarStock()"
                >Stock</span
              >
            </li>
            <li>
              <span class="dropdown-item" @click="actualizarDescripcion()">{{
                $t("description")
              }}</span>
            </li>
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RolUser } from "../../core/general/RolUser";
import { useI18n } from "vue-i18n";

/*Muestra los productos que se encuentra en el almacen. A su vez,
dependiendo del tipo de usuario que acceda a la aplicación, podrá
ver opciones para gestionar los datos de este*/

//#region PROPS
const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
});
//#endregion

//#region EMITS
const emit = defineEmits([
  "actualizarNombre",
  "actualizarPrecio",
  "actualizarStock",
  "actualizarDescripcion",
  "deleteProduct",
]);
//#endregion

//#region COMPUTED
const src = computed(() => {
  return props.producto.img;
});
//#endregion

//#region USE
const router = useRouter();
const store = useStore();
const t = useI18n();
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
    title: t.t("titleUpdateName"),
    input: "text",
    inputLabel: `${t.t("labelUpdateName")}:`,
    inputValue: props.producto.nombre,
    showCancelButton: true,
  });

  if (name) {
    let formData = new FormData();
    formData.append("id", props.producto.id);
    formData.append("name", name);

    await axios
      .post(`${RoutePaths.API}updateNombreProducto.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            if (response.data) {
              emit("actualizarNombre");
              Swal.fire({
                icon: "success",
                title: t.t("resultUpdateName"),
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error200"),
                showConfirmButton: false,
                timer: 2000,
              });
            }
            break;

          case 404:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error404"),
              showConfirmButton: false,
              timer: 2000,
            });
            break;

          case 500:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error500"),
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
    Swal.fire(t.t('warningAllCorrect'));
  }
}

async function actualizarPrecio() {
  const { value: precio } = await Swal.fire({
    title: t.t('titleUpdatePrice'),
    input: "text",
    inputLabel: t.t('labelUpdatePrice'),
    inputValue: props.producto.precio,
    showCancelButton: true,
  });

  if (precio) {
    let formData = new FormData();
    formData.append("id", props.producto.id);
    formData.append("precio", precio);

    await axios
      .post(`${RoutePaths.API}updatePrecioProducto.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            if (response.data) {
              emit("actualizarPrecio");
              Swal.fire({
                icon: "success",
                title: t.t('resultUpdatePrice'),
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error200"),
                showConfirmButton: false,
                timer: 2000,
              });
            }
            break;

          case 404:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error404"),
              showConfirmButton: false,
              timer: 2000,
            });
            break;

          case 500:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error500"),
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
    Swal.fire(t.t('warningAllCorrect'));
  }
}

async function actualizarStock() {
  const { value: stock } = await Swal.fire({
    title: t.t('titleUpdateStock'),
    input: "text",
    inputLabel: t.t('labelUpdateStock'),
    inputValue: props.producto.stock,
    showCancelButton: true,
  });

  if (stock) {

    let formData = new FormData();
    formData.append("id", props.producto.id);
    formData.append("stock", stock);

    await axios
      .post(`${RoutePaths.API}updateStoreProduct.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            if (response.data) {
              emit("actualizarStock");
              Swal.fire({
                icon: "success",
                title: t.t('resultUpdateStock'),
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error200"),
                showConfirmButton: false,
                timer: 2000,
              });
            }
            break;

          case 404:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error404"),
              showConfirmButton: false,
              timer: 2000,
            });
            break;

          case 500:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error500"),
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
    Swal.fire(t.t('warningAllCorrect'));
  }
}

async function actualizarDescripcion() {
  const { value: descripcion } = await Swal.fire({
    title: t.t('titleUpdateDescription'),
    input: "textarea",
    inputLabel: t.t('labelUpdateDescription'),
    inputValue: props.producto.descripcion,
    showCancelButton: true,
  });

  if (descripcion) {

    let formData = new FormData();
    formData.append("id", props.producto.id);
    formData.append("descripcion", descripcion);

    await axios
      .post(`${RoutePaths.API}updateDescripcionProducto.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            if (response.data) {
              emit("actualizarDescripcion");
              Swal.fire({
                icon: "success",
                title: t.t('resultUpdateDescription'),
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error200"),
                showConfirmButton: false,
                timer: 2000,
              });
            }
            break;

          case 404:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error404"),
              showConfirmButton: false,
              timer: 2000,
            });
            break;

          case 500:
            Swal.fire({
              icon: "error",
              title: t.t("titleWarning"),
              text: t.t("error500"),
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
    Swal.fire(t.t('warningAllCorrect'));
  }
}

function deleteProduct() {
  Swal.fire({
    title: t.t('titleDeleteProduct'),
    showDenyButton: true,
    confirmButtonText: t.t('delete'),
    denyButtonText: t.t('cancel'),
  }).then(async (result) => {
    if (result.isConfirmed) {
      let formData = new FormData();
      formData.append("id", props.producto.id);

      await axios
        .post(`${RoutePaths.API}deleteProduct.php`, formData)
        .then((response) => {
          switch (response.status) {
            case 200:
              if (response.data) {
                emit("deleteProduct");
                Swal.fire({
                  icon: "success",
                  title: t.t('resultDeleteProducto'),
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: t.t("titleWarning"),
                  text: t.t("error200"),
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
              break;

            case 404:
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error404"),
                showConfirmButton: false,
                timer: 2000,
              });
              break;

            case 500:
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error500"),
                showConfirmButton: false,
                timer: 2000,
              });
              break;
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else if (result.isDenied) {
      Swal.fire(t.t('cancelDelete'));
    }
  });
}
//#endregion
</script>

<style lang="scss" scoped>
.product {
  border: 1px solid #212529;
  background-color: rgb(199, 199, 199);
  width: 202px;
  margin: 10px;
  cursor: pointer;

  .imgTop {
    width: 200px;
    height: 200px;
  }

  .card-body {
    background-color: #212529;
    color: rgba(255, 255, 255, 0.861);
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
}
</style>
