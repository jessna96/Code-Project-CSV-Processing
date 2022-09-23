<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
  padding: 0.75rem 1.0rem;
  font-family: inherit;
  color: white;
  cursor: pointer;
  font-size: 15px;
}
</style>