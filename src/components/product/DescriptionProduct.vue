<template>
  <div class="descripcion">
    <p>{{ props.descripcion }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  descripcion: {
    required: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.descripcion {

    p{
        margin-top: 25px;
        margin-right: 25vw;
        margin-left: 25vw;
    }
  
}
</style>
