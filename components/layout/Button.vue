<template>
  <button
    class="primary-btn mt-sm mb-sm ps-2xl pe-2xl pt-e6 pb-e6 rounded-pill text-uppercase max-sm"
  >
    <slot />
  </button>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.primary-btn {
  background-color: $primary;
  color: $info;
  outline: none;
  border: none;
  margin-left: auto;
  margin-right: auto;
}
</style>
