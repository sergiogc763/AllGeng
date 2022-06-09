<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid d-flex justify-content-between">
      <router-link class="navbar-brand" :to="RoutePaths.Home"
        ><img src="@/assets/logo.png" class="logo-principal"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="content-right">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 optionsnav">
            <li
              class="nav-item"
              @click="uploadProduct"
              v-if="store.state.User.rolid === RolUser.Gestor"
            >
              <OptionMainMenu :icono="'upload'" :texto="'Upload'" />

            </li>
            <li
              class="nav-item"
              @click="showHistorial"
              v-if="
                store.state.User.rolid === RolUser.Usuario &&
                store.state.User.logged === true
              "
            >
              <OptionMainMenu :icono="'scroll'" :texto="'Historial'" />

            </li>
            <li
              class="nav-item"
              @click="goLogin"
              v-if="!store.state.User.logged"
            >
              <OptionMainMenu :icono="'user-secret'" :texto="'Cuenta'" />
            </li>
            <li class="nav-item dropdown" v-else>
              <div class="useraccount nav-link" data-bs-toggle="dropdown">
                <div class="datos-cuenta">
                  <OptionMainMenu :icono="'circle-user'" :texto="''" />
                  <span>{{ store.getters.userName }}</span>
                </div>
              </div>
              <ul
                class="dropdown-menu cuenta-opciones"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="RoutePaths.UserOptions"
                    ><font-awesome-icon
                      icon="gears"
                      class="icon"
                    />Configuración</router-link
                  >
                </li>
                <li class="puntero">
                  <a class="dropdown-item" @click="logout"
                    ><font-awesome-icon
                      icon="right-from-bracket"
                      class="icon"
                    />Desconectar</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RoutePaths } from "@/core/general/RoutePaths";
import { RolUser } from "@/core/general/RolUser";
import Swal from "sweetalert2";
import OptionMainMenu from "./general/OptionMainMenu.vue";

/*Menú principal de navegación*/

//#region CONST USE
const store = useStore();
const router = useRouter();
//#endregion

//#region FUNCTIONS
function goLogin() {
  router.push({ name: "LoginView" });
}
function uploadProduct() {
  router.push({ name: "UploadProductView" });
}

function showHistorial() {
  router.push({ name: "UserHistorialView" });
}

function logout() {
  store.dispatch("logout");
  router.push({ name: "HomeView" });
  Swal.fire({
    icon: "success",
    title: "Se ha desconectado correctamente",
    showConfirmButton: false,
    timer: 2000,
  });
}
//#endregion
</script>

<style lang="scss" scoped>
.container-elements {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.logo-principal {
  width: 85px;
  height: 85px;
  margin: 0;
  padding: 0;
}

.content-right {
  display: flex;
  margin-right: 85px;
  .optionsnav {
    display: flex;
    align-items: center;

    .cuenta-opciones {
      li {
        .dropdown-item {
          .icon {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.datos-cuenta {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btnAccount {
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #a1a0a0;
  border: rgb(189, 189, 189);
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding: 5px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  .img-icons {
    margin-right: 10px;
    width: 25px;
  }
  span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  span:after {
    content: "\00bb";
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

  &:hover span {
    padding-right: 25px;
    color: white;
  }

  &:hover span:after {
    color: white;
    opacity: 1;
    right: 0;
  }
}

.puntero {
  cursor: pointer;
}
</style>
