<template>
    <div class="sort-options">
      <label>Sort by:</label>
      <button 
      class="btn" 
      :class="{ active: selectedSortOption === 'likes' }" 
      @click="updateSortOption('likes')"
    >
      Likes
    </button>
    <button 
      class="btn" 
      :class="{ active: selectedSortOption === 'hates' }" 
      @click="updateSortOption('hates')"
    >
      Hates
    </button>
    <button 
      class="btn" 
      :class="{ active: selectedSortOption === 'date' }" 
      @click="updateSortOption('date')"
    >
      Date
    </button>
    </div>
</template>
  
  <script>
  export default {
    props: ['setSortOption'],
  data() {
    return {
      selectedSortOption: 'likes' // Default sort option
    };
  },
  methods: {
    updateSortOption(option) {
      this.selectedSortOption = option;
      this.setSortOption(option);
    }
  }
  }
  </script>
  
  <style scoped>
  
  .sort-options {
    margin-bottom: 1rem;
  }
  </style>