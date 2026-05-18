import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    username: "",
    isAuthenticated: false, // 👈 add this to track auth state
  }),
  actions: {
    async getAdminInfo() {
      if (this.username) return;
      try {
        const res = await axios.get("/api/user/getAdmin");
        this.username = res.data.username;
        this.isAuthenticated = true; // 👈 set true on success
      } catch (error) {
        this.isAuthenticated = false;
        console.log("Error fetching admin data", error);
      }
    },

    async checkAuth() { // 👈 new action, used by router guard
      try {
        const res = await axios.get("/api/user/getAdmin");
        this.username = res.data.username;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.isAuthenticated = false;
        return false;
      }
    },

    clearAdminInfo() {
      this.username = "";
      this.isAuthenticated = false;
    }
  },
});