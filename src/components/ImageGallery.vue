<script setup>
  // import {images, fetchImages} from '../lib/useApi'
  import { useImagesStore } from '../stores/images';
  import * as Ably from 'ably'
  import { onMounted } from 'vue'
  const client = new Ably.Realtime(import.meta.env.VITE_ABLY_API)
  const channel = client.channels.get('carousel')
  const apiUrl = import.meta.env.VITE_DIRECTUS_ASSETS
  const imagesStore = useImagesStore()

  // when an ably message is received, all active classes are switched to inactive. only the image containing the same id as the ably message data will change the class to active once more, thus being displayed
  const fetchMessage = () => {
    channel.subscribe(function(message) {
      const classToggle = () => {
        document.querySelectorAll('.active').forEach(el => {
          el.classList.replace('active', 'inactive')
        })
          document.querySelector(`#${message.data}`).classList.replace('inactive','active')
      }
      classToggle()
    })
  }
  onMounted(() => {
    // the images array is loaded to the page using the imported function
    imagesStore.fetchImages()
    fetchMessage()
  })

</script>

<template>
<!--using a for loop, create an image element with all of the images sent to the array from the axios fetch call-->
  <img v-for="img in imagesStore.images" :key="img"
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