import { defineStore } from "pinia";
import axios from "axios";

export const useSiswaStore = defineStore("siswa", {
  state: () => ({
    nis: "",
    nama_siswa: "",
    isAuthenticated: false, // 👈 add this
  }),
  actions: {
    async getSiswaInfo() {
      if (this.nis) return;
      try {
        const res = await axios.get("/api/siswa/getsiswa");
        this.nis = res.data.nis;
        this.nama_siswa = res.data.nama_siswa;
        this.isAuthenticated = true; // 👈 set true on success
      } catch (error) {
        this.isAuthenticated = false;
        console.error("Error fetching siswa data:", error);
      }
    },

    async checkAuth() { // 👈 new action for router guard
      try {
        const res = await axios.get("/api/siswa/getsiswa");
        this.nis = res.data.nis;
        this.nama_siswa = res.data.nama_siswa;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.isAuthenticated = false;
        return false;
      }
    },

    clearSiswaInfo() {
      this.nis = "";
      this.nama_siswa = "";
      this.isAuthenticated = false;
    }
  },
});