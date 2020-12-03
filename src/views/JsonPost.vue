<template>
  <div class="container">
      <div class="image-wrapper">
          <img alt="Vue logo" src="../assets/json-placeholder-logo.jpg">
      </div>
      <JSONPlaceholderPost msg="Here you can make post request"/>
  </div>
</template>

<script>
// @ is an alias to /src
import JSONPlaceholderPost from '@/components/JSONPlaceholderPost.vue'

export default {
  components: {
    JSONPlaceholderPost
  }
}
</script>