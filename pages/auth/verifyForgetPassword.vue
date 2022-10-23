<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center log position-relative"
  >
    <div
      class="position-absolute h-100 w-100 d-flex flex-column align-items-center justify-content-center load"
      v-if="loading"
    >
      <BaseSpinner />
    </div>
    <div class="circle-top">
      <img src="~/public/images/auth-task/freepik--floor--inject-42.png" />
    </div>
    <div class="mb-4">
      <NuxtLink to="/" class="header-logo">
        <Logo />
      </NuxtLink>
    </div>
    <h3 class="fw-black text-capitalize">? forget your password</h3>

    <p class="fs-base text-capitalize text-center mx-4 w-75">
      please enter the code that sent to your email address or mobile number
    </p>

    <form class="row max-md mt-xs" @submit.prevent="checkResetCode">
      <div class="col-2">
        <input
          type="text"
          class="form-control pt-xs pb-xs mb-sm"
          placeholder="-"
          v-model="num1"
        />
      </div>

      <div class="col-2">
        <input
          type="text"
          class="form-control pt-xs pb-xs mb-sm"
          placeholder="-"
          v-model="num2"
        />
      </div>

      <div class="col-2">
        <input
          type="text"
          class="form-control pt-xs pb-xs mb-sm"
          placeholder="-"
          v-model="num3"
        />
      </div>

      <div class="col-2">
        <input
          type="text"
          class="form-control pt-xs pb-xs mb-sm"
          placeholder="-"
          v-model="num4"
        />
      </div>

      <div class="col-2">
        <input
          type="text"
          class="form-control pt-xs pb-xs mb-sm"
          placeholder="-"
          v-model="num5"
        />
      </div>

      <div class="col-2">
        <input
          type="text"
          class="form-control pt-xs pb-xs mb-sm"
          placeholder="-"
          v-model="num6"
        />
      </div>

      <div class="col-12 text-center mt-xs">
        <div class="fs-base text-capitalize">resendding code after</div>
        <span>1:50</span>
        <div class="fs-base text-capitalize mt-xxs" @click="resendCode">
          resend code
        </div>
      </div>
      <p v-if="!loading && error" class="text-danger text-center">
        {{ error }}
      </p>

      <Button>submit</Button>
    </form>

    <div class="padge">
      <img src="~/public/images/auth-task/Login-amico.png" class="padge-img" />
    </div>
  </div>
</template>

<script>
import Button from "~/components/layout/Button.vue";
import { useAuth } from "~/store/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import BaseSpinner from "~/components/UI/BaseSpinner.vue";

export default {
  components: {
    Button,
    BaseSpinner,
  },

  setup() {
    definePageMeta({
      middleware: "auth-redirect",
    });
    const authStore = useAuth();
    const num1 = ref("");
    const num2 = ref("");
    const num3 = ref("");
    const num4 = ref("");
    const num5 = ref("");
    const num6 = ref("");
    const router = useRouter();
    const { error, loading } = storeToRefs(authStore);

    const code = computed(() => {
      return (
        num1.value +
        num2.value +
        num3.value +
        num4.value +
        num5.value +
        num6.value
      );
    });

    const payload = computed(() => {
      return {
        verificationCode: code.value,
      };
    });

    async function checkResetCode() {
      await authStore.checkResetCode(payload.value);
      if (!error.value) {
        router.push("/auth/resetPassword");
      }
    }

    async function resendCode() {
      await authStore.resendCode(payload.value);
    }

    return {
      num1,
      num2,
      num3,
      num4,
      num5,
      num6,
      checkResetCode,
      resendCode,
      error,
      loading,
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

  input {
    border: 1px solid #e8eaef;
    background-color: #f8f9fc;
    font-size: 1.2rem;
    text-align: center;

    &::placeholder {
      color: #dedede;
      text-align: center;
      font-size: 2rem;
    }
  }

  .circle-top {
    position: fixed;
    top: -550px;
    right: -450px;
    z-index: -1;
  }
  .padge {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    &-img {
      width: 300px;
    }
  }
}
</style>
