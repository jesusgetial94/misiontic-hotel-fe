<template>
  <div id="app" class="app">
  <!--<nav class="navbar navbar-expand-md navbar-light" style="background-color: #343a40;">
  <div class="container-fluid">
    <div id="usuario"></div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#barra" aria-controls="barra"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div  class="spinner-grow text-light" role="status">
      <span class="visually-hidden"></span>
    </div>
    <h2><span class="badge badge-outline-info">HOTEL{{is_auth}}{{is_admin}}</span></h2>
    <div class="collapse navbar-collapse" id="barra">
      <ul class="navbar-nav mx-auto">
  -->
        <!-- FUNCIONES ADMINISTRATIVAS -->
  <!--
        <div v-if="is_admin && is_auth" class="btn-group btn-group-lg" role="group" aria-label="Basic example">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Crear Habitación</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Ver Habitaciones</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Ver Usuarios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Ver Reservas</a>
            </li>
          </ul>
        </div>
  -->
        <!-- Funcionalidades User -->
  <!--
        <div v-if="is_admin == false && is_auth" class="btn-group btn-group-lg" role="group"
          aria-label="Basic example">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Reservar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ver Reserva</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">ElegirHabitacion</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Editar Reserva</a>
            </li>
          </ul>
        </div>
      </ul>
  -->
      <!-- Botones para autentificado-->
  <!--
      <ul v-if="is_auth" class="nav navbar-nav">
        <li class="nav-item">
          <button v-on:click="loadLogOut" class="btn btn-primary" id="upload" name="upload"><span
              class='fas fa-sign-out-alt'></span> LogOut</button>
        </li>&nbsp;&nbsp;
      </ul>
  -->
      <!-- Botones para no autentificado-->
  <!--
      <ul v-if="is_auth==false" class="nav navbar-nav">
        <li class="nav-item active">
          <button v-on:click="loadHome" class="btn btn-outline-light" id="editar" name="editar"><span
              class='fa fa-home'></span> Home</button>
        </li>&nbsp;&nbsp;
        <li  class="nav-item">
          <button v-on:click="loadSignUp" class="btn btn-outline-light" id="inicio" name="inicio"><span
              class='fa fa-bookmark'></span> Registro</button>
        </li>&nbsp;&nbsp;
        <li  class="nav-item">
          <button v-on:click="loadLogIn" class="btn btn-outline-warning" v-if="is_auth==false" id="upload" name="upload"><span
              class='fas fa-sign-in-alt'></span> LogIn</button>
        </li>&nbsp;&nbsp;
      </ul>

    </div>
  </div>
</nav>
-->
<NavBar :is_auth="is_auth" :is_admin="is_admin" v-on:loadLogOut="loadLogOut"></NavBar>

  
    <!--<div class="header">
      <h1>Hotel El Encano</h1>
      <nav>
        <button v-if="is_auth" v-on:click="loadHome"> Inicio </button>
        <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesion </button>
        <button v-if="!is_auth" v-on:click="loadLogIn"> Iniciar Sesion </button>
        <button v-if="!is_auth" v-on:click="loadSignUp"> Registrarse </button>
      </nav>
    </div>-->
    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:loadLogOut="loadLogOut"
      >
      </router-view>
    </div>
    <div class="footer">
      <h2>MISION TIC 2022</h2>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import NavBar from '@/components/NavBar.vue';
export default {
  name: "App",
  data: function(){
    return {
      mensaje: "hola",
      is_auth: false,
      is_admin: false,
    };
  },
  components: {
    //NavBar: defineAsyncComponent(() => import ('@/components/NavBar.vue')),
    NavBar
  },
  methods: {
    verifyAuth: function() {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false){
        this.$router.push({ name: "logIn" });
      }
      else{
        if(localStorage.getItem("username")=="admin"){
          this.is_admin=true;
          this.$router.push({ name: "admin" });
        }else{
          this.is_admin=false
          this.$router.push({ name: "home" });
        }
      }
    },
    loadHome: function() {
      this.$router.push({ name: "home" });
    },
    loadLogIn: function() {
      this.$router.push({name: "logIn"});
    },
    loadLogOut: function () {
      localStorage.clear();
      this.verifyAuth();
      alert("Sesión Cerrada");
    },
    loadSignUp: function() {
      this.$router.push({name: "signUp"});
    },
    
    completedLogIn: function (data){
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth();
    },
    completedSignUp: function (data){
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
  },
  created: function () {
    this.verifyAuth();
  }
}
</script>


<style>
:root {
  --nav-bar-height: 50px;
  --footer-height: 50px;
  --background-color-principal:  #0d1117;
  --background-color-secundary: #161b22;
  --background-color-shadow: #21262d;
  --background-color-header: #2B3747;
  --font-color: #e5e7e9;
  --font-color-secundary: #C9D1D9;
}
body {
  margin: 0 0 0 0;
}
.app {
  display: flex;
  flex-direction: column;
}
.header {
  position: sticky;
  top: 0px;
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: var(--nav-bar-height);
  background-color: var(--background-color-shadow);
  color: #E5E7E9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  width: 340px;
  text-align: center;
}
.header nav button {
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 20px;
  border-color: var(--background-color-shadow);
}
.header nav button:hover {
  color: black;
  background: white;
  border: 1px solid #E5E7E9;
}
.main-component {
  position: sticky;
  height: calc(100vh - var(--nav-bar-height) - var(--footer-height));
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  background-color: var(--background-color-principal);
}
.footer {
  
  display:flex;
  align-items: center;
  bottom: 0px;
  margin: 0;
  padding: 0;
  width: 100%;
  height: var(--footer-height);
  background-color: var(--background-color-shadow);
  color: #E5E7E9;
}
.footer h2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
