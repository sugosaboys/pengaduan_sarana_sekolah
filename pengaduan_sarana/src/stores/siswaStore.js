import { defineStore } from "pinia";
import axios from "axios";

export const useSiswaStore = defineStore("siswa", {
  state: () => ({
    nis: "",
    nama_siswa: "",
  }),
  actions: {
    async getSiswaInfo() {
      if(this.nis) return; // If nis is already set, skip fetching    
      try {
        const res = await axios.get("/api/siswa/getsiswa", {
          headers: {
            Authorization: localStorage.getItem("Authorization") || "",
          },
        });
        this.nis = res.data.nis;
        this.nama_siswa = res.data.nama_siswa;
      } catch (error) {
        console.error("Error fetching siswa data:", error);
      }
    },

    ClearSiswaInfo() {
        this.nis = "";
        this.nama_siswa = "";
    }
  },
});
