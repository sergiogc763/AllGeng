<template>
  <div class="main" v-if="store.getters.logged">
    <div class="fechas">
      <select
        class="form-select"
        v-model="fecha"
        @change="mostrarProductosFecha"
      >
        <option selected value="3">
          Últimos 3 meses
        </option>
        <option v-for="options in fechas" v-bind:value="options">
          {{ options }}
        </option>
      </select>
    </div>

    <div class="productos">
      <div class="producto" v-for="p in historial">
        {{ p }}

        <div class="top-banner"></div>
        <div class="p-img">
          <img class="img" :src="RoutePaths.BASE + p.imagen" />
        </div>
        <div class="p-datos"></div>
      </div>
    </div>
  </div>
  <Page404 v-else />
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import Page404 from "@/components/Page404.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";

//#region CONST

const fecha = ref<any>(3);

const fechas = ref<Array<any>>([]);

const store = useStore();

const historial = ref<Array<any>>([]);

onBeforeMount(() => {
  //Lo primero que hacemos es comprobar que el usuario se encuentre logeado con éxito antes de realizar la obtención de los datos
  if (store.getters.logged) {
    const formData = new FormData();
    formData.append("id", store.getters.userId);
    //   formData.append("filtro", filtro);

    axios
      .post(`${RoutePaths.API}getFechasHistorial.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            const fechasBD: Array<any> = [];
            response.data.products.data.forEach((element: any) => {
              historial.value.push(element);
              fechasBD.push(element.anio);
            });

            fechas.value = Array.from(new Set(fechasBD)); //Quitamos fechas duplicadas

            obtenerHistorialFitro();//obtenemos historial principal con el filtro de 3 meses
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



function mostrarProductosFecha() {
 obtenerHistorialFitro();
}

function obtenerHistorialFitro() {
  const formData = new FormData();
  formData.append("id", store.getters.userId);
  formData.append("filtro", fecha.value);

  axios
    .post(`${RoutePaths.API}getHistorialUsuario.php`, formData)
    .then((response) => {
      switch (response.status) {
        case 200:
        historial.value = []
          response.data.products.data.forEach((element: any) => {
            historial.value.push(element);
          });
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

</script>

<style lang="scss" scoped>
.main {
  margin: 3.5vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .productos {
    .producto {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
