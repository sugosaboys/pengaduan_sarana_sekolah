<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import { useAdminStore } from '@/stores/adminStore';
import Sidebar from "@/components/controller-adminPanel/sidebar.vue";
import searchfield from "@/components/FilterControl/searchfield.vue";
import FilterRadio from "@/components/FilterControl/FilterRadio.vue";
import FilterDropdown from "@/components/FilterControl/FilterDropdown.vue";

const searchFilter = ref("");
const radioFilter = ref("");
const StatususeFilter = ref([]);
const AspirasiData = ref([]);
const toast = useToast();

const currentPage = ref(1);
const itemsPerPage = ref(5);

const adminStore = useAdminStore();

//Get Aspirasi data
async function getAspirasiData() {
  try {
    const res = await axios.get("/api/aspirasi", {
      headers: {
        Authorization: localStorage.getItem("admin_token") || "",
      },
    });
    AspirasiData.value = res.data;
    //console.log(AspirasiData.value);
  } catch (error) {
    console.log("Error to fetch data", error);
  }
}

onMounted(() => {
  adminStore.getAdminInfo();
  getAspirasiData();
});

async function deleteAspirasi(params) {
  try {
    const confirm = window.confirm("Kamu yakin ingin menghapus aspirasi ini?.");
    if (confirm) {
      await axios.delete(`/api/aspirasi/delete/${params}`, {
        headers: {
          Authorization: localStorage.getItem("admin_token") || "",
        },
      });
      getAspirasiData();
      toast.success("Aspirasi Berhasil Dihapus!.");
    }
  } catch (error) {
    toast.error("Gagal mengapus aspirasi");
  }
}

const FilteredData = computed(() => {
  let Aspirasi = AspirasiData.value;

  switch (radioFilter.value) {
    case "today":
      const today = new Date().toISOString().slice(0, 10);
      Aspirasi = Aspirasi.filter(
        (data) => data.created_at.slice(0, 10) === today,
      );
      break;
    case "past":
      const todayDate = new Date().toISOString().slice(0, 10);
      Aspirasi = Aspirasi.filter(
        (data) => data.created_at.slice(0, 10) < todayDate,
      );
      break;
  }

  if (StatususeFilter.value.length) {
    Aspirasi = Aspirasi.filter((data) =>
      StatususeFilter.value.includes(data.status),
    );
  }

  if (searchFilter.value !== "") {
    Aspirasi = Aspirasi.filter(
      (data) =>
        data.nis.includes(searchFilter.value) ||
        data.nama_siswa.includes(searchFilter.value) ||
        data.ket_kategori.includes(searchFilter.value) ||
        data.isi_aspirasi.includes(searchFilter.value) ||
        data.lokasi.includes(searchFilter.value),
    );
  }
  return Aspirasi;
});

const handleSearch = (search) => {
  searchFilter.value = search;
};

const handleRadioFilter = (filter) => {
  radioFilter.value = filter;
};

const handleCheckboxFilter = (filter) => {
  if (StatususeFilter.value.includes(filter)) {
    return StatususeFilter.value.splice(
      StatususeFilter.value.indexOf(filter, 1),
    );
  }

  StatususeFilter.value.push(filter);
};

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return FilteredData.value.slice(start, end);
});
</script>

<template>
  <Sidebar />
  <div
    class="fixed bottom-0 md:top-0 right-0 z-20 pointer-events-none bg-white md:bg-transparent w-full md:w-auto"
  >
    <span class="flex gap-2 px-6 md:px-8 py-4 md:py-6 HelveticaMedium">
      <img
        src="/assets/icon/user.svg"
        alt="overview icon"
        loading="lazy"
        class="w-[24px]"
      />
      <h4 class="truncate">{{ adminStore.username }}</h4>
    </span>
  </div>
  <div class="md:ml-64 mt-24 md:mt-16">
    <div class="flex flex-col md:flex-row md:justify-between items-center">
      <searchfield @search="handleSearch" />
      <span class="flex flex-col md:flex-row items-center gap-2">
        <FilterRadio @filter="handleRadioFilter" />
        <FilterDropdown
          :dataAspirasi="AspirasiData"
          @filter="handleCheckboxFilter"
        />
      </span>
    </div>
    <div class="relative flex flex-col w-full h-full overflow-x-auto">
      <table class="table-fixed my-6 w-full">
        <thead class="bg-black text-white text-[14px] HelveticaBold">
          <tr>
            <th class="py-2 font-normal w-20">NIS</th>
            <th class="font-normal w-40">Nama siswa</th>
            <th class="font-normal w-32">Kategori</th>
            <th class="font-normal w-32">Admin</th>
            <th class="font-normal w-32">Lokasi</th>
            <th class="font-normal w-48">Isi aspirasi</th>
            <th class="font-normal w-24">Status</th>
            <th class="font-normal w-48">Feedback</th>
            <th class="font-normal w-32">Dibuat</th>
            <th class="font-normal w-32">Diperbarui</th>
            <th class="font-normal w-32">Action</th>
          </tr>
        </thead>
        <tbody class="HelveticaRegular">
          <tr
            v-for="Aspirasi in paginatedPosts"
            class="w-full-screen text-[14px] even:bg-gray-200"
          >
            <td class="px-6 py-5 font-normal">{{ Aspirasi.nis }}</td>
            <td class="px-6 py-5 font-normal">{{ Aspirasi.nama_siswa }}</td>
            <td class="px-6 py-5 font-normal">{{ Aspirasi.ket_kategori }}</td>
            <td class="px-6 py-5 font-normal">
              {{ Aspirasi.admin_username || "Belum ditugaskan" }}
            </td>
            <td class="px-6 py-5 font-normal">{{ Aspirasi.lokasi }}</td>
            <td class="px-6 py-5 font-normal">{{ Aspirasi.isi_aspirasi }}</td>
            <td class="px-6 py-5 font-normal">{{ Aspirasi.status }}</td>
            <td class="px-6 py-5 font-normal">
              {{ Aspirasi.feedback || "Belum ada tanggapan" }}
            </td>
            <td class="px-6 py-5 font-normal">
              {{ new Date(Aspirasi.created_at).toLocaleString("id-ID") }}
            </td>
            <td class="px-6 py-5 font-normal">
              {{ new Date(Aspirasi.updated_at).toLocaleString("id-ID") }}
            </td>
            <td class="flex flex-col gap-3 px-6 py-5 font-normal">
              <router-link
                :to="`/admin/edit/aspirasi/${Aspirasi.id_aspirasi}`"
                class="w-[80px] text-center"
                >✏️Edit</router-link
              >
              <button
                @click="deleteAspirasi(Aspirasi.id_aspirasi)"
                class="w-[80px] cursor-pointer text-center"
              >
                ⛔Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="paginatedPosts.length === 0"
        class="flex justify-center items-center HelveticaBold"
      >
        <span class="bg-green-500 p-2 text-white rounded">
          Tidak ada Pengaduan Hari Ini📝
        </span>
      </div>
    </div>
    <div class="flex justify-center px-4 py-4 md:py-6 pb-20 md:pb-0">
      <VueAwesomePaginate
        :totalItems="FilteredData.length"
        :itemsPerPage="itemsPerPage"
        :maxPagesShown="5"
        v-model="currentPage"
        paginate-buttons-class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-300 cursor-pointer"
        active-page-class="!bg-black !text-white"
      />
    </div>
  </div>
</template>
