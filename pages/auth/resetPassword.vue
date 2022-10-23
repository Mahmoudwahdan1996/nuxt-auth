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
    <div class="mb-5">
      <NuxtLink to="/" class="header-logo">
        <Logo />
      </NuxtLink>
    </div>

    <h3 class="fw-black text-capitalize">? forget your password</h3>

    <p class="fs-base text-capitalize">please enter your new password</p>
    <form @submit.prevent="resetPassword">
      <input
        class="form-control max-md pt-xs pb-xs mt-2xl mb-lg"
        type="password"
        placeholder="New Password"
        v-model="password"
      />

      <input
        class="form-control max-md pt-xs pb-xs mb-lg"
        type="password"
        placeholder="confirm New Password"
        v-model="confirmPassword"
      />
      <p v-if="!loading && error" class="text-danger">{{ error }}</p>

      <Button class="text-upper">submit</Button>
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
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();
    const { error, loading } = storeToRefs(authStore);

    const payload = computed(() => {
      return {
        confirmPassword: confirmPassword.value,
        password: password.value,
      };
    });

    async function resetPassword() {
      await authStore.resetPassword(payload.value);
      if (!error.value) {
        router.push("/auth/login");
      }
    }

    return {
      confirmPassword,
      password,
      resetPassword,
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
  form {
    width: 70%;
    text-align: center;
  }
  .forget {
    color: $danger;
    cursor: pointer;
  }

  input {
    border: 1px solid #e8eaef;
    margin-left: auto;
    margin-right: auto;

    &::placeholder {
      color: #949494;
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

  .google {
    background-color: #fff;
    border: 1px solid #e8eaef;
    font-size: 0.9rem;
    padding: 1rem 1.2rem;
    gap: 0.5rem;
  }

  .facebook {
    background-color: #3c5998;
    border: 1px solid #e8eaef;
    font-size: 0.9rem;
    padding: 1rem 1.2rem;
    gap: 0.5rem;
    color: #fff;
  }
}
</style>
