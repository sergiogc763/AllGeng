<template>
  <div class="text">
    <p>{{ props.text }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    required: true,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.text {
  p {
    font-size: 14px;
    font-weight: bold;
    margin-top: 25px;
    margin-right: 16vw;
    margin-left: 16vw;
     color: black;
  }
}
</style>
