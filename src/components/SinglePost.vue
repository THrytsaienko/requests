<template>
  <div class="post">
        <p><span class="title">Title:</span> {{ singlePost.title }}</p>
        <p><span class="title">ID:</span> {{ singlePost.id }}</p>
        <p><span class="title">Body:</span> {{ singlePost.body }}</p>
        <p><span class="title">User ID:</span> {{ singlePost.userId }}</p>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  props: [
      'singlePost'
  ],
  mounted(){
      console.log('singlePost', this.singlePost)
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

    &__input-block {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__button {
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

    &__data {
        padding: 10px;
        background-color: aliceblue;
        margin-bottom: 15px;
    }
}
</style>