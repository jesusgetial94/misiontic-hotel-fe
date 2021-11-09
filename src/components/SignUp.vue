<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrarse</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />
        <input type="password" v-model="user.password" placeholder="Password" />
        <br />
        <input type="text" v-model="user.name" placeholder="Name" />
        <br />
        <input type="email" v-model="user.email" placeholder="Email" />
        <br />
        <input type="number" v-model="user.identification" placeholder="Identificación" />
        <br />
        <input type="number" v-model="user.phone" placeholder="Phone" />
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data: function() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
        identification: "",
        phone: "",
      },
    };
  },
  methods: {
    processSignUp: function() {
        {{ console.log(this.user) }}
      axios
        .post("https://project-hotel-be.herokuapp.com/user/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataSignUp = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>

<style>
.signUp_user {
  margin: 0;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.container_signUp_user {
  border: 3px solid var(--background-color-shadow);
  background-color: var(--background-color-secundary);
  border-radius: 10px;
  width: 340px;
  height: fit-content;
  margin: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signUp_user h2 {
  color: var(--font-color-secundary);
}
.signUp_user form {
  width: 70%;
}
.signUp_user input {
  height: 15px;
  width: 100%;
  box-sizing: border -box;
  color: var(--font-color-secundary);
  text-align: center;
  padding: 10px 0px;
  margin: 3px 0;
  border: 1px solid #283747;
  background-color: var(--background-color-principal);
}
.signUp_user button {
  width: 100%;
  height: 40px;
  color: var(--font-color);
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.signUp_user button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>
