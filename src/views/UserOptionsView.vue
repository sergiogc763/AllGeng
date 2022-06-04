<template>
  <div class="content" v-if="store.getters.logged">
    <div class="container">
      <div class="menu">
        <ul class="nav">
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-bs-toggle="button"
              autocomplete="off"
              @click="changeOption(1)"
            >
              Datos Personales
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              data-bs-toggle="button"
              autocomplete="off"
              @click="changeOption(2)"
            >
              Seguridad
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-danger btn-lg"
              data-bs-toggle="button"
              autocomplete="off"
              @click="deleteAccount()"
            >
              Eliminar cuenta
            </button>
          </li>
        </ul>
      </div>
      <div class="options">
        <InfoUser v-if="option === 1" />
        <SegurityUser v-if="option === 2" />
      </div>
    </div>
  </div>
  <Page404 v-else />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import InfoUser from "@/components/useroptions/InfoUser.vue";
import SegurityUser from "@/components/useroptions/SegurityUser.vue";
import { useStore } from "vuex";
import router from "../router/index";
import Swal from "sweetalert2";
import Page404 from "@/components/Page404.vue";
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";

//#region CONST

const store = useStore();
const option = ref<number>(0);

//#endregion

//#region FUNCTIONS
function changeOption(selected: number) {
  option.value = selected;
}

function deleteAccount() {
  Swal.fire({
    title: "¿Realmente desea eliminar permanentemente su cuenta?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `Cancelar`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      let formData = new FormData();
      formData.append("id", store.getters.userId);

      await axios
        .post(`${RoutePaths.API}deleteAccount.php`, formData)
        .then((response) => {
          switch (response.status) {
            case 200:
              if (response.data) {
                store.dispatch("logout");
                router.push({ name: "HomeView" });
                Swal.fire({
                  icon: "success",
                  title: "Se ha eliminado la cuenta.",
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

      
    }
  });
}

//#endregion
</script>

<style lang="scss" scoped>
.content {
  background-color: rgba(255, 255, 255, 0.964);

  .container {
    display: flex;
    justify-content: center;
    .menu {
      margin-top: 5px;
      .nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgb(214, 214, 214);
        padding: 15px;

        li {
          margin: 4px;
        }
      }
      border-radius: 5px;

      button {
        width: max-content;
      }
    }
  }
}
</style>
