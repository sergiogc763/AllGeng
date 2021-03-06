<template>
  <div class="bodycontent" v-if="store.getters.logged">
    <div class="wrapper bgcolor mt-sm-5">
      <h4
        class="pb-4 d-flex align-items-center justify-content-center text-dark"
      >
        {{$t('titleUserOption')}}
      </h4>
      <div
        class="d-flex align-items-center justify-content-center py-3 border-bottom"
      >
        <img src="@/assets/usuario_config.png" class="img" alt="" />
      </div>
      <div class="py-2 border-bottom">
        <div class="row py-2">
          <div class="col-md-6">
            <label for="firstname">{{ $t("name") }}:</label>
            <input
              type="text"
              class="bg-light form-control"
              v-model="state.newName"
              :placeholder="name"
              @keypress="isLetter($event)"
            />
          </div>
          <div class="col-md-6 pt-md-0 pt-3">
            <label for="lastname">{{ $t("lastname") }}:</label>
            <input
              type="text"
              class="bg-light form-control"
              v-model="state.newLastName"
              :placeholder="lastName"
              @keypress="isLetter($event)"
            />
          </div>
        </div>
        <div class="row py-2">
          <div class="col-md-6">
            <label for="email">{{ $t("emailAddress") }}:</label>
            <input
              type="email"
              class="bg-light form-control"
              v-model="state.newEmail"
              :placeholder="email"
            />
          </div>
          <div class="col-md-6 pt-md-0 pt-3">
            <label for="phone">{{ $t("numberPhone") }}</label>
            <input
              type="tel"
              class="bg-light form-control"
              v-model="state.newPhone"
              :placeholder="phone"
            />
          </div>
        </div>
        <div class="py-3 pb-4 border-bottom">
          <button class="btn btn-primary m-2" @click="updateInfo()">
            {{ $t("saveChanges") }}
          </button>
          <button class="btn btn-secondary m-2" @click="cleanForm()">
            {{ $t("cleanForm") }}
          </button>
        </div>
        <div class="row py-2">
          <div class="col-md-12">
            <label for="oldPass">{{ $t("oldPassword") }}:</label>
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
            <label for="newPass">{{ $t("newPassword") }}:</label>
            <input
              type="password"
              class="bg-light form-control"
              v-model="state.password.newPass"
              placeholder="*************"
            />
            <span class="error" v-if="v$.password.newPass.$error">
              {{ v$.password.newPass.$errors[0].$message }}
            </span>
          </div>
          <div class="col-md-6 pt-md-0 pt-3">
            <label for="repeatPass">{{ $t("repeatNewPassword") }}:</label>
            <input
              type="password"
              class="bg-light form-control"
              v-model="state.password.newConfirmPass"
              placeholder="*************"
            />
            <span class="error" v-if="v$.password.newConfirmPass.$error">
              {{ v$.password.newConfirmPass.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="py-3 pb-4 border-bottom">
          <button class="btn btn-warning mr-3" @click="updatePass()">
            {{ $t("changePassword") }}
          </button>
        </div>
        <div class="d-sm-flex align-items-center pt-3" id="deactivate">
          <div class="m-2">
            <b class="text-dark">{{ $t("delete") }} {{ $t("account") }}</b>
            <p>{{ $t("datailsAccount") }}</p>
          </div>
          <div class="ml-auto">
            <button class="btn danger" @click="deleteAccount()">
              {{ $t("delete") }}
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
import { computed, reactive } from "vue";
import Page404 from "@/components/Page404.vue";
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import md5 from "crypto-js/md5";
import { useI18n } from 'vue-i18n';

/*Vista que muestra los datos del usuario actualmente conectado y 
que permite realizar el cambio de cualquiera de estos, incluso de eliminar
la cuenta de forma permanente */

//#region I18n
const t = useI18n();
//#endregion

//#region STORE
const store = useStore();
//#endregion

//#region CONST REF,COMPUTED, REACTIVE
// const newName = ref<string>("");
const name = computed(() => store.getters.userName.split(" ", 2)[0]);

// const newLastName = ref<string>("");
const lastName = computed(() => getLastName());

// const newEmail = ref<string>("");
const email = computed(() => store.getters.userEmail);

// const newPhone = ref<string>("");
const phone = computed(() => store.getters.userPhone);

const state = reactive({
  newName:"",
  newLastName:"",
  newEmail:"",
  newPhone:"",
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
      required: helpers.withMessage(
       t.t('errorRequiredOldPassword'),
        required
      ),
    },
    password: {
      newPass: {
        required: helpers.withMessage(
          t.t('errorRequiredNewPassword'),
          required
        ),
        minLength: helpers.withMessage(
          t.t('errorLenghtPassword'),
          minLength(8)
        ),
      },
      newConfirmPass: {
        required: helpers.withMessage(
          t.t('errorRequiredRepeatNewPassword'),
          required
        ),
        minLength: helpers.withMessage(
          t.t('errorLenghtPassword'),
          minLength(8)
        ),
        sameAs: helpers.withMessage(
         t.t('errorSameAsNewPassword'),
          sameAs(state.password.newPass)
        ),
      },
    },
  };
});

const v$ = useVuelidate(rules, state);
//#endregion

//#region FUNCTIONS
function getLastName(){
  let ln = "";
  for(let x = 1; x < store.getters.userName.split(" ").length; x++){
    ln+= ` ${store.getters.userName.split(" ")[x]}`
  }
  return ln;
}
function isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[a-zA-Z\s]*$/.test(char)) return true;
      else e.preventDefault();
    }

function cleanForm() {
  state.newName = "";
  state.newLastName = "";
  state.newEmail = "";
  state.newPhone = "";
}
function updateInfo() {
  let checkName = name.value;
  let checkLastname = lastName.value;
  let fullName = "";
  let checkEmail = email.value;
  let checkPhone = phone.value;

  if (state.newName !== "") {
    checkName =  state.newName;
  }
  if ( state.newLastName !== "") {
    checkLastname =  state.newLastName;
  }

  fullName = `${checkName} ${checkLastname}`;

  if (state.newEmail !== "") {
    checkEmail =  state.newEmail;
  }
  if (state.newPhone !== "") {
    checkPhone =  state.newPhone;
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
  cleanForm();
}

function deleteAccount() {
  Swal.fire({
    title: t.t('titleDeleteUser'),
    showCancelButton: true,
    confirmButtonText: t.t('delete'),
    denyButtonText: t.t('cancel'),
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
                router.push({ name: "HomeView" });
                Swal.fire({
                  icon: "success",
                  title: t.t('successDelete'),
                  showConfirmButton: false,
                  timer: 2000,
                });
                store.dispatch("logout");
              }
              break;
            case 404:
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error404"),
                showConfirmButton: false,
                timer: 2000,
              });
              break;

            case 500:
              Swal.fire({
                icon: "error",
                title: t.t("titleWarning"),
                text: t.t("error500"),
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

function updatePass() {
  v$.value.$validate();
  if (!v$.value.$error) {
    const o = {
      option: "Password",
      oldPassword: md5(state.oldPass).toString(),
      newPassword: md5(state.password.newPass).toString(),
    };
    store.dispatch("changeDataUser", o);
  }
}
//#endregion
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  margin: 0px;
  padding: 0px;
}
.bgcolor {
  background-color: #e3e3e3;
}
.wrapper {
  padding: 30px 50px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin: 20px auto;
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

.error {
  color: red;
  font-weight: bold;
}
</style>
