<template>
  <section class="bg-image" style="background-color: gray">
    <div class="mask d-flex align-items-center h-100 gradient-custom">
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
                    />
                    <label class="form-check-label" for="formTerms">
                      I agree all statements in
                      <a href="#!" class="text-body" id="formTerms"
                        ><u>Terms of service</u></a
                      >
                    </label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-lg"
                      @click="insertNewUser"
                    >
                      Register
                    </button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">
                    Have already an account?
                    <router-link to="/login" class="fw-bold text-body"
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
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { CodesHttp } from "@/core/general/CodesHttp";
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
import {RoutePaths} from '@/core/general/RoutePaths';



//#region CONST
const router = useRouter();
const state = reactive({
  name: "",
  email: "",
  phone: "",
  password: {
    password: "",
    confirm: "",
  },
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
  };
});

const v$ = useVuelidate(rules, state);
//#endregion

//#region FUNCTION

async function insertNewUser() {
  v$.value.$validate();
  if (!v$.value.$error) {
    await fetch(
      "http://www.iestrassierra.net/alumnado/curso2122/DAW/daw2122a5/API/registerUser.php",
      {
        method: "POST",
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password.password,
          phone: state.phone,
        }),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        const response = JSON.parse(data);

        if (response["codehttp"] === CodesHttp.Success) {
          router.push({ name: "LoginView" });
          Swal.fire({
            icon: "success",
            title: "Te has registrado correctamente",
            showConfirmButton: false,
            timer: 1680,
          });
          
        } else {
          Swal.fire({
            icon: "error",
            title: 'Oops...',
            text: "Lo sentimos. Ha ocurrido un error al intentar registrarse",
            showConfirmButton: true,
          });
        }
      })
      .catch(function (error) {
        console.log("Request failed-> " + CodesHttp.Error, error);
      });
  } else {
    Swal.fire({
            icon: "warning",
            title: 'Campos erroneos',
            text: "Ha ingresado datos no validos! Introduzca la información correctamente",
            showConfirmButton: true,
          });
  }
}
//#endregion
</script>

<style lang="scss" scoped>
.gradient-custom {
  /* fallback for old browsers */
  background: #ff7056;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgb(5, 226, 178),
    rgba(143, 211, 244, 1)
  );

  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 1),
    rgba(143, 211, 244, 1)
  );
}

.content-form {
  background-color: rgb(218, 218, 218);
}
.btnRegister {
  color: white;
}

.error {
  color: red;
}
</style>
