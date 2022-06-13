<template>
  <div class="container-fluid" v-if="store.getters.logged === false">
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
                      :placeholder="$t('emailAddress')"
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
                      :placeholder="$t('password')"
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
                      >{{$t('rememberMe')}}</label
                    >
                  </div>
                  <div class="mb-3">
                    <p>
                      {{$t('forgetPassword')}}
                      <span class="resetPassword" @click="resetPassword()">{{$t('clickForgetPassword')}}</span>
                    </p>
                  </div>
                  <div class="d-grid gap-2 mt-2">
                    <button
                      @click="login()"
                      type="button"
                      class="botonSingin btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      {{$t('signIn')}}
                    </button>

                    <button
                      @click="register()"
                      type="button"
                      class="botonRegister btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                    >
                      {{$t('register')}}
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

import { computed, onBeforeMount, onBeforeUpdate, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import md5 from "crypto-js/md5";
import axios from "axios";
import { useI18n } from "vue-i18n"
import { RoutePaths } from "@/core/general/RoutePaths";

/*Vista que muestra y controla el login de los usuarios */



const t = useI18n()

//#region CONST
const store = useStore();

const router = useRouter();

const state = reactive({
  email: "",
  password: "",
});

onBeforeMount(()=>{
  if(store.getters.logged){
    redirectHome()
  }
})

const rememberLogin = ref<boolean>(false);

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(t.t('errorRequiredEmail'), required),
      email: helpers.withMessage(t.t('errorFormatEmail'), email),
    },
    password: {
      required: helpers.withMessage(t.t('errorRequiredPassword'), required) },
  };
});

const v$ = useVuelidate(rules, state);
//#endregion

//#region FUNCTIONS
function redirectHome() {
  Swal.fire({
    icon: "info",
    title: "Ups...",
    text: t.t('sessionActive'),
    showConfirmButton: false,
    timer: 2550,
  });
  router.push({ name: "HomeView" });
}

async function login() {
  v$.value.$validate();
  if (!v$.value.$error) {
    
    let token = "";

    if(rememberLogin.value){
      token = md5(generateRandomString(25)).toString();
      localStorage.setItem("userSession", token);
      
    }
    const u = {
      email: state.email,
      password: md5(state.password).toString(),
      token: token
    };
    store.dispatch("saveUserLogin", u);
    

  } 
}

function register() {
  router.push({ name: "RegisterView" });
}

async function resetPassword() {
  const { value: emailU } = await Swal.fire({
    title: t.t('titleRecoverAccount'),
    input: "text",
    inputLabel: `${t.t('writeYour')} email`,
    showCancelButton: true,
  });

  if (emailU) {
    Swal.fire(t.t('checkEmail'));

    let formData = new FormData();
    formData.append("emailU", emailU);

    const newPass = generateRandomString(25).trim();

    formData.append("newPass", newPass.trim());
    formData.append("cryptPass", md5(newPass).toString().trim());

    await axios
      .post(`${RoutePaths.API}resetPassword.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            console.log(response);
            if (response.data) {
              Swal.fire({
                icon: "success",
                title: t.t('checkEmail'),
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: t.t('titleWarning'),
                text: t.t('error200'),
                showConfirmButton: false,
                timer: 2000,
              });
            }
            break;

          case 404:
            Swal.fire({
              icon: "error",
              title: t.t('titleWarning'),
              text: t.t('error404'),
              showConfirmButton: false,
              timer: 2000,
            });
            break;

          case 500:
            Swal.fire({
              icon: "error",
              title: t.t('titleWarning'),
              text: t.t('error500'),
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
    Swal.fire(t.t('noEmptyFields'));
  }
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

.resetPassword{
  color: blue;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
