<template>
  <div>
    <TheHeader />
    <div class="main">
      <Banner :banner="banner" />
      <About />
    </div>
  </div>
</template>

<script>
export default {
  async setup() {
    const { data } = await useAsyncData("products", () => {
      return $fetch("https://davina.elsaed.aait-d.com/public/api/general/home");
    });
    const banner = data.value.data[0].large_banners[0].image;
    return { banner };
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 100px;
  height: calc(100vh - 100px);
}
</style>
