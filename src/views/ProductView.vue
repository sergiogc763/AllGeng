<template>
  <div class="main">
    <div class="name-p">
      {{ producto.nombre }}
    </div>
    <div class="top-p">
      <div class="img-p">
        <img />
      </div>
      <div class="price-p">
        <div class="precio">{{ producto.precio }}</div>
        <div class="cantidad">
          <span>Cantidad:</span><input type="number" v-model="cantidad"/>
        </div>
        <div class="total">{{cantidad}}</div>
      </div>
    </div>
    <div class="bot-p">
      <div class="desc-p">
        <p class="desc"></p>
      </div>
      <div class="coments-p"></div>
    </div>
  </div>
  <div ref="paypal"></div>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { RoutePaths } from '../core/general/RoutePaths';
import axios from "axios";
import { ref } from "vue";

export default {
  name: "ProductView",

  data() {
      
    return {
      loaded: false,
      paidFor: false,
      cantidad: ref<Number>(0),
      producto: {
        nombre: "",
        precio: 0,
        description: "",

      }
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AY-sBQ9Vftv20_Ys3NGCJyJ_2jCPp1NxO7-sinxBniEWwCqK5Uf_aJm-vLzYbl2y9ok4cuxAFb4Vm2AR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    this.getProductById();

  },
  methods: {

    getProductById: function() {
        this.producto.precio = 9

        const formData = new FormData();
        formData.append('id', this.$route.params.id)

         axios.post(`${RoutePaths.API}getProductById.php`, formData)
        .then((response) => {
          switch (response.status) {
            case 200:
                this.producto.precio = response.data.response.prodprec
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
        }).catch((error) => {
          console.error("There was an error!", error);
        });
    },
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: 20
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            // const order = await actions.order.capture();
            // this.paidFor = true;
            // console.log(order);
            Swal.fire({
                  icon: "success",
                  title: "Correcto",
                  showConfirmButton: true,
                });
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }

  }
};
</script>

<style lang="scss" scoped></style>
