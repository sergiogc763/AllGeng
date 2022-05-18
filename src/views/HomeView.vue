<template>
<div class="body">
  <div class="content">
      <CardProduct :producto="ob" v-for="ob in productos"/> 
  </div>
</div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { Producto } from "../core/types/Product";
import CardProduct from "@/components/product/CardProduct.vue";
const productos = ref<Array<Producto>>([]);

created: {
  async function getProductos() {
    await axios
      .post(`${RoutePaths.API}getProductos.php`, null, {})
      .then((res) => {
        switch (res.status) {
          case 200:
            // console.log(res);
            res.data.products.data.forEach((element: any) => {
              const p: Producto = {
                id: element.prodid,
                nombre: element.prodnom,
                descripcion: element.proddesc,
                img: "",
                precio: element.prodprec,
              };
              productos.value.push(p);
            });
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  getProductos();
}

</script>

<style lang="scss" scoped>

.body{
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  .content {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  width: 25vw;
  border-radius: 5px;
  
  
}
}

</style>
