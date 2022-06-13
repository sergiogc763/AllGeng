<template>
  <div class="main">
    <div class="banner"></div>
    <div class="top-p">
      <div class="img-p">
        <div
          id="carouselExampleInterval"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner mt-4">
            <div class="carousel-item active w-50" data-bs-interval="5000">
              <img :src="producto.img" class="d-block" />
            </div>
            <div
              class="carousel-item w-50"
              data-bs-interval="5000"
              v-for="imgagen in producto.imagenes"
              v-bind:key="imagen"
            >
              <img :src="imgagen" class="d-block" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="price-p">
        <div class="nombre">
          <h3 class="nomP">{{ producto.nombre }}</h3>
        </div>
        <div class="precio">{{ producto.precio }} €</div>
        <div class="cantidad">
          <span>{{ $t("units") }}:</span
          ><input
            class="cantidad-p"
            v-model="cantidad"
            @change="onChange($event)"
            type="number"
            min="1"
            :max="this.producto.stock"
          />
          <div class="total">
            {{ $t("totalPrice") }}: {{ total.toFixed(2) }} €
          </div>
        </div>

        <div ref="paypal" class="btn-paypal" v-if="producto.stock > 0"></div>
        <div v-else>
          <h6>{{ $t("outOf") }} stock</h6>
        </div>
      </div>
    </div>
    <div class="banner mt-5"></div>
    <div class="bot-p">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" @click="optionSelected(1)">{{
            $t("description")
          }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="optionSelected(3)">{{
            $t("comments")
          }}</a>
        </li>
      </ul>
      <div class="option-show">
        <div class="descripcion" v-if="opcion === 1">
          <TextOptionProduct :text="producto.descripcion" />
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
      cantidad: 1,
      total: 0,
      producto: {
        nombre: "",
        img: "",
        precio: 0,
        descripcion: "",
        imagenes: [],
        stock: 0,
      },
      opcion: 0,
    };
  },
  created: async function () {
    await this.getProductById();

    if (this.producto.stock > 0) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AdrZ7GR8G_VOHh4rH3H_P_McBUk7WQdRcWE8EB0gtZm5J0BpFbr5JCN36oAW0b1JS7-k6EC00T5AOZo3";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    }
  },
  methods: {
    optionSelected(option) {
      this.opcion = option;
    },
    onChange(event) {
      this.cantidad = event.target.value;

      if (this.cantidad <= this.producto.stock && this.cantidad > 0) {
        this.total = this.cantidad * this.producto.precio;
      } else {
        Swal.fire({
          icon: "warning",
          title: this.$t("titleWarning"),
          text: this.$t("errorUnits"),
          showConfirmButton: false,
          timer: 1250,
        });
        this.total = this.producto.precio;
        this.cantidad = 1;
      }
    },
    async getProductById() {
      const formData = new FormData();
      formData.append("id", this.$route.params.id);

      await axios
        .post(`${RoutePaths.API}getProductById.php`, formData)
        .then((response) => {
          switch (response.status) {
            case 200:
              this.producto.nombre = response.data.response.prodnom;
              this.producto.precio = response.data.response.prodprec;
              this.producto.descripcion = response.data.response.proddesc;
              this.producto.img =
                RoutePaths.BASE + response.data.response.imagen;
              this.producto.stock = response.data.response.stock;
              this.total = this.producto.precio;

              axios
                .post(`${RoutePaths.API}getFotosProducto.php`, formData)
                .then((res) => {
                  switch (res.status) {
                    case 200:
                      res.data.fotos.data.forEach((element) => {
                        this.producto.imagenes.push(
                          RoutePaths.BASE + element.ruta
                        );
                      });

                      break;

                    case 404:
                      Swal.fire({
                        icon: "error",
                        title: this.$t("titleWarning"),
                        text: this.$t("error404"),
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      break;

                    case 500:
                      Swal.fire({
                        icon: "error",
                        title: this.$t("titleWarning"),
                        text: this.$t("error500"),
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      break;
                  }
                })
                .catch((error) => {
                  console.error("There was an error!", error);
                });

              break;

            case 404:
              Swal.fire({
                icon: "error",
                title: this.$t("titleWarning"),
                text: this.$t("error404"),
                showConfirmButton: false,
                timer: 2000,
              });
              break;

            case 500:
              Swal.fire({
                icon: "error",
                title: this.$t("titleWarning"),
                text: this.$t("error500"),
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
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.producto.nombre,
                  amount: {
                    currency_code: "USD",
                    value: `${(this.total * 1.09885).toFixed(2)}`,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            let date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let fecha = "";

            let hora =
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds();

            let numpedido = `${Math.floor(Math.random() * (999 - 100)) + 100}-${
              Math.floor(Math.random() * (9999999 - 1000000)) + 1000000
            }-${Math.floor(Math.random() * (9999999 - 1000000)) + 1000000}`;
            if (month < 10) {
              fecha = `${year}-0${month}-${day}`;
            } else {
              fecha = `${year}-${month}-${day}`;
            }

            //Insertamos la compra realizada en el historial del usuario conectado actualmente
            await axios
              .post(`${RoutePaths.API}insertHistorial.php`, null, {
                params: {
                  iduser: store.getters.userId,
                  idproduct: this.$route.params.id,
                  fecha: fecha,
                  hora: hora,
                  numpedido: numpedido,
                  cantidad: this.cantidad,
                  total: this.total,
                },
              })
              .then((response) => {
                switch (response.status) {
                  case 200:
                    if (response.data) {
                      Swal.fire({
                        icon: "success",
                        text: this.$t("purchaseCompleted"),
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    }
                    break;

                  case 404:
                    Swal.fire({
                      icon: "error",
                      title: this.$t("titleWarning"),
                      text: this.$t("error404"),
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    break;

                  case 500:
                    Swal.fire({
                      icon: "error",
                      title: this.$t("titleWarning"),
                      text: this.$t("error500"),
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    break;
                }
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });

            //Realizamos el update del stock del producto comprado
            await axios
              .post(`${RoutePaths.API}updateStoreProduct.php`, null, {
                params: {
                  id: this.$route.params.id,
                  stock: this.producto.stock - this.cantidad,
                },
              })
              .then((response) => {
                switch (response.status) {
                  case 200:
                    this.$router.push({ name: "HomeView" });
                    
                    break;
                  case 404:
                    Swal.fire({
                      icon: "error",
                      title: this.$t("titleWarning"),
                      text: this.$t("error404"),
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    break;

                  case 500:
                    Swal.fire({
                      icon: "error",
                      title: this.$t("titleWarning"),
                      text: this.$t("error500"),
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
  background-color: rgba(255, 255, 255, 0.964);

  img {
    width: 35vw;
    height: 35vw;
  }

  .banner {
    padding: 25px;
    background-color: black;
    height: 10vh;
  }
  .top-p {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .img-p {
      width: 35vw;
    }
    .price-p {
      width: 28vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #212529;
      box-shadow: 5px 6px #6e6e6e;
      padding: 20px;
      border-radius: 5px;

      .nombre {
        display: flex;
        justify-content: center;
        color: rgb(222, 222, 222);
      }

      .precio {
        color: rgb(255, 41, 41);
        display: flex;
        justify-content: center;
        font-weight: bold;
        font-size: 35px;
      }

      .cantidad {
        color: white;
        margin: 2px;
        .cantidad-p {
          margin-left: 10px;
          width: 55px;
        }
        .total {
          color: white;
          font-weight: bold;
        }
      }
    }
  }

  .bot-p {
    display: flex;
    flex-direction: column;
    align-items: center;

    .option-show {
      background-color: #dfdfdf;
      box-shadow: 5px 6px #6e6e6e;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 10vw;
      margin-left: 10vw;
      border-radius: 5px;
    }
  }
}
</style>
