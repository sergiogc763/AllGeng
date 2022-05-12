<template>
  <h1>HOLA</h1>
  {{ store.state.User.usuid }}
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';

const store = useStore();


</script>

<style>

</style>