<template>
    <div v-if="message" :class="['flash-message', type]">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'success' // 'success' or 'error'
      }
    }
  };
  </script>
  
  <style scoped>
  .flash-message {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    text-align: center;
    
  }
  .flash-message.success {
    background-color: #d4edda;
    color: #155724;
    position: relative;
  }
  .flash-message.error {
    background-color: #f8d7da;
    color: #721c24;
    position: relative;
  }
  </style>