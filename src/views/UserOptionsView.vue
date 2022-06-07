<template>
  <div class="content" v-if="store.getters.logged">
    <div class="wrapper bg-white mt-sm-5">
      <h4 class="pb-4 d-flex align-items-center justify-content-center">
        Configuración cuenta
      </h4>
      <div
        class="d-flex align-items-center justify-content-center py-3 border-bottom"
      >
        <img src="@/assets/usuario_config.png" class="img" alt="" />
      </div>
      <div class="py-2 border-bottom">
        <div class="row py-2">
          <div class="col-md-6">
            <label for="firstname">Nombre:</label>
            <input
              type="text"
              class="bg-light form-control"
              v-model="newName"
              :placeholder="name"
            />
          </div>
          <div class="col-md-6 pt-md-0 pt-3">
            <label for="lastname">Apellidos:</label>
            <input
              type="text"
              class="bg-light form-control"
              v-model="newLastName"
              :placeholder="lastName"
            />
          </div>
        </div>
        <div class="row py-2">
          <div class="col-md-6">
            <label for="email">Correo Electrónico:</label>
            <input
              type="text"
              class="bg-light form-control"
              v-model="newEmail"
              :placeholder="email"
            />
          </div>
          <div class="col-md-6 pt-md-0 pt-3">
            <label for="phone">Teléfono</label>
            <input
              type="tel"
              class="bg-light form-control"
              v-model="newPhone"
              :placeholder="phone"
            />
          </div>
        </div>
        <div class="py-3 pb-4 border-bottom">
          <button class="btn btn-primary m-2" @click="updateInfo()">
            Guardar cambios
          </button>
          <button class="btn btn-secondary m-2" @click="cleanForm()">
            Limpiar
          </button>
        </div>
        <div class="row py-2">
          <div class="col-md-12">
            <label for="oldPass">Contraseña antigua:</label>
            <input
              type="password"
              class="bg-light form-control"
              v-model="state.oldPass"
              placeholder="*************"
            />
            <span class="error" v-if="v$.oldPass.$error">
              {{ v$.oldPass.$errors[0].$message }}
            </span>
          </div>
          <div class="col-md-6">
            <label for="newPass">Nueva contraseña:</label>
            <input
              type="password"
              class="bg-light form-control"
              v-model="state.password.newPass"
              placeholder="*************"
            />
            <span class="error" v-if="v$.oldPass.$error">
              {{ v$.password.newPass.$errors[0].$message }}
            </span>
          </div>
          <div class="col-md-6 pt-md-0 pt-3">
            <label for="repeatPass">Repita la contraseña nueva:</label>
            <input
              type="password"
              class="bg-light form-control"
              v-model="state.password.newConfirmPass"
              placeholder="*************"
            />
            <span class="error" v-if="v$.oldPass.$error">
              {{ v$.password.newConfirmPass.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="py-3 pb-4 border-bottom">
          <button class="btn btn-warning mr-3" @click="updatePass()">
            Cambiar contraseña
          </button>
        </div>
        <div class="d-sm-flex align-items-center pt-3" id="deactivate">
          <div class="m-2">
            <b>Eliminar cuenta</b>
            <p>Detalles sobre datos de tu cuenta y contraseña</p>
          </div>
          <div class="ml-auto">
            <button class="btn danger" @click="deleteAccount()">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Page404 v-else />
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import router from "../router/index";
import Swal from "sweetalert2";
import { computed, ref, reactive } from "vue";
import Page404 from "@/components/Page404.vue";
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import md5 from "crypto-js/md5";

//#region STORE
const store = useStore();
//#endregion

//#region CONTROL FORM INFO

//#region CONST FORM INFO
const newName = ref<string>("");
const name = computed(() => store.getters.userName.split(" ", 2)[0]);

const newLastName = ref<string>("");
const lastName = computed(() => store.getters.userName.split(" ", 2)[1]);

const newEmail = ref<string>("");
const email = computed(() => store.getters.userEmail);

const newPhone = ref<string>("");
const phone = computed(() => store.getters.userPhone);
//#endregion

//#region FUNCTIONS
function cleanForm() {
  newName.value = "";
  newLastName.value = "";
  newEmail.value = "";
  newPhone.value = "";
}
function updateInfo() {
  let checkName = name.value;
  let checkLastname = lastName.value;
  let fullName = "";
  let checkEmail = email.value;
  let checkPhone = phone.value;

  if (newName.value !== "") {
    checkName = newName.value;
  }
  if (lastName.value !== "") {
    checkLastname = lastName.value;
  }

  fullName = `${checkName} ${checkLastname}`;

  if (newEmail.value !== "") {
    checkEmail = newEmail.value;
  }
  if (newPhone.value !== "") {
    checkPhone = newPhone.value;
  }

  const o = {
    User: {
      name: fullName,
      email: checkEmail,
      telf: checkPhone,
    },
    option: "Info",
  };
  store.dispatch("changeDataUser", o);
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

//#endregion

//#region UPDATE PASSWORD

//#region CONST
const state = reactive({
  oldPass: "",
  password: {
    newPass: "",
    newConfirmPass: "",
  },
});
//#endregion

//#region RULES VALIDATION FORM
const rules = computed(() => {
  return {
    oldPass: {
      required: helpers.withMessage("*Debe introducir la antigüa contraseña", required),
      minLength: helpers.withMessage(
        "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
        minLength(8)
      ),
    },
    password: {
      newPass: {
        required: helpers.withMessage("*Debe introducir la nueva contraseña", required),
        minLength: helpers.withMessage(
          "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
          minLength(8)
        ),
      },
      newConfirmPass: {
        required: helpers.withMessage("*Debe repetir la nueva contraseña", required),
        minLength: helpers.withMessage(
          "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
          minLength(8)
        ),
        sameAs: helpers.withMessage(
          "*No coincide con la contraseña indicada anteriormente",
          sameAs(state.password.newPass)
        ),
      },
    },
  };
});

const v$ = useVuelidate(rules, state);

function updatePass() {
  v$.value.$validate();
  if (!v$.value.$error) {
    const o = {
      option: "Password",
      oldPassword: md5(state.oldPass).toString(),
      newPassword: md5(state.password.newPass).toString(),
    };
    store.dispatch("changeDataUser", o);
  } else {
    Swal.fire({
      icon: "warning",
      title: "Formato datos erroneo",
      text: "Debe rellenar todos los campos. Además ambas constraseñas deben coincidir",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
//#endregion

//#endregion
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: aliceblue;
}

.wrapper {
  padding: 30px 50px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin: 10px auto;
  max-width: 600px;
}

h4 {
  letter-spacing: -1px;
  font-weight: 400;
}
.img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}
#img-section p,
#deactivate p {
  font-size: 12px;
  color: #777;
  margin-bottom: 10px;
  text-align: justify;
}
#img-section b,
#img-section button,
#deactivate b {
  font-size: 14px;
}
label {
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 500;
  color: #777;
  padding-left: 3px;
}

.form-control {
  border-radius: 10px;
}

input[placeholder] {
  font-weight: 500;
}
.form-control:focus {
  box-shadow: none;
  border: 1.5px solid #0779e4;
}
select {
  display: block;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  height: 40px;
  padding: 5px 10px;
  /* -webkit-appearance: none; */
}

select:focus {
  outline: none;
}
.button {
  background-color: #fff;
  color: #0779e4;
}
.button:hover {
  background-color: #0779e4;
  color: #fff;
}
.btn-primary {
  background-color: #0779e4;
}
.danger {
  background-color: #fff;
  color: #e20404;
  border: 1px solid #ddd;
}
.danger:hover {
  background-color: #e20404;
  color: #fff;
}
@media (max-width: 576px) {
  .wrapper {
    padding: 25px 20px;
  }
  #deactivate {
    line-height: 18px;
  }
}

.error{
  color: red;
  font-weight: bold;
}
</style>
