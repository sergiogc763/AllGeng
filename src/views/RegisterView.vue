<!-- <template>
  <section class="bg-image" v-if="!store.state.User.logged">
    <div class="mask d-flex align-items-center h-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card mt-5 mb-5 rounded content-form">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-5">
                  Create an account
                </h2>

                <form>
                  <label class="form-label" for="formName">Name</label>
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="formName"
                      class="form-control form-control-lg"
                      v-model="state.name"
                    />
                    <span class="error" v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="formEmail">Email</label>
                    <input
                      type="email"
                      id="formEmail"
                      class="form-control form-control-lg"
                      v-model="state.email"
                    />
                    <span class="error" v-if="v$.email.$error">
                      {{ v$.email.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="formEmail"
                      >Number phone</label
                    >
                    <input
                      type="tel"
                      id="formPhone"
                      class="form-control form-control-lg"
                      v-model="state.phone"
                    />
                    <span class="error" v-if="v$.phone.$error">
                      {{ v$.phone.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="formPass">Password</label>
                    <input
                      type="password"
                      id="formPass"
                      class="form-control form-control-lg"
                      v-model="state.password.password"
                    />
                    <span class="error" v-if="v$.password.password.$error">
                      {{ v$.password.password.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="formPassRepeat"
                      >Repeat your password</label
                    >
                    <input
                      type="password"
                      id="formPassRepeat"
                      class="form-control form-control-lg"
                      v-model="state.password.confirm"
                    />
                    <span class="error" v-if="v$.password.confirm.$error">
                      {{ v$.password.confirm.$errors[0].$message }}
                    </span>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="terms"
                      v-model="state.acceptTerms"
                    />
                    <label class="form-check-label" for="formTerms">
                      I agree all statements in
                      <a class="text-body" id="formTerms"
                        ><u @click="showTerms" class="link">Terms of service</u></a
                      >
                    </label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-lg"
                      @click="register"
                    >
                      Register
                    </button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">
                    Have already an account?
                    <router-link to="/login" class="link"
                      ><u>Login here</u></router-link
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> -->

<template>
  <div class="container-fluid">
    <div class="row no-gutter d-flex justify-content-center">
      <div class="col-md-7 d-none d-md-flex bg-image"></div>

      <div class="col-md-5 bgColor">
        <div class="register d-flex justify-content-center py-3">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h2 class="display-4 mb-5">Register</h2>
                <form>
                  <div class="form-outline mb-3">
                      <label class="form-label" for="formName">Name</label>
                      <input
                        type="text"
                        id="formName"
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        v-model="state.name"
                      />
                      <span class="error" v-if="v$.name.$error">
                        {{ v$.name.$errors[0].$message }}
                      </span>
                  </div>
                  <div class="form-outline mb-3">
                      <label class="form-label" for="formEmail">Email</label>
                      <input
                        type="email"
                        id="formEmail"
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        v-model="state.email"
                      />
                      <span class="error" v-if="v$.email.$error">
                        {{ v$.email.$errors[0].$message }}
                      </span>
                    </div>
                  <div class="form-outline mb-3">
                      <label class="form-label" for="formPhone"
                        >Number phone</label
                      >
                      <input
                        type="tel"
                        id="formPhone"
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        v-model="state.phone"
                      />
                      <span class="error" v-if="v$.phone.$error">
                        {{ v$.phone.$errors[0].$message }}
                      </span>
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="formPass">Password</label>
                    <input
                      type="password"
                      id="formPass"
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      v-model="state.password.password"
                    />
                    <span class="error" v-if="v$.password.password.$error">
                      {{ v$.password.password.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="formPassRepeat"
                      >Repeat your password</label
                    >
                    <input
                      type="password"
                      id="formPassRepeat"
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      v-model="state.password.confirm"
                    />
                    <span class="error" v-if="v$.password.confirm.$error">
                      {{ v$.password.confirm.$errors[0].$message }}
                    </span>
                  </div>
                  <div class="form-check d-flex justify-content-center mb-5">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="terms"
                      v-model="state.acceptTerms"
                    />
                    <label class="form-check-label" for="formTerms">
                      I agree all statements in
                      <a class="text-body" id="formTerms"
                        ><u @click="showTerms" class="link">Terms of service</u></a
                      >
                    </label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-lg"
                      @click="register"
                    >
                      Register
                    </button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">
                    Have already an account?
                    <router-link to="/login" class="link"
                      ><u>Login here</u></router-link
                    >
                  </p>
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
import { reactive, computed, onBeforeMount } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
  numeric,
} from "@vuelidate/validators";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import md5 from "crypto-js/md5";

/*Vista que tiene la función de realizar el registro de un usuario Normal */

onBeforeMount(() => {
  if (store.state.User.logged) {
    redirectHome();
  }
});

//#region CONST
const store = useStore();
const router = useRouter();
const state = reactive({
  name: "",
  email: "",
  phone: "",
  password: {
    password: "",
    confirm: "",
  },
  acceptTerms: false,
});
//#endregion

//#region RULES VALIDATION FORM
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        "*Rellene con su nombre completo",
        required
      ),
    },
    email: {
      required: helpers.withMessage("*Indique su correo electrónico", required),
      email,
    },
    phone: {
      required: helpers.withMessage("*Indique su teléfono", required),
      numeric: helpers.withMessage(
        "*Introduzca un número de teleféno correcto",
        numeric
      ),
      minLength: helpers.withMessage(
        "*El formato del telefono indicado es incorrecto (9 números)",
        minLength(9)
      ),
      maxLength: helpers.withMessage(
        "*El formato del telefono indicado es incorrecto (9 números)",
        maxLength(9)
      ),
    },
    password: {
      password: {
        required: helpers.withMessage("*Indique una contraseña", required),
        minLength: helpers.withMessage(
          "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
          minLength(8)
        ),
      },
      confirm: {
        required: helpers.withMessage("*Indique una contraseña", required),
        minLength: helpers.withMessage(
          "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
          minLength(8)
        ),
        sameAs: helpers.withMessage(
          "*No coincide con la contraseña indicada anteriormente",
          sameAs(state.password.password)
        ),
      },
    },
    acceptTerms: { checked: (value) => value === true },
  };
});

const v$ = useVuelidate(rules, state);
//#endregion

//#region FUNCTION

function register() {
  const md5Pass = md5(state.password.password).toString();
  v$.value.$validate();
  if (!v$.value.$error) {
    const u = {
      name: state.name,
      email: state.email,
      password: md5Pass,
      phone: state.phone,
    };
    store.dispatch("register", u);
  } else {
    Swal.fire({
      icon: "warning",
      title: "Formato datos erroneo",
      text: "Los datos introducidos no cumplen el formato correcto o no ha aceptado los términos.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function redirectHome() {
  Swal.fire({
    icon: "info",
    title: "Se encuentra con una sesión activa",
    text: "Para poder registrarse debe cerrar sesión",
    showConfirmButton: false,
    timer: 1660,
  });
  router.push({ name: "HomeView" });
}

function showTerms() {
  Swal.fire({
    icon: "info",
    title: "Pólitica de privacidad",
    text: "La visita a este sitio Web no implica que el usuario esté obligado a facilitar ninguna información. En el caso de que el usuario facilite alguna información de carácter personal, los datos recogidos en este sitio web serán tratados de forma leal y lícita con sujeción en todo momento a los principios y derechos recogidos en el Reglamento (UE) 2016/679, de 27 de abril, General de Protección de Datos (RGPD) y demás normativa aplicable.",
    showConfirmButton: true,
  });
}
//#endregion
</script>

<style lang="scss" scoped>
.register,
.image {
  min-height: 100vh;
}
.bg-image {
  background-image: url("@/assets/img_register.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.bgColor{
  background-color:#C7F0E9;
  
}
.error {
  color: red;
}
.link {
  color: blue;
}

</style>
