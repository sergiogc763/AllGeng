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
    font-size: 16px;
    font-weight: bold;
    margin-top: 25px;
    margin-right: 19vw;
    margin-left: 19vw;
     color: black;
  }
}
</style>
