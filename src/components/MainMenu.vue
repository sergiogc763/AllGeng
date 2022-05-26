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
              <button class="button btnAccount"><font-awesome-icon icon="upload" /><span>Upload</span></button>
            </li>
            <li
              class="nav-item"
              @click="goLogin"
              v-if="!store.state.User.logged"
            >
              <button class="button btnAccount"><font-awesome-icon icon="user-secret"/><span>Cuenta</span></button>

            </li>
            <li class="nav-item dropdown" v-else>
              <div
                class="useraccount nav-link"
                data-bs-toggle="dropdown"
              >
                <button class="button btnAccount"><font-awesome-icon icon="circle-user"/><span>Cuenta</span></button>
              </div>

              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <font-awesome-icon icon="gears"/>
                  <router-link
                    class="dropdown-item"
                    :to="RoutePaths.UserOptions"
                    >Configuración</router-link
                  >
                </li>
                <li>
                  <font-awesome-icon icon="right-from-bracket" />
                  <router-link class="dropdown-item" to=""
                    >Desconectar</router-link
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
import { RolUser } from '@/core/general/RolUser';


//#region CONST
const store = useStore();
const router = useRouter();
//#endregion

//#region 
function goLogin() {
  router.push({ name: "LoginView" });
}
function uploadProduct(){
   router.push({ name: "UploadProductView" });
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

.img-icons {
  width: 30px;
  height: 30px;
}

.content-right {
  display: flex;

  .optionsnav{
    display: flex;
    align-items: center;
  }
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
  .img-icons{
    margin-right: 10px;
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
</style>
