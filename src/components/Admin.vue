<template>
  <div class="box-content">
    <div class="habitaciones">
      <h1>
        ¡Bienvenido <span> {{ username }} </span>!
      </h1>
      <h2 class="habitaciones-title">
        Habitaciones Creadas
      </h2>
      <table class="visualizar-habitaciones">
        <tr class="item-lista-habitaciones">
          <th>id</th><th>Descripcion</th><th>Estado</th><th>Precio</th>
        </tr>
        <tr class="item-lista-habitaciones" v-for="room in rooms" v-bind:key="room.id">
          <td>{{room.id}}</td><td>{{room.descripcion}}</td><td>{{room.disponibilidad}}</td><td>{{room.precio}}</td>
        </tr>
      </table>
    </div>
    <div class="create-rooms">
      <h2 class="habitaciones-title"> Crear Habitacion </h2>
      <form class="create-room" v-on:submit.prevent="createRoom">
        <input class="create-room-i" type="text" v-model="new_room.descripcion" placeholder="Descripcion" />
        <input class="create-room-i" type="number" v-model="new_room.precio" placeholder="Precio" />
        <input class="create-room-i" type="checkbox" v-model="new_room.disponibilidad" placeholder="Name" />
        <button type="submit">Añadir</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "Admin",
  data: function() {
    return {
      rooms: [],
      username: localStorage.getItem("username") || "none",
      new_room: {
        descripcion: "",
        disponibilidad: false,
        precio: "",
      },
    };
  },
  //rooms: function() {
  //  return [];
  //},
  methods: {
    getRooms: async function() {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios.get("https://project-hotel-be.herokuapp.com/habitacion/detail/100/", {
        headers: {'Authorization': `Bearer ${token}`}
      },).then((result) => {
          /*let rooms = {
            descripcion: result.descripcion,
            disponibilidad: result.data.disponibilidad,
            precio: result.data.precio,
          };*/
          this.rooms = (result.data);
          console.log(result.data);
        })
        .catch(() => {
          //this.$emit('logOut');
        });
    },
    verifyToken: function() {
      return axios
        .post(
          "https://project-hotel-be.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    createRoom: async function() {
      console.log(this.new_room);
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios
        .post("https://project-hotel-be.herokuapp.com/habitacion/create/", this.new_room, {
          headers: {'Authorization': `Bearer ${token}`}
        })
        .then((result) => {
          alert("Creacion Exitosa")
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
          else{
            alert("Fallo en la creacion de habitacion")
          }
        });
      this.getRooms();
    },
  },
  created: async function() {
    console.log(this.getRooms());
    //var rooms;
    //rooms = this.getRooms();
    console.log(this.rooms);
  },
};
</script>
<style>
.box-content {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.box-content h1 {
  font-size: 50px;
  color:#e5e7e9;
  /*border: 1px solid yellow;*/
  text-align: center;
  height: fit-content;
}
.box-content h1 span{
  color: crimson;
}
.box-content h2 {
  font-size: 30px;
  color: var(--font-color);
  width: 700px;
  text-align: center;
  /*border: 1px solid yellow;*/
}
.visualizar-habitaciones {
  border-collapse: separate;
  width: 100%;
  border: 1px solid var(--background-color-shadow);
}
.visualizar-habitaciones tr {
  margin-top: 130px;
  padding-top: 130px;
  color: white;
  border: 1px solid var(--background-color-shadow);
}
.visualizar-habitaciones td, .visualizar-habitaciones th{
  border: 1px solid var(--background-color-header);
  padding: 10px;
}
.item-lista-habitaciones {
  text-align: right;
  color: white;
  margin-bottom: 10px;
}
.create-room{
  border: 1px solid var(--background-color-shadow);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: fit-content;
  background: var(--background-color-principal);
}
.create-room-i{
  height: fit-content;
  margin: 1px 6px;
  border-radius: 3px;
  border: 2px solid var(--background-color-header);
  background: var(--font-color);
  color: var(--background-color-principal);
}
.create-room-i:first-child {
  width: 70%;
}
.create-room button{
  width: fit-content;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
  font-size: 15px;
  font-weight: bolder;
};
</style>
