<template>
   <div class="form">
    
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" required />
          <button type="button" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="password_confirmation">Password Confirmation:</label>
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" v-model="password_confirmation" required />
          <button type="button" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
      </div>
      <button class="btn" type="submit">Sign Up</button>
    </form>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      name: '',
      showPassword: false
    };
  },
  methods: {
    signUp() {
      this.$emit('signUp', { email: this.email, password: this.password, password_confirmation: this.password_confirmation , name: this.name });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; 
    }
  }
};
</script>

<style scoped>

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: calc(100% - 40px);
}

.password-wrapper button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.password-wrapper i {
  font-size: 16px;
}


</style>