<template>
  <div class="container">
    <h1 class="mb-5">Información Seguridad</h1>
    <div class="old-pass">
      <h6>Contraseña antigua</h6>
      <input type="password" v-model="state.oldPass" class="mb-5" />
    </div>
    <div class="new-pass">
      <h6>Contraseña nueva</h6>
      <div class="content-form">
        <label to="newPass">Escriba la nueva contraseña:</label>
        <input
          type="password"
          id="newPass"
          v-model="state.password.newPass"
          class="mb-2"
        />
      </div>
      <div class="content-form">
        <label to="oldPass">Repita la contraseña anterior:</label>
        <input
          type="password"
          id="oldPass"
          v-model="state.password.newConfirmPass"
          class="mb-5"
        />
      </div>
      <div class="option">
        <button type="button" class="btn btn-primary" @click="updatePass()">
          Cambiar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { useStore } from "vuex";
import Swal from "sweetalert2";
//#region CONST
const state = reactive({
  oldPass: "",
  password: {
    newPass: "",
    newConfirmPass: "",
  },
});
const store = useStore();
//#endregion

//#region RULES VALIDATION FORM
const rules = computed(() => {
  return {
    oldPass: {
      required: helpers.withMessage("*Indique una contraseña", required),
      minLength: helpers.withMessage(
        "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
        minLength(8)
      ),
    },
    password: {
      newPass: {
        required: helpers.withMessage("*Indique una contraseña", required),
        minLength: helpers.withMessage(
          "*La contraseña debe estar tener una longitud mínima de 8 caracteres",
          minLength(8)
        ),
      },
      newConfirmPass: {
        required: helpers.withMessage("*Indique una contraseña", required),
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
//#endregion

//#region FUNCTIONS
function updatePass() {
  v$.value.$validate();
  if (!v$.value.$error) {
    const o = {
      option: "Password",
      oldPassword: state.oldPass,
      newPassword: state.password.newPass,
    };
    store.dispatch("changeDataUser", o);
  } else {
    Swal.fire({
      icon: "warning",
      title: "Formato datos erroneo",
      text: "Los datos introducidos no cumplen el formato correcto",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
//#endregion
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: rgb(201, 201, 201);
  margin-top: 5px;

  .old-pass {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .content-form {
    label {
      margin-right: 5px;
    }
  }

  .option {
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;
  }
}
</style>
