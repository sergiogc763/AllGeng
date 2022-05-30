<template>
  <div class="content">

      <div class="producto" v-for="p in historial">
          {{p}}
      </div>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import Swal from "sweetalert2";
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

//#region CONST
const store = useStore();

const historial = ref<Array<any>>([]);
const fechas = ref<Array<any>>([])
onBeforeMount(() => {
  const formData = new FormData();
  formData.append("id", store.getters.userId);

  axios
    .post(`${RoutePaths.API}getHistorialUsuario.php`, formData)
    .then((response) => {
      switch (response.status) {
        case 200:
          response.data.products.data.forEach((element: any) => {
        
            historial.value.push(element);
            fechas.value.push(element.histfecha);
          });

        fechas.value = Array.from(new Set(fechas.value))//Quitamos fechas duplicadas
        console.log(fechas.value);
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
});

</script>

<style lang="scss" scoped></style>
