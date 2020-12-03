<template>
  <div class="wrapper">
    <h3>{{ msg }}</h3>
    <div>
        <h5>Please, select item</h5>
        <div>
            <input type="radio" id="movie" value="movie" v-model="type">
            <label for="omoviene">Movie</label>
        </div>
        <div>
            <input type="radio" id="series" value="series" v-model="type">
            <label for="series">Series</label>
        </div>
        <div>
            <input type="radio" id="episode" value="episode" v-model="type">
            <label for="episode">Episode</label>
        </div>
        <p>You are looking for: {{ type }}</p>
        <div>
            <p>Title you are looking for</p>
            <input v-model="text" placeholder="What you are looking for...">
            <p class="error" v-if="emptyInputError">{{ emptyInputError }}</p>
            <p>You are looking for: {{ text }}</p>
            <button class="button" @click="search()">Search</button>
        </div>
    </div>
    <dot-loader :loading="loading"></dot-loader>
    <div v-if="!loading">
        <p class="no-result" v-if="noResult">{{ noResult }}</p>
        <p class="request-error" v-if="error">{{ error }}</p>
        <div v-if="movie">
            <p><span class="title">Title:</span> {{ movie.Title }}</p>
            <p><span class="title">Actors:</span> {{ movie.Actors }}</p>
            <p><span class="title">Awords:</span> {{ movie.Awords }}</p>
            <p><span class="title">Country:</span> {{ movie.Country }}</p>
            <p><span class="title">Director:</span> {{ movie.Director }}</p>
            <p><span class="title">Genre:</span> {{ movie.Genre }}</p>
            <p><span class="title">Language:</span> {{ movie.Language }}</p>
            <p><span class="title">Plot:</span> {{ movie.Plot }}</p>
            <p><span class="title">Poster:</span> {{ movie.Poster }}</p>
            <p><span class="title">Released:</span> {{ movie.Released }}</p>
            <p><span class="title">Runtime:</span> {{ movie.Runtime }}</p>
            <p><span class="title">Type:</span> {{ movie.Type }}</p>
            <p><span class="title">Writer:</span> {{ movie.Writer }}</p>
            <p><span class="title">Year:</span> {{ movie.Year }}</p>
            <p><span class="title">imdbID:</span> {{ movie.imdbID }}</p>
            <p><span class="title">imdbRating:</span> {{ movie.imdbRating }}</p>
            <p><span class="title">imdbVotes:</span> {{ movie.imdbVotes }}</p>
        </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
import DotLoader from 'vue-spinner/src/DotLoader.vue'

export default {
  name: 'OmdbMovies',
  props: {
    msg: String
  },
  components: {
      DotLoader
  },
  data(){
      return {
          movie: null,
          type: 'movie',
          text: '',
          noResult: null,
          error: null,
          loading: false,
          emptyInputError: null
      }
  },
  methods: {
      search(){
          const inputLength = this.text.trim().length
          if(inputLength === 0) {
              this.emptyInputError = 'Input can not be empty'
          } else {
              this.emptyInputError = null
              this.loading = true
              this.getMovies(); 
          }
      },
    //   async getMovies(){
    //       try {
    //           const response = await axios.get(`http://www.omdbapi.com/?apikey=3ffae3c2&t=${this.text}&type=${this.type}`)
    //           if(response.data.Error) {
    //               console.log('response', response)
    //               this.noResult = response.data.Error
    //               this.movie = null
    //               this.loading = false
    //           } else {
    //               this.movie = response.data
    //               this.noResult = null
    //               this.loading = false
    //               console.log('this.movie', this.movie)
    //           }
    //       } catch (error) {
    //           console.log('error', error)
    //           this.error = error
    //           this.movie = null
    //           this.loading = false
    //       } finally {
    //           this.text = ''
    //       }
    //   },
      getMovies(){
          axios.get(`http://www.omdbapi.com/?apikey=3ffae3c2&t=${this.text}&type=${this.type}`)

        // axios.get('http://www.omdbapi.com/', {
        //     params: {
        //         apikey: '3ffae3c2',
        //         t: this.text,
        //         type: this.type
        //     }
        // })
          .then(response => {
              console.log('response', response)
              if(response.data.Error) {
                  this.noResult = response.data.Error
                  this.movie = null
                  this.loading = false
                  this.error = null
              } else {
                  this.movie = response.data
                  this.noResult = null
                  this.loading = false
                  this.error = null
                  console.log('this.movie', this.movie)
              }
              })
              .catch(error => {
                  console.log('error', error)
                  this.error = error
                  this.movie = null
                  this.loading = false
              })
              this.text = ''
      }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.error {
    color: red;
    font-size: 12px;
}

.no-result {
    color: #42b983;
    font-size: 22px;
    font-weight: 600;
}

.request-error {
    color: red;
    font-size: 22px;
    font-weight: 600;
}

.title {
    font-weight: 600;
}

.button {
    width: 100%;
        max-width: 150px;
        margin: 15px auto;
        background-color: cornflowerblue;
        color: cornsilk;
        cursor: pointer;
        border: none;
        outline: none;
        padding: 10px;
}
</style>
