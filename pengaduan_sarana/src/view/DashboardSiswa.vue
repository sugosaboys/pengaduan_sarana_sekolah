<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import sidebar from "@/components/sidebar.vue";
import searchfield from "@/components/FilterControl/searchfield.vue";
import FilterRadio from "@/components/FilterControl/FilterRadio.vue";
import FilterDropdown from "@/components/FilterControl/FilterDropdown.vue";
import { useformatdate } from "@/composables/useformatdate";
import AspirasiPopup from "@/components/controller-dashboardSiswa/AspirasiPopup.vue";

const { formatDate } = useformatdate();

const searchFilter = ref("");
const radioFilter = ref("");
const StatususeFilter = ref([]);
const AspirasiData = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(6);

const SiswaInfo = {
  nis: "",
  nama_siswa: "",
};
//get siswa info
async function getSiswaInfo() {
  try {
    const res = await axios.get("/api/siswa/getsiswa", {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    });
    SiswaInfo.nis = res.data.nis;
    SiswaInfo.nama_siswa = res.data.nama_siswa;
  } catch (error) {
    console.error("Error fetching siswa data:", error);
  }
}
//get data aspirasi
async function getAspirasiData() {
  try {
    const res = await axios.get("/api/aspirasi", {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    });
    AspirasiData.value = res.data;
    //console.log(AspirasiData.value);
  } catch (error) {
    console.log("Error to fetch data", error);
  }
}

onMounted(() => {
  getSiswaInfo();
  getAspirasiData();
});

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

const selectedAspirasi = ref(null);
const showPopup = ref(false);

//get data aspirasi
async function ViewAspirasiDetails(id) {
  selectedAspirasi.value = AspirasiData.value.find((a) => a.id_aspirasi === id);
  showPopup.value = true;
}
</script>

<template>
  <sidebar />
  <header
    class="fixed bottom-0 md:top-0 right-0 z-20 pointer-events-none bg-white md:bg-transparent w-full md:w-auto"
  >
    <span class="flex gap-2 px-6 md:px-8 py-4 md:py-6 HelveticaMedium">
      <img
        src="/assets/icon/user.svg"
        alt="overview icon"
        loading="lazy"
        class="w-[24px]"
      />
      <h4 class="truncate">{{ SiswaInfo.nama_siswa }}</h4>
      <h4 class="truncate">{{ SiswaInfo.nis }}</h4>
    </span>
  </header>
  <section class="md:ml-64 mt-24 md:mt-16">
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
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-auto px-6 py-6 lg:py-0"
    >
      <main
        v-for="Aspirasi in paginatedPosts"
        :key="Aspirasi.id_aspirasi"
        class="rounded-lg p-4 ring-2 ring-slate-200"
      >
        <span class="flex justify-between">
          <h3 class="HelveticaBold">{{ Aspirasi.nis }}</h3>
          <h4 class="HelveticaBold">{{ formatDate(Aspirasi.created_at) }}</h4>
        </span>
        <span class="flex justify-between items-center gap-2">
          <h4 class="HelveticaMedium truncate">{{ Aspirasi.nama_siswa }}</h4>
          <h5 class="HelveticaMedium flex">
            Status:
            <p
              :class="[
                Aspirasi.status === 'menunggu'
                  ? 'bg-yellow-100'
                  : Aspirasi.status === 'diproses'
                    ? 'bg-blue-100'
                    : Aspirasi.status === 'selesai'
                      ? 'bg-green-100'
                      : 'bg-red-100',
              ]"
            >
              {{ Aspirasi.status }}
            </p>
          </h5>
        </span>
        <span>
          <h4 class="HelveticaMedium">Kategori: {{ Aspirasi.ket_kategori }}</h4>
          <h4 class="HelveticaMedium">Lokasi: {{ Aspirasi.lokasi }}</h4>
        </span>
        <p class="HelveticaMedium truncate">
          Aspirasi: {{ Aspirasi.isi_aspirasi }}
        </p>
        <p class="HelveticaMedium truncate">
          Feedback: {{ Aspirasi.feedback || "Belum ada tanggapan" }}
        </p>
        <button
          @click="ViewAspirasiDetails(Aspirasi.id_aspirasi)"
          class="flex justify-between items-center HelveticaBold w-full py-2 cursor-pointer"
        >
          View Details
          <img
            src="/assets/icon/next.svg"
            alt="next icon"
            class="w-[20px] h-auto"
          />
        </button>
      </main>
    </div>
    <AspirasiPopup
      :Aspirasi="selectedAspirasi"
      @close="showPopup = false"
      :class="[
        'transition-all duration-300 ease-in-out',
        showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ]"
    />
    <div
      v-if="paginatedPosts.length === 0"
      class="flex justify-center items-center HelveticaBold"
    >
      <span class="bg-green-500 p-2 text-white rounded">
        Tidak ada Pengaduan Hari Ini📝
      </span>
    </div>
    <div class="flex justify-center px-4 py-4 md:py-6 pb-20 md:pb-0">
      <VueAwesomePaginate
        v-if="FilteredData.length > itemsPerPage"
        :totalItems="FilteredData.length"
        :itemsPerPage="itemsPerPage"
        :maxPagesShown="5"
        v-model="currentPage"
        paginate-buttons-class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-300 cursor-pointer"
        active-page-class="!bg-black !text-white"
      />
    </div>
  </section>
</template>
