<script setup>
  import {images, fetchImages} from '../lib/useApi'
  import * as Ably from 'ably'
  import { onMounted } from 'vue'
  const client = new Ably.Realtime(import.meta.env.VITE_ABLY_API)
  const channel = client.channels.get('carousel')
  const apiUrl = import.meta.env.VITE_DIRECTUS_ASSETS

  // function to update active class upon receiving ably message. only one image can have an active class, thus displaying only one image each time, even though all images have been loaded to our page
  const toggleActive = () => {
    channel.subscribe(function(message) {
        document.querySelectorAll('.active').forEach(el => {
          el.classList.replace('active', 'inactive')
        })
          document.querySelector(`#${message.data}`).classList.replace('inactive','active')
    })
  }
  onMounted(() => {
    toggleActive()
    // the images array is loaded to the page
    fetchImages()
  })
</script>

<template>
<!--using a for loop, create an image element with all of the images sent to the array from the axios fetch call-->
  <img v-for="img in images" :key="img"
    :src="`${apiUrl}${img.Thumbnail}`"
    :id="`${img.Name}`"
    class="image active"
  />

</template>

<style>

  img {
    position: absolute;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }

  .active {
    z-index: 1;
  }

</style>