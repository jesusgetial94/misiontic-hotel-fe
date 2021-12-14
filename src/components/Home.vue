<template>
  <div class="greetings">
    <div class="float-image">
        <h1>
          ¡Bienvenido <span> {{ username }} </span>!
        </h1>
    </div>
    <h2 class="habitaciones-title">
        Habitaciones disponibles
    </h2>
      <!--
      <table class="visualizar-habitaciones">
        <tr>
          <th>id</th><td>{{room.id}}</td>
        </tr>
        <tr>
          <th>Descripcion</th><td>{{room.descripcion}}</td>
        </tr>
        <tr>
          <th>Estado</th><td v-for="room in rooms" v-bind:key="room.id">{{room.disponibilidad}}</td>
        </tr>
        <tr>
          <th>Precio</th><td v-for="room in rooms" v-bind:key="room.id">{{room.precio}}</td>
        </tr>
      </table>
      -->
  </div>
</template>
<script>
export default {
  rooms: [],
  name: "Home",
  data: function() {
    return {
      username: localStorage.getItem("username") || "",
    };
  },
};
</script>
<style>
.float-image {
    border: solid 2px var(--background-color-shadow);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100vw;
    aspect-ratio: 0.5;
    height: 50%;
    opacity: 0.7;
    background-image: url('https://www.hotelsindamanoy.gov.co/media/index-banner/ca146f3e-d09a-494b-a28f-e4869e7ae60c.jpg');
    background-position-x: right;
}
.greetings {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.float-image h1 {
  font-size: 50px;
  color: var(--font-color);
  background: rgba(0,0,0,0.7);
}
.float-image span {
  color: crimson;
  font-weight: bold;
}
</style>
