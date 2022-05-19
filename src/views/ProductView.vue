<template>
  <div class="main">
    <div class="name-p">
     
    </div>
    <div class="top-p">
      <div class="img-p">
        <img />
      </div>
      <div class="price-p">
          <div class="precio">
             
          </div>
          <div class="cantidad">
            <span>Cantidad:</span><input type="number" />
          </div>
          <div class="total">

          </div>

      </div>
    </div>
    <div class="bot-p">
      <div class="desc-p">
          <p class="desc">
             
          </p>
      </div>
      <div class="coments-p"></div>
    </div>
  </div>
  <div ref="paypal"></div>
</template>

<script>export default {
  name: "HelloWorld",

  data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg"
      }
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AY-sBQ9Vftv20_Ys3NGCJyJ_2jCPp1NxO7-sinxBniEWwCqK5Uf_aJm-vLzYbl2y9ok4cuxAFb4Vm2AR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
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
                    value: this.product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
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
