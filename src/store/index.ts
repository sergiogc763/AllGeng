import { createStore } from "vuex";
import servicesUser from "./servicesUser";
import Swal from "sweetalert2";
import router from "@/router";

// Create a new store instance.
const store = createStore({
  state: {
    User: {
      usuid: "",
      usunom: "",
      usutelf: "",
      usuemail: "",
      rolid:"",
      logged: false,
    },
  },
  mutations: {
    SAVE_USER_LOGIN(state, u) {
      //u hace referencia al objeto json formado por los datos del login
      servicesUser
        .login(u.email, u.password)
        .then((res) => {
          switch (res.status) {
            case 200:
              if (res.data.found) {
                //Guardamos los datos del usuario en el store
                state.User.usuid = res.data.response.usuid;
                state.User.usunom = res.data.response.usunom;
                state.User.usutelf = res.data.response.usutelf;
                state.User.usuemail = res.data.response.usuemail;
                state.User.rolid = res.data.response.rolid;
                state.User.logged = true;
                router.push({ name: "HomeView" });
                Swal.fire({
                  icon: "success",
                  title: "Login completado",
                  text: "Te has logueado con éxito!!!",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Usuario no existe",
                  text: "Error no existe usuario",
                  showConfirmButton: true,
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

    REGISTER(state, u) {
      servicesUser
        .register(u.name, u.email, u.phone, u.password)
        .then((response) => {
          switch (response.status) {
            case 200:
              if (response.data) {
                router.push({ name: "LoginView" });
                Swal.fire({
                  icon: "success",
                  title: "Registro completado",
                  text: "Te has registrado con éxito!!!",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "ERROR",
                  text: "Error interno. Perdone las molestias",
                  showConfirmButton: false,
                  timer: 2000,
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

    LOGOUT(state) {
      state.User.usuid = "";
      state.User.usunom = "";
      state.User.usutelf = "";
      state.User.rolid = "";
      state.User.logged = false;
    },

    CHANGE_DATA_USER(state, o) {
      switch (o.option) {
        case "Name":
          servicesUser
            .updateName(state.User.usuid, o.nom)
            .then((response) => {
              switch (response.status) {
                case 200:
                  if (response.data) {
                    state.User.usunom = o.nom;
                    Swal.fire({
                      icon: "success",
                      title: "Nombre actualizado",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR",
                      text: "Error interno. Perdone las molestias",
                      showConfirmButton: false,
                      timer: 2000,
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

          break;

        case "Email":
          servicesUser
            .updateEmail(state.User.usuid, o.email)
            .then((response) => {
              switch (response.status) {
                case 200:
                  if (response.data) {
                    state.User.usuemail = o.email;
                    Swal.fire({
                      icon: "success",
                      title: "Email actualizado",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR",
                      text: "Error interno. Perdone las molestias",
                      showConfirmButton: false,
                      timer: 2000,
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

          break;

        case "Phone":
          servicesUser
            .updatePhone(state.User.usuid, o.telf)
            .then((response) => {
              switch (response.status) {
                case 200:
                  if (response.data) {
                    state.User.usutelf = o.telf;
                    Swal.fire({
                      icon: "success",
                      title: "Teléfono actualizado!",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR",
                      text: "Error interno. Perdone las molestias",
                      showConfirmButton: false,
                      timer: 2000,
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

          break;

          case "Password":
          servicesUser
            .updatePassword(state.User.usuid, o.oldPassword, o.newPassword)
            .then((response) => {
              switch (response.status) {
                case 200:
                  if (response.data) {
                    Swal.fire({
                      icon: "success",
                      title: "Contraseña actualizada!",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "ERROR",
                      text: "Error. La antigua contraseña no coincide",
                      showConfirmButton: false,
                      timer: 2000,
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

          break;
        
      }
    },

  },
  actions: {
    getProducts({ commit }){
      commit("GET_PRODUCTS_DB");
    },
    saveUserLogin({ commit }, u) {
      commit("SAVE_USER_LOGIN", u);
    },
    register({ commit }, u) {
      commit("REGISTER", u);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    changeDataUser({ commit }, o) {
      commit("CHANGE_DATA_USER", o);
    },

  },
  getters: {
    userId(state) {
      return state.User.usuid;
    },
    userName(state) {
      return state.User.usunom;
    },
    userEmail(state) {
      return state.User.usuemail;
    },
    userPhone(state) {
      return state.User.usutelf;
    },
    rolId(state) {
      return state.User.rolid;
    },
    logged(state){
      return state.User.logged
    }
  },
});

export default store;
