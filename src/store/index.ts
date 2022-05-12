import { createStore } from 'vuex'
import services from './services';
import Swal from 'sweetalert2';
import router from '@/router';

// Create a new store instance.
const store = createStore({
    state: {
      User:{
        usuid: '2',
        usunom: '',
        usuemail: '',
        carrito: []
      }
        
    },
    mutations: {
        SAVE_USER_LOGIN(state, u){
          console.log("hola");
          //u hace referencia al objeto json formado por los datos del login
            services.login(u.email, u.password).then((res) => {
              console.log(res);
                switch (res.status) {
                    case 200:
                      console.log("dsadadaa");
                      if (res.data.found) {
                        //Guardamos los datos del usuario en el store
                        state.User.usuid = res.data.response.usuid;
                        state.User.usunom = res.data.response.usunom;
                        state.User.usuemail = res.data.response.usuemail;
                        router.push({ name: "HomeView" });
                        Swal.fire({
                          icon: "success",
                          title: "Login completado",
                          text: "Te has logueado con éxito!!!",
                          showConfirmButton: false,
                          timer: 2000,
                        });
                      }else{
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
        }
    },
    actions:{
      saveUserLogin({commit}, u){
        commit('SAVE_USER_LOGIN', u);
      }
    },
    getters:{},
  })

export default store;