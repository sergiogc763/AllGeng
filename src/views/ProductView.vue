<template>
  <div class="main">
    <div class="banner"></div>
    <div class="top-p">
      <div class="img-p">
        <img src="@/assets/n64.jpg" style="width: 75%" />
      </div>
      <div class="price-p">
        <div class="nombre">
          <h5>{{ producto.nombre }}</h5>
        </div>
        <div class="precio">{{ producto.precio }} €</div>
        <div class="cantidad">
          <span>Cantidad:</span
          ><input @change="onChange($event)" type="number" min="1" value="1" />
        </div>
        <div class="total">Precio total: {{ total }} €</div>
        <div ref="paypal"></div>
      </div>
    </div>
    <div class="banner"></div>
    <div class="bot-p">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" @click="optionSelected(1)">Descripción</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="optionSelected(2)">Características</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="optionSelected(3)">Comentarios</a>
        </li>
      </ul>
      <div class="option-show">
        <div class="descripcion" v-if="opcion === 1">
          <TextOptionProduct :text="producto.descripcion" />
        </div>
        <div class="caracterisitcas" v-if="opcion === 2">
          <TextOptionProduct :text="producto.caracteristicas" />
        </div>
        <div class="comentarios" v-if="opcion === 3">
          <p>{{ producto.descripcion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { RoutePaths } from "../core/general/RoutePaths";
import axios from "axios";
import TextOptionProduct from "@/components/product/TextOptionProduct.vue";
import store from "@/store";

export default {
  name: "ProductView",
  components: {
    TextOptionProduct,
  },
  data() {
    return {
      loaded: false,
      paidFor: false,
      cantidad: 0,
      total: 0,
      producto: {
        nombre: "",
        img: "",
        precio: 0,
        descripcion: "",
      },
      opcion: 0,
    };
  },
  mounted: function () {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AdrZ7GR8G_VOHh4rH3H_P_McBUk7WQdRcWE8EB0gtZm5J0BpFbr5JCN36oAW0b1JS7-k6EC00T5AOZo3";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    this.getProductById();
  },
  methods: {
    optionSelected(option) {
      this.opcion = option;
    },
    onChange(event) {
      this.cantidad = event.target.value;
      this.total = this.cantidad * this.producto.precio;
    },
    getProductById() {

      const formData = new FormData();
      formData.append("id", this.$route.params.id);

      axios
        .post(`${RoutePaths.API}getProductById.php`, formData)
        .then((response) => {
          switch (response.status) {
            case 200:
              this.producto.nombre = response.data.response.prodnom;
              this.producto.precio = response.data.response.prodprec;
              this.producto.descripcion = response.data.response.proddesc;
              this.total = this.producto.precio;
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
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    setLoaded() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.producto.nombre,
                  amount: {
                    currency_code: "USD",
                    value: this.total,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let fecha = "";
            if(month < 10){
              fecha = `${year}-0${month}-${day}`
            }else{
              fecha = `${year}-${month}-${day}`
            }
            Swal.fire({
              icon: "success",
              title: "Se ha realizado la compra",
            });
            axios
              .post(`${RoutePaths.API}insertHistorial.php`, null, {
                params: {
                  iduser: store.getters.userId,
                  idproduct: this.$route.params.id,
                  fecha: fecha,
                },
              })
              .then((response) => {
                switch (response.status) {
                  case 200:
                    if(response.data){
                       Swal.fire({
                      icon: "success",
                      title: "Guardado los datos de compra",
                      text: "Se ha registrado la compra en su historial",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    }
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
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: white;

  .banner {
    margin: 0;
    width: 100%;
    background-color: black;
    height: 50px;
  }
  .top-p {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .price-p {
      // margin-top: 15vh;
      background-color: rgb(183, 183, 183);
      padding: 20px;
      border-radius: 5px;
      height: fit-content;
      .nombre {
        display: flex;
        justify-content: center;
      }

      .precio {
        color: rgb(255, 128, 0);
        font-weight: bold;
        font-size: 25px;
      }
    }
  }

  .bot-p {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
