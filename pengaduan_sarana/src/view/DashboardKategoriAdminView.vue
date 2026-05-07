<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import router from "@/router/index";
import Sidebar from "@/components/controller-adminPanel/sidebar.vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const KategoriData = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(5);

const AdminInfo = { username: "" };

//Get admin info
async function getAdminInfo() {
  try {
    const res = await axios.get("/api/user/getAdmin", {
      headers: {
        Authorization: localStorage.getItem("admin_token") || "",
      },
    });
    AdminInfo.username = res.data.username;
  } catch (error) {
    console.log("Error to fetch data", error);
  }
}

//Get Kategori data
async function getKategoriData() {
  try {
    const res = await axios.get("/api/kategori", {
      headers: {
        Authorization: localStorage.getItem("admin_token") || "",
      },
    });
    KategoriData.value = res.data;
    //console.log(KategoriData.value);
  } catch (error) {
    console.log("Error to fetch data", error);
  }
}

onMounted(() => {
  getAdminInfo();
  getKategoriData();
});

async function deleteKategori(params) {
  try {
    const confirm = window.confirm("Kamu yakin ingin menghapus Kategori ini?.");
    if (confirm) {
      await axios.delete(`/api/kategori/delete/${params}`, {
        headers: {
          Authorization: localStorage.getItem("admin_token") || "",
        },
      });
      getKategoriData();
      toast.success("Kategori Berhasil Dihapus!.");
    }
  } catch (error) {
    toast.error("Gagal mengapus kategori");
  }
}

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return KategoriData.value.slice(start, end);
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
      <h4 class="truncate">{{ AdminInfo.username }}</h4>
    </span>
  </div>
  <div
    class="md:ml-64 mt-28 md:mt-16 flex flex-col md:flex-row md:justify-end items-center px-6 py-4"
  >
    <router-link
      to="/admin/add/kategori"
      class="bg-green-500 w-full md:w-auto rounded-lg px-4 py-3 HelveticaBold text-white text-center"
    >
      Tambah Kategori
    </router-link>
  </div>
  <div class="md:ml-64">
    <div class="relative flex flex-col w-full h-full overflow-x-auto">
      <table class="w-full my-6">
        <thead class="bg-black text-white text-left text-[14px] HelveticaBold">
          <tr>
            <th class="font-normal px-6 py-2">Jenis Kategori</th>
            <th class="font-normal px-6">Action</th>
          </tr>
        </thead>
        <tbody class="HelveticaRegular">
          <tr
            v-for="Kategori in paginatedPosts"
            class="w-full-screen text-[14px] even:bg-gray-200"
          >
            <td scope="col" class="px-6 py-5 font-normal">
              {{ Kategori.ket_kategori }}
            </td>
            <td scope="col" class="flex flex-col gap-3 px-6 py-5 font-normal">
              <router-link
                :to="`/admin/update/kategori/${Kategori.id_kategori}`"
                class="w-[80px] text-center"
                >✏️Edit</router-link
              >
              <button
                @click="deleteKategori(Kategori.id_kategori)"
                class="w-[80px] cursor-pointer text-center"
              >
                ⛔Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="paginatedPosts.length === 0"
      class="flex justify-center items-center HelveticaBold"
    >
      <span class="bg-green-500 p-2 text-white rounded">
        Tidak ada Kategori yang Ditemukan📝
      </span>
    </div>
    <div class="flex justify-center px-4 py-4 md:py-6 pb-20 md:pb-0">
      <VueAwesomePaginate
        v-if="KategoriData.length > itemsPerPage"
        :totalItems="KategoriData.length"
        :itemsPerPage="itemsPerPage"
        :maxPagesShown="5"
        v-model="currentPage"
        paginate-buttons-class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-300 cursor-pointer"
        active-page-class="!bg-black !text-white"
      />
    </div>
  </div>
</template>
