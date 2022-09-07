<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
  padding: 0.75rem 1.0rem;
  font-family: inherit;
  background-color: #099BB0;
  border: 1px solid #099BB0;
  color: white;
  cursor: pointer;
  font-size: 15px;
  margin: 1rem;
}

button:hover,
button:active {
  background-color: #0A5863;
  border-color: #0A5863;
}
</style>