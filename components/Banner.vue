<template>
  <section class="banner">
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="col-md-1">
          <div class="d-flex align-items-center justify-content-center h-100">
            <div class="icons d-flex flex-column">
              <NuxtLink class="mb-3">
                <Icon name="ic:baseline-facebook" class="pointer fs-md" />
              </NuxtLink>
              <NuxtLink class="mb-3">
                <Icon name="mdi:twitter" class="pointer fs-md" />
              </NuxtLink>
              <NuxtLink class="mb-3">
                <Icon name="lucide:instagram" class="pointer fs-md" />
              </NuxtLink>
            </div>
          </div>
        </div> -->
        <div
          class="col-md-12 img-box"
          :style="{ backgroundImage: 'url(' + banner + ')' }"
        ></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["banner"],
  setup() {},
};
</script>
<style lang="scss" scoped>
section {
  .img-box {
    position: relative;
    height: calc(100vh - 100px);
    background-position: center;
    background-size: cover;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
