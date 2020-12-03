<template>
  <div class="container">
      <div class="single-post">
          <h1>POST REQUEST</h1>
          <div class="single-post__input-block">
            <label for="title">Post title</label>
            <input type="text" id="title" value="title" v-model="titlePost">
        </div>
        <div class="single-post__input-block">
            <label for="body">Post text</label>
            <input type="text" id="body" value="body" v-model="bodyPost">
        </div>
        <button class="single-post__button" @click="sendPost()">Send post</button>
        <ring-loader class="single-post__loader" :loading="loadingPost"></ring-loader>
        <div v-if="!loadingPost">
            <div v-if="responseAfterPost" class="single-post__data">
                <SinglePost :singlePost={...responseAfterPost} />
            </div>
        </div>
      </div>
      <div class="single-post">
            <h1>PUT REQUEST</h1>
            <div>
                <div class="single-post__input-block">
                    <label for="title">Post id</label>
                    <input type="text" id="title" value="title" v-model="postIdForPut">
                </div>
            </div>
            <div class="single-post__input-block">
                <label for="title">Post title</label>
                <input type="text" id="title" value="title" v-model="titlePut">
            </div>
            <div class="single-post__input-block">
                <label for="body">Post text</label>
                <input type="text" id="body" value="body" v-model="bodyPut">
            </div>
            <button class="single-post__button" @click="sendPut()">Put changes</button>
            <ring-loader class="single-post__loader" :loading="loadingPut"></ring-loader>
            <div v-if="!loadingPut">
                <div v-if="responseAfterPut" class="single-post__data">
                    <SinglePost :singlePost={...responseAfterPut} />
                </div>
            </div>
      </div>
      <div class="single-post">
            <h1>PATCH REQUEST</h1>
            <div>
                <div class="single-post__input-block">
                    <label for="title">Post id</label>
                    <input type="text" id="title" value="title" v-model="postIdForPut">
                </div>
                <button class="single-post__button" @click="searchPost()">Search post</button>
            </div>
            <ring-loader class="single-post__loader" :loading="loadingGet"></ring-loader>
            <div v-if="!loadingGet">
                <div v-if="singlePost" class="single-post__data">
                    <h1>Data about post #{{ postIdForPut }}</h1>
                    <SinglePost :singlePost={...singlePost} />
                </div>
            </div>
            <div class="single-post__input-block">
                <label for="title">Post title</label>
                <input type="text" id="title" value="title" v-model="titlePatch">
            </div>
            <div class="single-post__input-block">
                <label for="body">Post text</label>
                <input type="text" id="body" value="body" v-model="bodyPatch">
            </div>
            <button class="single-post__button" @click="sendPatch()">Patch changes</button>
            <ring-loader class="single-post__loader" :loading="loadingPatch"></ring-loader>
            <div v-if="!loadingPatch">
                <div v-if="responseAfterPatch" class="single-post__data">
                    <SinglePost :singlePost={...responseAfterPatch} />
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import SinglePost from '@/components/SinglePost.vue'
const axios = require('axios')

export default {
  name: 'JSONPlaceholderPost',
  components: {
      SinglePost,
      RingLoader
  },
  data(){
      return {
          titlePost: '',
          bodyPost: '',
          userId: 1,
          responseAfterPost: null,
          responseAfterPut: null,
          responseAfterPatch: null,
          postIdForPut: null,
          titlePut: '',
          bodyPut: '',
          singlePost: null,
          titlePatch: '',
          bodyPatch: '',
          loadingPost: false,
          loadingPut: false,
          loadingGet: false,
          loadingPatch: false,
      }
  },
  methods: {
      searchPost(){
          this.loadingGet = true;
          axios.get(`https://jsonplaceholder.typicode.com/posts/${this.postIdForPut}`)
            .then(response => {
                console.log('response', response);
                this.singlePost = response.data;
                this.loadingGet = false;
                })
                .catch(error => {
                    console.log('error', error)
                    this.singlePost = null;
                    this.loadingGet = false;
                })
      },
      sendPost(){
          this.loadingPost = true;
          axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: this.titlePost,
                body: this.bodyPost,
                userId: this.userId
            })
            .then(response => {
                console.log('response', response);
                this.responseAfterPost = response.data;
                this.loadingPost = false;
            })
            .catch(error => {
                console.log(error);
                this.responseAfterPost = null;
                this.loadingPost = false;
            });
      },
      sendPut(){
          this.loadingPut = true;
          axios.put(`https://jsonplaceholder.typicode.com/posts/${this.postIdForPut}`, {
                id: +this.postIdForPut,
                title: this.titlePut,
                body: this.bodyPut,
                userId: this.userId
            })
            .then(response => {
                console.log(response);
                this.responseAfterPut = response.data;
                this.loadingPut = false;
            })
            .catch(error => {
                console.log(error);
                this.responseAfterPut = null;
                this.loadingPut = false;
            });
      },
      sendPatch(){
          this.loadingPatch = true;
          let bodyToSend;
          if(this.titlePatch){
              bodyToSend = {
                  title: this.titlePatch
              }
          } else {
              bodyToSend = {
                  body: this.bodyPatch
              }
          }
          axios.patch(`https://jsonplaceholder.typicode.com/posts/${this.postIdForPut}`, bodyToSend)
            .then(response => {
                console.log(response);
                this.responseAfterPatch = response.data;
                this.loadingPatch = false;
            })
            .catch(error => {
                console.log(error);
                this.responseAfterPatch = null;
                this.loadingPatch = false;
            });
      }
  }
}
</script>

<style scoped lang="scss">
.title {
    font-weight: 600;
}
.single-post {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__loader {
        display: flex;
        justify-content: center;
        margin: 45px auto 60px auto;
    }

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