<template>
  <div id="app" class="movie-world">
    <header>
      <h1>Movie World</h1>
      <div v-if="isLoggedIn">
        <p>Welcome Back <strong>{{ user.name }}</strong></p>
        <span class="btn" @click="handlelogOut">Log Out</span>
        <span class="btn" @click="showCreateMovieModal">Create New Movie</span>

      </div>
      <div v-else>
        <span class="btn" @click="showLoginModal">Log in</span> or
          <span class="btn" @click="showSignUpModal">Sign Up</span>
      </div>
    </header>
    <main class="main-content">
      <FlashMessage class="flash-message-overlay" v-if="flashMessage" :message="flashMessage" :type="flashMessageType" />
      <p>Found {{ sortedMovies.length }} movies</p>
      <SortOptions :setSortOption="setSortOption" />
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="movie-list">
        <MovieCard 
          v-for="movie in sortedMovies" 
          :key="movie.id" 
          :movie="movie" 
          :fetchUserMovies="fetchUserMovies"
          :isLoggedIn="isLoggedIn"
        />
      </div>
    </main>
    <CustomModal v-if="showLogin" @close="showLogin = false">
      <LoginForm @login="handleLogin" />
    </CustomModal>
    <CustomModal v-if="showSignUp" @close="showSignUp = false">
      <SignUpForm @signUp="handleSignUp" />
    </CustomModal>
    <CustomModal v-if="showCreateMovie" @close="showCreateMovie = false">
      <CreateMovieForm @createMovie="handleCreateMovie" />
    </CustomModal>
  </div>
</template>

<script>
import { fetchMoviesApi, fetchUserMoviesApi, createMovieApi, signupApi } from './services/api';
import MovieCard from './components/MovieCard.vue';
import SortOptions from './components/SortOptions.vue';
import CustomModal from './components/CustomModal.vue';
import LoginForm from './pages/LoginForm.vue';
import SignUpForm from './pages/SignUpForm.vue';
import CreateMovieForm from './pages/CreateMovieForm.vue';
import FlashMessage from './components/FlashMessage.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    MovieCard,
    SortOptions,
    CustomModal,
    LoginForm,
    SignUpForm,
    CreateMovieForm,
    FlashMessage
  },
  data() {
    return {
      sortOption: 'likes', // Default sort option
      movies: [], // Initialize movies as an empty array
      loading: false, // Initialize loading state
      error: null, // Initialize error state
      showLogin: false, // Control login modal visibility
      showSignUp: false, // Control sign-up modal visibility
      showCreateMovie: false,
      flashMessage: '', // Flash message content
      flashMessageType: 'success' // Flash message type

    };
  },
  computed: {
    ...mapState(['isLoggedIn', 'user']),
    sortedMovies() {
      // Dynamically sort the movies based on the selected option
      if (this.sortOption === 'likes') {
        return [...this.movies].sort((a, b) => b.likes_count - a.likes_count);
      } else if (this.sortOption === 'hates') {
        return [...this.movies].sort((a, b) => b.hates_count - a.hates_count);
      } else if (this.sortOption === 'date') {
        return [...this.movies].sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
      }
      return this.movies;
    },
  },
  methods: {
    ...mapActions(['logIn', 'logOut', 'checkAuthState']),
    showLoginModal() {
      this.showLogin = true;
    },
    showSignUpModal() {
      this.showSignUp = true;
    },
    showCreateMovieModal() {
      this.showCreateMovie = true;
    },
    async handleLogin({ email, password }) {
      try {
        await this.logIn({ email, password });
        this.showLogin = false;
        this.setFlashMessage('Logged in successfully', 'success');
        this.fetchMovies();
      } catch (err) {
        console.error('Login failed:', err);
        this.setFlashMessage((err.response?.data?.message || err.message), 'error');
      }
    },
    async handleSignUp(userData)
    {
      try {
        await signupApi(userData);
        this.showSignUp = false;
        this.setFlashMessage('You have successfully registered!', 'success');
      } catch (err) {
        console.error('Registration failed:', err);
        this.setFlashMessage((err.response?.data?.message || err.message), 'error');
      }
    },
    handlelogOut() {
      this.logOut();
      this.setFlashMessage('Logged out successfully', 'success');
      this.fetchMovies();
    },
    setSortOption(option) {
      this.sortOption = option;
    },
    async fetchMovies() {
      this.loading = true; // Set loading to true before the API call
      this.error = null; // Reset error state
      try {
        this.movies = await fetchMoviesApi();
      } catch (err) {
        this.setFlashMessage((err.response?.data?.message || err.message), 'error');
        console.error('Error fetching movies:', err);
      } finally {
        this.loading = false; // Set loading to false after the API call
      }
    },
    async fetchUserMovies(userId) {
      this.loading = true; // Set loading to true before the API call
      this.error = null; // Reset error state
      try {
        this.movies = await fetchUserMoviesApi(userId);
      } catch (err) {
        this.setFlashMessage((err.response?.data?.message || err.message), 'error');
        console.error('Error fetching user movies:', err);
      } finally {
        this.loading = false; // Set loading to false after the API call
      }
    },
    async handleCreateMovie(movieData) {
      try {
        await createMovieApi(movieData);
        alert("Movie created successfully");
        this.showCreateMovie = false;
        this.fetchMovies();
      } catch (err) {
        this.setFlashMessage((err.response?.data?.message || err.message), 'error');
      }
    },

    setFlashMessage(message, type) {
      this.flashMessage = message;
      this.flashMessageType = type;
       setTimeout(() => {
         this.flashMessage = '';
       }, 5000); // Clear the message after 5 seconds
    }
  },
  mounted() {
    this.checkAuthState(); 
    this.fetchMovies(); // Fetch movies when the component is mounted
  }
};
</script>
