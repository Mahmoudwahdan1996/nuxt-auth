import { defineStore } from "pinia";
import axios from "axios";

export const useAuth = defineStore("authentication", {
  state() {
    return {
      email: "",
      phone: "",
      token: "",
      userId: "",
      error: null,
      loading: false,
    };
  },
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
  },
  actions: {
    async signup(payload) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "https://davina.elsaed.aait-d.com/public/api/auth/register",
          {
            full_name: payload.fullName,
            user_name: payload.userName,
            phone: payload.phone,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.passwordConfirmation,
          }
        );
        console.log(this.phone);
      } catch (error) {
        this.error = error.response.data.msg;
        this.loading = false;
      }
    },

    async signin(payload) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "https://davina.elsaed.aait-d.com/public/api/auth/login",
          {
            email: payload.email,
            password: payload.password,
            device_type: "ios",
            device_token: "asdfghjklkjhgfdsdfghjkl",
          }
        );
        console.log(response.data.data);
        this.token = response.data.data.token;
        this.userId = response.data.data.id;
        this.email = response.data.data.email;
        this.phone = response.data.data.phone;

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("phone", response.data.data.phone);
      } catch (error) {
        this.error = error.response.data.msg;
      }
      this.loading = false;
    },

    tryLogin() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const phone = localStorage.getItem("phone");
      if ((token, userId, email, phone)) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.phone = phone;
      }
    },

    async verify(payload) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "https://davina.elsaed.aait-d.com/public/api/auth/email/verify",
          {
            email: this.email,
            verification_code: payload.verificationCode,
            phone: this.phone,
            device_type: "ios",
            device_token: "asdfghjklkjhgfdsdfghjkl",
          }
        );
        console.log(response.data.data);
        this.token = response.data.data.token;
        this.userId = response.data.data.id;
        this.email = response.data.data.email;
        this.phone = response.data.data.phone;

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("phone", response.data.data.phone);
      } catch (error) {
        this.error = error.response.data.msg;
      }

      this.loading = false;
    },

    async forgetPassword(payload) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "https://davina.elsaed.aait-d.com/public/api/auth/password/forget",
          {
            phone: payload.phone,
          }
        );

        this.phone = payload.phone;

        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.msg;
      }
      this.loading = false;
    },

    async checkResetCode(payload) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "https://davina.elsaed.aait-d.com/public/api/auth/check/code",
          {
            phone: this.phone,
            reset_code: payload.verificationCode,
          }
        );
        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.msg;
      }
      this.loading = false;
    },

    async resetPassword(payload) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "https://davina.elsaed.aait-d.com/public/api/auth/password/reset",
          {
            phone: this.phone,
            new_password: payload.password,
            new_password_confirmation: payload.confirmPassword,
          }
        );
        this.token = response.data.data.token;
        this.userId = response.data.data.id;

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userId", response.data.data.id);
      } catch (error) {
        this.error = error.response.data.msg;
      }

      this.loading = false;
    },

    async resendCode() {
      const response = await axios.post(
        "https://davina.elsaed.aait-d.com/public/api/auth/resend-code",
        {
          phone: this.phone,
          type: "reset_code",
        }
      );
      console.log(response.data);
    },
  },
});
