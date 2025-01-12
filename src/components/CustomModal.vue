<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <button class="close-button" @click="close">X</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomModal',
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
