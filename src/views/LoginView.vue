<template>
  <div class="container-fluid">
    <div class="row no-gutter d-flex justify-content-center">
      <div class="col-md-7 d-none d-md-flex bg-image"></div>

      <div class="col-md-5 bg-light formLogin">
        <div class="login d-flex justify-content-center py-3">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h2 class="display-4 mb-5">Login</h2>
                <form>
                  <div class="mb-3">
                    <input
                      id="inputEmail"
                      type="email"
                      placeholder="Email address"
                      autofocus="true"
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                      v-model="state.email"
                    />
                    <span class="error" v-if="v$.email.$error">
                      {{ v$.email.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="mb-3">
                    <input
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      v-model="state.password"
                      @keypress.enter="login()"
                    />
                    <span class="error" v-if="v$.password.$error">
                      {{ v$.password.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="form-check mb-5">
                    <input
                      id="checkRemember"
                      type="checkbox"
                      class="form-check-input"
                      v-model="rememberLogin"
                    />
                    <label for="checkRemember" class="form-check-label"
                      >Remember me</label
                    >
                  </div>
                  <div class="mb-3">
                    <p>
                      Forget password?
                      <router-link to="/">Click here for recovery</router-link>
                    </p>
                  </div>
                  <div class="d-grid gap-2 mt-2">
                    <button
                      @click="login()"
                      type="button"
                      class="botonSingin btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      Sign in
                    </button>

                    <button
                      @click="register()"
                      type="button"
                      class="botonRegister btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import md5 from "crypto-js/md5";



//#region CONST
const store = useStore();

const router = useRouter();

const state = reactive({
  email: "",
  password: "",
});

const rememberLogin = ref<boolean>(false);

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("*Campo email no puede estar vacío", required),
      email,
    },
    password: {
      required: helpers.withMessage("*Indique una contraseña", required) },
  };
});

const v$ = useVuelidate(rules, state);

//#endregion

//#region FUNCTIONS
async function login() {
  v$.value.$validate();
  if (!v$.value.$error) {
    
    let token = "";

    if(rememberLogin.value){

      localStorage.setItem("userSession", md5(generateRandomString(25)).toString());
      token = md5(generateRandomString(25)).toString();
    }
    const u = {
      email: state.email,
      password: state.password,
      token: token
    };
    console.log(rememberLogin.value);
    store.dispatch("saveUserLogin", u);
    

  } else {
    Swal.fire({
      icon: "warning",
      title: "Datos erroneos",
      text: "Los datos introducidos no cumplen el formato correcto",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function register() {
  router.push({ name: "RegisterView" });
}

//#endregion


//#region UTIL

const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

//#endregion
</script>

<style lang="scss" scoped>
.botonSingin {
  background-color: rgb(1, 53, 114);
  color: white;

  &:hover {
    background-color: rgb(0, 110, 255);
    color: white;
    font-weight: bold;
  }
}
.botonRegister {
  background-color: rgb(11, 119, 1);
  color: white;

  &:hover {
    background-color: rgb(5, 197, 37);
    color: white;
    font-weight: bold;
  }
}
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-image: url("@/assets/img_login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.error {
  color: red;
}
</style>
