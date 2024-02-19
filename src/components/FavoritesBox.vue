<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3>💛 Favorites</h3>
        <input type="text" v-model="newLink" class="form-control mb-2" placeholder="Enter a link...">
        <button @click="addLink" class="btn btn-primary mb-2">Add Link</button>
        <ul class="list-group">
          <li v-for="(link, index) in links" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            <a :href="getFullUrl(link)" target="_blank" class="text-decoration-none">{{ link }}</a>
            <button @click="removeLink(index)" class="btn btn-danger">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useFavoritesStore } from '../store/favorites'; // Adjust the import path to match your store location

export default {
  setup() {
    const favoritesStore = useFavoritesStore();
    const newLink = ref('');

    const addLink = () => {
      if (newLink.value) {
        favoritesStore.addLink(newLink.value);
        newLink.value = '';
      }
    };

    const removeLink = (index) => {
      favoritesStore.removeLink(index);
    };

    const getFullUrl = (link) => {
      // Check if the link already includes the protocol
      if (!/^https?:\/\//i.test(link)) {
        // Prepend the protocol if it's missing
        return `http://${link}`;
      }
      return link;
    };

    return {
      links: favoritesStore.links,
      newLink,
      addLink,
      removeLink,
      getFullUrl,
    };
  },
};
</script>