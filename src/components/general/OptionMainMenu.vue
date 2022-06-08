<template>
  <button class="btnAccount">
    <font-awesome-icon :icon="props.icono" class="img-icons" /><span
      >{{ props.texto }}</span
    >
  </button>
</template>

<script lang="ts" setup>
/*Componente que muestra la imagen y el texto de la opciones del menú principal */

//#region PROPS
const props = defineProps({
  icono: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
});
//#endregion
</script>

<style lang="scss" scoped>
.btnAccount {


    .img-icons{
   
    width: 30px;
  }
    color: whitesmoke;
  --_g1: conic-gradient(from 90deg at 50% 75%,rgba(223, 223, 223, 0.898),rgba(223, 223, 223, 0.898) 0) no-repeat;
  --_g2: conic-gradient(from 90deg at 50% 75%,#0000 90deg,rgba(223, 223, 223, 0.898) 0) no-repeat;
  background: 
    var(--_g1) 0    calc(134% - var(--_p,0%)),
    var(--_g2) 0    calc(134% - var(--_p,0%)),
    var(--_g1) 100% calc(200% - var(--_p,0%)),
    var(--_g2) 100% calc(200% - var(--_p,0%)),
    #000;
  background-size: 50.3% 400%;
  -webkit-background-clip: text, padding-box;
          background-clip: text, padding-box;
  transition: 0.8s
}
.btnAccount:hover {
  --_p: 134%;
  color:#000
}
</style>
