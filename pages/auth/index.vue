<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center log position-relative"
  >
    <div class="circle-top">
      <img src="~/public/images/auth-task/freepik--floor--inject-42.png" />
    </div>
    <div class="mb-5">
      <NuxtLink to="/auth/login" class="header-logo">
        <Logo />
      </NuxtLink>
    </div>

    <h4 class="fw-black">Welcome</h4>
    <p class="text-capitalize fs-md">
      please choose your way to get your account
    </p>
    <Button @click="login">sign in </Button>
    <p class="text-capitalize fs-md">
      don't have an account ?
      <NuxtLink to="/auth/register" class="fw-black">sign up</NuxtLink>
    </p>
    <div class="padge">
      <img src="~/public/images/auth-task/Group 17334.png" class="padge-img" />
    </div>
    <div class="circle-bottom">
      <img src="~/public/images/auth-task/freepik--floor--inject-42.png" />
    </div>
  </div>
</template>

<script>
import Button from "~/components/layout/Button.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Button,
  },

  setup() {
    definePageMeta({
      middleware: "auth-redirect",
    });
    const router = useRouter();

    function login() {
      router.push("/auth/login");
    }

    return {
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.log {
  height: 100vh;
  overflow: hidden;
  .header-logo {
    width: rem(140px);
    display: block;
    @include media-breakpoint-down(lg) {
      width: rem(80px);
    }
  }

  .circle-bottom {
    position: fixed;
    bottom: -416px;
    left: -416px;
    z-index: -1;
  }
  .circle-top {
    position: fixed;
    top: -450px;
    right: -450px;
    z-index: -1;
  }
  .padge {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    &-img {
      width: 400px;
    }
  }
}
</style>
