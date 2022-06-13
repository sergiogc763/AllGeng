<template>
  <div class="footer">
    <div class="help">
      <img src="@/assets/help.png" class="m-3" @click="help" />
      <img src="@/assets/warning.png" class="m-3" @click="warning" />
    </div>
    <div class="autor">
      <span>Copyright © Sergio García Calzada</span>
    </div>

    <div class="mapa">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.6624016556775!2d-4.79992108532385!3d37.89157711320499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6cdf5b069498d9%3A0x810d06e06b60e1b4!2sIES%20Trassierra!5e0!3m2!1ses!2ses!4v1655122327075!5m2!1ses!2ses"
        width="215px"
        height="90px"
        style="border: 0"
        allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "@/core/general/RoutePaths";
import axios from "axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const t = useI18n();

//#region FUNCTIONS
function help() {
  Swal.fire({
    icon: "info",
    title: t.t('about'),
    text: t.t("textAbout"),
    showConfirmButton: true,
  });
}

function warning() {
  Swal.fire({
    title: "Conctact with us and describe your problem",
    html: `<input type="text" id="email" class="swal2-input" placeholder="Write your email">
 <textarea id="description" rows="4" class="swal2-textarea" cols="30" placeholder="Describe your problem..."></textarea>`,
    confirmButtonText: "Send",
    focusConfirm: false,
    preConfirm: () => {
      const email = (
        Swal.getPopup()!.querySelector("#email") as HTMLInputElement
      ).value;
      const description = (
        Swal.getPopup()!.querySelector("#description") as HTMLInputElement
      ).value;

      if (!email || !description) {
        Swal.showValidationMessage(`Please enter email and description`);
      }

      return { email: email, description: description };
    },
  }).then(async (result) => {
      let formData = new FormData();
      
      let email = "ERROR"
      let text = "ERROR";
      if(result.value?.email === undefined){
          email = "";
      }else{
          email = result.value?.email;
      }

      if(result.value?.description === undefined){
          text = "";
      }else{
          text = result.value?.description;
      }

      if(email !== "" && text !== ""){
        formData.append("email", email);
    formData.append("text", text);
      await axios
      .post(`${RoutePaths.API}sendWarning.php`, formData)
      .then((response) => {
        switch (response.status) {
          case 200:
            console.log(response);
            if (response.data) {
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
            break;

          case 404:
            Swal.fire({
              icon: "error",
              title: t.t('titleWarning'),
              text: t.t('error404'),
              showConfirmButton: false,
              timer: 2000,
            });
            break;

          case 500:
            Swal.fire({
              icon: "error",
              title: t.t('titleWarning'),
              text: t.t('error500'),
              showConfirmButton: false,
              timer: 2000,
            });
            break;
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
      }
    

  });
}
//#endregion
</script>

<style lang="scss" scoped>
.footer {
  background-color: #212529;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .help {
    img {
      width: 85px;
      height: 85px;
    }
  }

  .autor {
    color: white;
    font-weight: bold;
  }

  .mapa {
    margin: 10px;
  }
}
</style>
