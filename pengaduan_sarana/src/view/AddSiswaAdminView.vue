<script setup>
import axios from "axios";
import { ref } from "vue";
import { router } from "@/router/index";
import Sidebar from "@/components/controller-adminPanel/sidebar.vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const field = ref({
  nis: "",
  password: "",
  nama_siswa: "",
  kelas: "",
});

async function AddSiswa() {
  if (
    field.value.nis === "" ||
    field.value.password === "" ||
    field.value.nama_siswa === "" ||
    field.value.kelas === ""
  ) {
    toast.error("Please fill in all fields before submitting.");
    return;
  }
  try {
    await axios.post("/api/authsiswa/register", field.value);
    toast.success("Siswa baru Ditambahkan!");
    router.push("/admin/kelola/siswa");
  } catch (error) {
    toast.error("Pastikan semua data terisi! & jangan duplikat");
  }
}
</script>

<template>
  <Sidebar />
  <section
    class="flex justify-center items-center mt-24 sm:mt-24 xl:mt-0 md:ml-50 px-6 py-10"
  >
    <main class="flex justify-center items-center w-full xl:gap-10">
      <form class="w-full md:w-auto" @submit.prevent="AddSiswa">
        <div
          class="flex flex-col justify-center items-center w-full md:w-[500px] gap-5"
        >
          <img
            src="/assets/login-logo.png"
            alt="logo-login-school"
            loading="lazy"
            class="w-[100px]"
          />
          <h1 class="text-[24px] md:text-[31px] HelveticaMedium">
            Tambahkan Siswa Baru!
          </h1>
          <input
            type="text"
            placeholder="nis"
            required
            class="bg-[#D9D9D9] w-full md:w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"
            v-model.trim="field.nis"
          />
          <input
            type="password"
            placeholder="password"
            required
            class="bg-[#D9D9D9] w-full md:w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"
            v-model.trim="field.password"
          />
          <input
            type="text"
            placeholder="nama siswa"
            required
            class="bg-[#D9D9D9] w-full md:w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"
            v-model.trim="field.nama_siswa"
          />
          <input
            type="text"
            placeholder="kelas"
            required
            class="bg-[#D9D9D9] w-full md:w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"
            v-model.trim="field.kelas"
          />
          <button
            type="submit"
            class="bg-black w-full md:w-[400px] h-[50px] rounded text-white HelveticaBold mb-5 cursor-pointer"
          >
            Tambah Siswa
          </button>
        </div>
      </form>
      <img
        src="/assets/school-login-siswa.png"
        alt="image about school life"
        loading="lazy"
        class="hidden xl:block w-[400px] xl:w-[480px] h-full object-cover rounded-[50px]"
      />
    </main>
  </section>
</template>
