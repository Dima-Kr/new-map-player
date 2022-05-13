import { defineStore } from 'pinia'
import { get } from 'axios'

export const useImagesStore = defineStore({
  id: "imagesBank",
  state: () => ({
    images: []
  }),
  actions: {
    fetchImages() {
      get('https://cexxocs0.directus.app/items/media6player')
      .then((response) => {
        this.images.push(...response.data.data)
      })
    }
  }
});
