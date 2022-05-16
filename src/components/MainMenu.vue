<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid d-flex justify-content-between">
      <router-link class="navbar-brand" to="/"
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" @click="goLogin" v-if="!store.state.User.logged">
              <div class="useraccount">
                <div class="img-useraccount">
                  <img src="@/assets/user.png" class="img-icons" />
                </div>
                Cuenta
              </div>
            </li>
            <li class="nav-item dropdown" v-else>
                <div class="useraccount nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <div class="img-useraccount">
                  <img src="@/assets/user.png" class="img-icons" />
                </div>
                Cuenta
              </div>
      
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link class="dropdown-item" :to="RoutePaths.UserOptions">Configuración</router-link> </li>
                <li><router-link class="dropdown-item" to="">Desconectar</router-link></li>
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
import { RoutePaths } from '../core/general/RoutePaths';


const store = useStore();
const router = useRouter();
function goLogin() {
  router.push({ name: "LoginView" });
}
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
}

.useraccount {
  display: flex;
  align-items: center;
  color: rgb(189, 189, 189);
  font-weight: bold;
  font-size: 20px;
  .img-useraccount {
    margin-right: 10px;
  }

  &:hover {
    background-color: rgb(255, 31, 31);
    color: white;
  }
}
</style>
