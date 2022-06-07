<template>
  <MainMenu />

  <router-view />
  <!-- <Footer /> -->
</template>

<script setup lang="ts">
import MainMenu from "@/components/MainMenu.vue";
import Footer from "./components/Footer.vue";
import { onBeforeMount } from "vue";
import { useStore } from 'vuex';
import axios from "axios";
import { RoutePaths } from "./core/general/RoutePaths";

//#region USE
const store = useStore();
//#endregion

onBeforeMount(() => {
  if (localStorage) {

    if (
      localStorage.getItem("userSession") !== undefined &&
      localStorage.getItem("userSession")
    ) {
      store.dispatch("getUserRemember", localStorage.getItem("userSession"));

    }
  }
 });
</script>

<style lang="scss" scoped></style>
