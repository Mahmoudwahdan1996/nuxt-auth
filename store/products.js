import { defineStore } from "pinia";
import axios from "axios";
export const useProducts = defineStore("products", {
  state() {
    return {
      banner: "text",
    };
  },
  getters: {
    getBanner() {
      return this.state.banner;
    },
  },
  actions: {
    async initData() {
      //   this.banner = data.data[0].large_banners[0].image;
    },
  },
});
