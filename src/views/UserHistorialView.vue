<template>
  <div
    class="main"
    v-if="store.getters.logged && store.getters.rolId === RolUser.Usuario"
  >
    <div class="fechas">
      <select
        class="form-select"
        v-model="fecha"
        @change="mostrarProductosFecha"
      >
        <option selected value="3">{{$t('last3Months')}}</option>
        <option v-for="options in fechas" v-bind:value="options">
          {{ options }}
        </option>
      </select>
    </div>

    <div class="productos">
      <div class="producto" v-for="p in historial">
        <div class="top-banner">
          <div class="datos-left">
            <div class="fecha apartado">
              <span class="titulo">{{$t('orderPlaced')}}</span>
              <span>{{ p.histfecha }} {{$t('at')}} {{ p.histhora }}</span>
            </div>
            <div class="total apartado">
              <span class="titulo">TOTAL</span>
              <span>{{ p.histprecio }}€</span>
            </div>
            <div class="cantidad apartado">
              <span class="titulo">{{$t('units').toLocaleUpperCase()}}</span>
              <span>{{ p.histcantidad }} uds</span>
            </div>
          </div>
          <div class="datos-right">
            <div class="numero apartado">
              <span class="titulo">{{$t('numberOrder')}}</span>
              <span>{{ p.histnumpedido }}</span>
            </div>
          </div>
        </div>
        <div class="content-p">
          <div class="img-p">
            <img :src="RoutePaths.BASE + p.imagen" />
          </div>
          <div class="datos-p">
            <h4>{{ p.prodnom }}</h4>
          </div>
          <div class="options-p">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="verProducto(p)"
            >
              {{$t('buyAgain')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Page404 v-else />
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import Page404 from "@/components/Page404.vue";
import { RolUser } from "@/core/general/RolUser";
import axios from "axios";
import Swal from "sweetalert2";
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

//#region CONST USE
const t = useI18n()
const router = useRouter();
const store = useStore();
//#endregion

//#region REF
const fecha = ref<any>(3);
const fechas = ref<Array<any>>([]);
const historial = ref<Array<any>>([]);
//#endregion

onBeforeMount(() => {
  //Lo primero que hacemos es comprobar que el usuario se encuentre logeado con éxito antes de realizar la obtención de los datos
  if (store.getters.logged) {
    const formData = new FormData();
    formData.append("id", store.getters.userId);

    axios
      .post(`${RoutePaths.API}getFechasHistorial.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            const fechasBD: Array<any> = [];
            if (response.data.products.data !== undefined) {
              response.data.products.data.forEach((element: any) => {
                fechasBD.push(element.anio);
              });

              fechas.value = Array.from(new Set(fechasBD)); //Quitamos fechas duplicadas

              obtenerHistorialFitro(); //obtenemos historial principal con el filtro de 3 meses
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
  }
});

//Función que se ejecuta cada vez que el select del filtro cambia
function mostrarProductosFecha() {
  obtenerHistorialFitro();
}

//Obtenemos el historial del usuario actual según el filtro indicado
function obtenerHistorialFitro() {
  const formData = new FormData();
  formData.append("id", store.getters.userId);
  formData.append("filtro", fecha.value);

  axios
    .post(`${RoutePaths.API}getHistorialUsuario.php`, formData)
    .then((response) => {
      switch (response.status) {
        case 200:
          historial.value = [];
          response.data.products.data.forEach((element: any) => {
            historial.value.push(element);
          });
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
}

function verProducto(p: any) {
  router.push({
    name: "ProductView",
    params: {
      nombre: p.prodnom.replace(/\s+/g, "-"),
      id: p.prodid,
    },
  });
}
</script>

<style lang="scss" scoped>
.main {
  background-color: rgba(255, 255, 255, 0.964);
  margin: 3.5vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .fechas {
    margin-bottom: 10px;
  }
  .productos {
    .producto {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;

      .top-banner {
        background-color: rgb(198, 198, 198);
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .apartado {
          display: flex;
          flex-direction: column;
          margin: 5px;

          .titulo {
            font-weight: bold;
            font-size: 16px;
          }
        }
        .datos-left {
          display: flex;

          div {
            margin: 10px;
          }
        }
      }

      .content-p {
        background-color: white;
        border-radius: 0px 0px 10px 10px;
        border: 2px solid rgb(198, 198, 198);
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
          margin-right: 10px;
          margin-left: 10px;
        }
        .img-p {
          img {
            width: 13.2vw;
            height: 13.2vw;
          }
        }
      }
    }
  }
}
</style>
