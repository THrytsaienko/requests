<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">OMDB</router-link> |
      <router-link to="/json">{JSON} Placeholder</router-link> | 
      <router-link to="/jsonPost">{JSON} Post request</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
