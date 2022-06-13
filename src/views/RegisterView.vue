<template>
  <div class="container-fluid" v-if="store.getters.logged === false">
    <div class="row no-gutter d-flex justify-content-center">
      <div class="col-md-7 d-none d-md-flex bg-image"></div>

      <div class="col-md-5 bgColor">
        <div class="register d-flex justify-content-center py-3">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h2 class="display-4 mb-5">{{$t('register')}}</h2>
                <form>
                  <div class="form-outline mb-3">
                      <label class="form-label" for="formName">{{$t('name')}}</label>
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
                      <label class="form-label" for="formEmail">{{$t('emailAddress')}}</label>
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
                        >{{$t('numberPhone')}}</label
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
                    <label class="form-label" for="formPass">{{$t('password')}}</label>
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
                      >{{$t('repeatPassword')}}</label
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
                      {{$t('agreeTerms')}}
                      <a class="text-body" id="formTerms"
                        ><u @click="showTerms" class="link">{{$t('termsService')}}</u></a
                      >
                    </label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-lg"
                      @click="register"
                    >
                      {{$t('register')}}
                    </button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">
                    {{$t('alreadyAccount')}}
                    <router-link to="/login" class="link"
                      ><u>{{$t('loginHere')}}</u></router-link
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
import { reactive, computed, onBeforeMount, onUpdated, onBeforeUpdate } from "vue";
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
import { useI18n } from "vue-i18n";

/*Vista que tiene la función de realizar el registro de un usuario Normal */

onBeforeUpdate(()=>{
  if(store.getters.logged){
    redirectHome()
  }
})

//#region CONST
const t = useI18n();
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
        t.t('errorRequiredName'),
        required
      ),
    },
    email: {
      required: helpers.withMessage(t.t('errorRequiredEmail'), required),
      email: helpers.withMessage(t.t('errorFormatEmail'), required),
    },
    phone: {
      required: helpers.withMessage(t.t('errorRequiredPhone'), required),
      numeric: helpers.withMessage(
        t.t('errorNumericPhone'),
        numeric
      ),
      minLength: helpers.withMessage(
        t.t('errorLenghtPhone'),
        minLength(9)
      ),
      maxLength: helpers.withMessage(
        t.t('errorLenghtPhone'),
        maxLength(9)
      ),
    },
    password: {
      password: {
        required: helpers.withMessage(t.t('errorRequiredPassword'), required),
        minLength: helpers.withMessage(
          t.t('errorLenghtPassword'),
          minLength(8)
        ),
      },
      confirm: {
        required: helpers.withMessage(t.t('errorRequiredPassword'), required),
        minLength: helpers.withMessage(
          t.t('errorLenghtPassword'),
          minLength(8)
        ),
        sameAs: helpers.withMessage(
          t.t('errorSamePassword'),
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
  }
}

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

function showTerms() {
  Swal.fire({
    icon: "info",
    title: t.t('termsService'),
    text: t.t('textTermsService'),
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
  background-size: 100%;
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
