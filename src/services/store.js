import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    user: null, // Store user details
    token: null // Store the Bearer token
  },
  mutations: {
    LOGIN(state, { user, token }) {
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    }
  },
  actions: {
    logIn({ commit }, { email, password }) {
        return fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Login failed');
            }
            return response.json();
          })
          .then((data) => {
            const token = data.access_token; // Extract the Bearer token
            const user = data.user;  // Extract user details
      
            // Save token and user data in state
            commit('LOGIN', { user, token });
      
            // Optionally, save token to localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
      
            return data;
          })
          .catch((error) => {
            throw error;
          });
      },
    logOut({ commit }) {
      // Clear token and state
      commit('LOGOUT');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    checkAuthState({ commit }) {
      // Check localStorage for an existing token
      const token = localStorage.getItem('authToken');
      const user =  JSON.parse(localStorage.getItem('user'));
      
      if (token) {
        // Simulate fetching user data with the token
         // Replace with API call if needed
        commit('LOGIN', { user, token });
      }
    }
  }
});
