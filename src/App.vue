<template>
  <MainMenu />
  <router-view/>
  <!-- <Footer /> -->
</template>

<script setup lang="ts">
import MainMenu from '@/components/MainMenu.vue';
import Footer from './components/Footer.vue';
import { onBeforeMount } from 'vue';
import CryptoJS from 'crypto-js';



var data = [{id: 1}, {id: 2}]

// Encrypt
// var ciphertext = CryptoJS.MD5
// console.log(ciphertext);
// onBeforeMount(()=>{
// console.log("dasdadsad");
// })


</script>

<style lang="scss" scoped>

</style>
