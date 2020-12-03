<template>
  <div class="container">
      <div class="image-wrapper">
          <img alt="Vue logo" src="../assets/omdb-logo.jpg">
      </div>
      <OmdbMovies msg="The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users."/>
  </div>
</template>

<script>
// @ is an alias to /src
import OmdbMovies from '@/components/OmdbMovies.vue'

export default {
  name: 'Home',
  components: {
    OmdbMovies
  }
}
</script>

<style lang="scss">
.container {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.image-wrapper {
    width: 100%;
    max-width: 300px;
}
img {
    width: 100%;
}
</style>