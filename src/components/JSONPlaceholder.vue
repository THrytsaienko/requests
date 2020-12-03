<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <div class="single-post">
        <div class="single-post__input-block">
            <label for="post">Post ID</label>
            <input type="text" id="post" value="post" v-model="postIdInput">
        </div>
        <button class="single-post__button" @click="searchPost()">Search post</button>
         <dot-loader :loading="loadingSinglePost"></dot-loader>
        <div v-if="!loadingSinglePost">
            <p class="error" v-if="error">{{ error }}</p>
            <div v-if="singlePost" class="single-post__data">
                <h1>Data about post #{{ postIdInput }}</h1>
                <p><span class="title">Title:</span> {{ singlePost.title }}</p>
                <p><span class="title">ID:</span> {{ singlePost.id }}</p>
                <p><span class="title">Body:</span> {{ singlePost.body }}</p>
                <p><span class="title">User ID:</span> {{ singlePost.userId }}</p>
            </div>
        </div>
    </div>
    <h1>List of posts</h1>
    <div v-for="post in posts" :key=post.id>
        <p><span class="title">Title:</span> {{ post.title }}</p>
        <p><span class="title">ID:</span> {{ post.id }}</p>
        <p><span class="title">Body:</span> {{ post.body }}</p>
        <p><span class="title">User ID:</span> {{ post.userId }}</p>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
import DotLoader from 'vue-spinner/src/DotLoader.vue'

export default {
  props: {
    msg: String
  },
  components: {
      DotLoader
  },
  data(){
      return {
          posts: [],
          singlePost: null,
          type: 'movie',
          text: '',
          noResult: null,
          error: null,
          loading: true,
          emptyInputError: null,
          postIdInput: null,
          loadingSinglePost: false
      }
  },
  mounted(){
      this.getPosts()
  },
  methods: {
      getPosts(){
          axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
              console.log('response', response)
              this.posts = response.data
              })
              .catch(error => {
                  console.log('error', error)
                  this.error = error
              })
      },
      searchPost(){
          this.loadingSinglePost = true;
          axios.get(`https://jsonplaceholder.typicode.com/posts/${this.postIdInput}`)
          .then(response => {
              console.log('response post', response)
              this.singlePost = response.data;
              this.error = null;
              this.loadingSinglePost = false;
              })
              .catch(error => {
                  console.log('error', error)
                  this.error = error;
                  this.singlePost = null;
                  this.loadingSinglePost = false;
              })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title {
    font-weight: 600;
}


.error {
    color: red;
    font-size: 12px;
}

.single-post {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__input-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
        width: 100%;
        max-width: 200px;
    }

    &__button {
        width: 100%;
        max-width: 200px;
        margin: 0 auto 15px auto;
        background-color: cornflowerblue;
        color: cornsilk;
        cursor: pointer;
        border: none;
        outline: none;
        padding: 10px;
    }

    &__data {
        padding: 10px;
        background-color: aliceblue;
        margin-bottom: 15px;
    }
}
</style>
