import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    username: "",
  }),
  actions: {
    async getAdminInfo() {
    if(this.username) return; // If username is already set, skip fetching    

      try {
        const res = await axios.get("/api/user/getAdmin", {
          headers: {
            Authorization: localStorage.getItem("admin_token") || "",
          },
        });
        this.username = res.data.username;
      } catch (error) {
        console.log("Error to fetch data", error);
      }
    },

    ClearAdminInfo() {
        this.username = "";
    }
  },
});
