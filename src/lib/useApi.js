// importing the axios library to be able to make fetch requests
import { get } from 'axios'
import { ref } from 'vue'
// creating an empty ref array to house the images from the project website, then exporting it to be called from a component 
export const images = ref([])

// function to fetch a list of images from the project website and then store them in the above array. The images contain data such as ID and name, to be displayed in the component
export function fetchImages () {
  get('https://cexxocs0.directus.app/items/media6player')
  .then((response) => {
        images.value.push(...response.data.data)
      })
  }