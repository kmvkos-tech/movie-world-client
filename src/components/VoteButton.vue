<!-- src/components/VoteButton.vue -->
<template>
  <div class="vote-buttons">
    <span class="btn" @click="vote('like')"  :class="{ active: voted === 'like' }">Like </span> |
    <span class="btn" @click="vote('hate')" :class="{ active: voted === 'hate' }">Dislike</span>
  </div>
</template>

<script>

import {voteMovieApi} from '@/services/api';

export default {
  name: 'VoteButton',
  props: {
    movieId: {
      type: Number,
      required: true
    },
    initialLikes: {
      type: Number,
      required: true
    },
    initialDislikes: {
      type: Number,
      required: true
    },
    voted: {
      type: [String, null], // Allow String or null
      default: null // 'like', 'hate', or null
    }
  },
  data() {
    return {
      likes: this.initialLikes,
      dislikes: this.initialDislikes
    };
  },
  methods: {
    async vote(vote_type) {
      try {
        const result = await voteMovieApi(this.movieId, vote_type);
        if (result.allowed) {

            this.$emit('update-likes', result.movie.likes_count);
            this.$emit('update-dislikes', result.movie.hates_count);
            if (result.message == 'Vote retracted successfully.') {
            this.$emit('update-vote', null);
          } else {
            this.$emit('update-vote', vote_type);
          }

        }
         else {
          alert('You are not allowed to vote.');
        }
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  }
};
</script>

