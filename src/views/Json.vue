<template>
  <div class="container">
      <div class="image-wrapper">
          <img alt="Vue logo" src="../assets/json-placeholder-logo.jpg">
      </div>
      <JSONPlaceholder msg="Free to use fake Online REST API for testing and prototyping"/>
  </div>
</template>

<script>
// @ is an alias to /src
import JSONPlaceholder from '@/components/JSONPlaceholder.vue'

export default {
  name: 'Home',
  components: {
    JSONPlaceholder
  }
}
</script>