<template>
  <main>
    <NuxtPage />
  </main>
</template>

<script>
import { useProducts } from "~/store/products";
export default {
  async setup() {
    const store = useProducts();

    await store.initData();
  },
};
</script>
