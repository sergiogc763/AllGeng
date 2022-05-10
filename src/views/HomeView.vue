<template>
  <h1>HOLA</h1>
</template>

<script lang="ts" setup>
import { CodesHttp } from '@/core/general/CodesHttp';

async function getProducts() {
  await fetch(
    "http://www.iestrassierra.net/alumnado/curso2122/DAW/daw2122a5/API/getProductos.php")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {

      const response = JSON.parse(data)
      
      if (response['codehttp'] === CodesHttp.Success) {
        console.log(response['response'].data[0]);
      } else {
        alert("ERROR RECUPERAR");
      }
    })
    .catch(function (error) {
      console.log("Request failed-> "+ CodesHttp.Error, error);
    });
}
</script>

<style>

</style>