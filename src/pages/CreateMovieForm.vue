<template>
  <div class="form">
    <h2>Create New Movie</h2>
    <form @submit.prevent="createMovie">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="publication_date">Publication Date:</label>
        <input type="date" v-model="publication_date" required />
      </div>
      <button type="submit" class="btn">Create Movie</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      publication_date: ''
    };
  },
  methods: {
    createMovie() {
      this.$emit('createMovie', {
        title: this.title,
        description: this.description,
        publication_date: this.publication_date
      });
    }
  }
};
</script>

