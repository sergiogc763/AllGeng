<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid d-flex align-items-center">
      <router-link class="navbar-brand" :to="RoutePaths.Home"
        ><img src="@/assets/logo.png" class="logo-principal"
      /></router-link>
      <div class="btn-group dropend">
        <OptionMainMenu :icono="''" :texto="$t('languages')" :dropdown="true"/>
        <ul class="dropdown-menu">
          <li @click="changeLanguage('es')">
            <button class="dropdown-item d-flex justify-content-center">
              <img class="bandera" src="@/assets/es.jpg" />
            </button>
          </li>
          <li @click="changeLanguage('en')">
            <button class="dropdown-item d-flex justify-content-center">
              <img class="bandera" src="@/assets/en.png" />
            </button>
          </li>
        </ul>
      </div>
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
      <div class="collapse navbar-collapse d-flex justify-content-md-end" id="navbarSupportedContent">
        <div class="content-right">
          <ul class="navbar-nav me-auto mb-sm-2 mb-lg-0 optionsnav">
            <li
              class="nav-item mb-2 mb-lg-0"
              @click="uploadProduct"
              v-if="store.state.User.rolid === RolUser.Gestor"
            >
              <OptionMainMenu :icono="'upload'" :texto="$t('upload')"  :dropdown="false"/>
            </li>
            <li
              class="nav-item mb-2 mb-lg-0"
              @click="showHistorial"
              v-if="
                store.state.User.rolid === RolUser.Usuario &&
                store.state.User.logged === true
              "
            >
              <OptionMainMenu :icono="'scroll'" :texto="$t('history')" :dropdown="false"/>
            </li>
            <li
              class="nav-item mb-2 mb-lg-0"
              @click="goLogin"
              v-if="!store.state.User.logged"
            >
              <OptionMainMenu :icono="'user-secret'" :texto="$t('account')" :dropdown="false"/>
            </li>
            <li class="nav-item mb-2 mb-lg-0" v-else>
              <div class="btn-group datos-cuenta">
                <OptionMainMenu :icono="'circle-user'" :texto="''" :dropdown="true"/>
                <span class="nameUser">{{store.getters.userName}}</span>
                <ul class="dropdown-menu cuenta-opciones">
                  <li>
                  <router-link
                    class="dropdown-item"
                    :to="RoutePaths.UserOptions"
                    ><font-awesome-icon icon="gears" class="icon" />{{
                      $t("configuration")
                    }}</router-link
                  >
                </li>
                <li class="puntero">
                  <a class="dropdown-item" @click="logout"
                    ><font-awesome-icon
                      icon="right-from-bracket"
                      class="icon"
                    />{{ $t("disconnect") }}</a
                  >
                </li>
                </ul>
              </div>
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
import i18n from "@/locales/i18n";

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

function showAccountConfiguration() {
  router.push({ name: "UserOptionsView" });
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

function changeLanguage(language: string) {
  i18n.global.locale = language;
}
//#endregion
</script>

<style lang="scss" scoped>
.container-elements {

  justify-content: space-between;
  align-items: center;
  display: flex;
}

.logo-principal {
  width: 85px;
  height: 85px;
  margin: 0px;
  padding: 0px;
}

.content-right {
  display: flex;
  margin-right: 50px;
  .optionsnav {
    display: flex;
    align-items: center;
  
    .cuenta-opciones {
      li {
        .dropdown-item {
          .icon {
            margin-right:10px;
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

.nameUser{
  color: white;
  font-weight: bold;
}
.bandera {
  width: 25px;
  height: 25px;
}
.puntero {
  cursor: pointer;
}
</style>
