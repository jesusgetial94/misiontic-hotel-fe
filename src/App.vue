<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Hotel El Encano</h1>
      <nav>
        <button v-if="is_auth" v-on:click="loadHome"> Inicio </button>
        <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesion </button>
        <button v-if="!is_auth" v-on:click="loadLogIn"> Iniciar Sesion </button>
        <button v-if="!is_auth" v-on:click="loadSignUp"> Registrarse </button>
      </nav>
    </div>
    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>
    <div class="footer">
      <h2>MISION TIC 2022</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function(){
    return {
      is_auth: false,
    };
  },
  components: {},
  methods: {
    verifyAuth: function() {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false)
      this.$router.push({ name: "logIn" });
      else{

        if(localStorage.getItem("username")=="admin"){
          this.$router.push({ name: "admin" });
        }else{
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
    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
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
    this.verifyAuth()
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
