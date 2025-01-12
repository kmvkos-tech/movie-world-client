<template>
  <div class="movie-card">
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.description }}</p>
    <p><strong>Posted:</strong> {{ movie.publication_date }}</p>
    <p><strong>Likes:</strong> {{ localMovie.likes_count }} | <strong>Hates:</strong> {{ localMovie.hates_count }}</p>

    <p>
      <strong>Posted by:</strong>
      <span v-if="movie.is_creator">
                <a href="#" @click.prevent="fetchUserMovies(movie.user.id)">You</a>
            </span>
      <span v-else>
                <a href="#" @click.prevent="fetchUserMovies(movie.user.id)" :title="movie.user.email">{{ movie.user.name }}</a>
            </span>
    </p>
    <div v-if="isLoggedIn && !movie.is_creator">
      <VoteButton
          :movieId="movie.id"
          :voted="localMovie.voted"
          :initialLikes="localMovie.likes_count"
          :initialDislikes="localMovie.hates_count"
          @update-likes="updateLikes"
          @update-dislikes="updateDislikes"
          @update-vote="updateVote"
      />

    </div>
  </div>
</template>

<script>
import VoteButton from './VoteButton.vue';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    },

    isLoggedIn: {
      type: Boolean,
      required: true
    },
    fetchUserMovies: {
      type: Function,
      required: true
    }
  },
data() {
  return {
    localMovie: { ...this.movie },
    voted: null
  };
},
  components: {
    VoteButton
  },
  methods: {
    updateLikes(newLikes) {
      this.localMovie.likes_count = newLikes;
    },
    updateDislikes(newDislikes) {
      this.localMovie.hates_count = newDislikes;
    },
    updateVote(type) {
    
      this.localMovie.voted = type; 
      
    }
    
  }

};
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.movie-card h2 {
  margin: 0 0 10px;
}

.movie-card p {
  margin: 12px 0;
}
</style>