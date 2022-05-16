<template>
  <div class="container">
    <h1 class="mb-5">Información Usuario</h1>
    <div class="name">
      <h5>Nombre</h5>
      <div class="actual-name">
        <label to="name" class="mr-2"> Nombre: </label>
        <p id="name">{{ name }}</p>
      </div>
      <div class="new-name">
          <input type="text" v-model="newName" placeholder="Nuevo nombre" class="mb-5"/>
          <button type="button" class="btn btn-primary" @click="updateName()">
              Cambiar
          </button>
      </div>
    </div>
    <hr class="mt-2 mb-2">
    <div class="email">
      <h5>Email</h5>
      <div class="actual-email">
        <label to="email" class="mr-2"> Email: </label>
        <p id="email">{{ email }}</p>
      </div>
      <div class="new-email">
          <input type="email" v-model="newEmail" placeholder="Nuevo email" class="mb-5"/>
          <button type="button" class="btn btn-primary" @click="updateEmail()">
              Cambiar
          </button>
      </div>
    </div>
    <hr class="mt-2 mb-2">
    <div class="phone">
      <h5>Teléfono</h5>
      <div class="actual-phone">
        <label to="phone" class="mr-2"> Telefono: </label>
        <p id="phone">{{ phone }}</p>
      </div>
      <div class="new-phone">
          <input type="tel" v-model="newPhone" placeholder="Nuevo teléfono" class="mb-5"/>
          <button type="button" class="btn btn-primary" @click="updatePhone()">
              Cambiar
          </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

//#region CONST
const store = useStore();

const newName = ref<string>("");
const name = computed(() => store.getters.userName);

const newEmail = ref<string>("");
const email = computed(() => store.getters.userEmail);

const newPhone = ref<string>("");
const phone = computed(() => store.getters.userPhone);
//#endregion

//#region 
function updateName(){

  const o = {
      nom: newName.value,
      option: "Name",
    };
    store.dispatch("changeDataUser", o);
}

function updateEmail(){

  const o = {
      email: newEmail.value,
      option: "Email",
    };
    store.dispatch("changeDataUser", o);
}

function updatePhone(){

  const o = {
      telf: newPhone.value,
      option: "Phone",
    };
    store.dispatch("changeDataUser", o);
}

//#endregion
</script>

<style lang="scss" scoped>
.container {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: rgb(201, 201, 201);
  margin-top: 5px;
  margin-bottom: 5px;

  .new-phone, .new-email, .new-name{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    input{
      margin: 2px;
    }
  }

  
}
</style>
