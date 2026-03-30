<script setup>
import axios from 'axios';
import { computed,onMounted,ref } from 'vue';
import router from '../../router/index';
import Sidebar from './sidebar.vue';
import { useToast } from 'vue-toast-notification';
import searchfield from '../FilterControl/searchfield.vue';

const toast = useToast();
const searchFilter = ref('');
const SiswaData = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(10);

const AdminInfo = {username:''};

//Get admin info
async function getAdminInfo() {
    try {
        const res = await axios.get('/api/user/getAdmin',{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            }
        });
        AdminInfo.username = res.data.username;
    } catch (error) {
        console.log('Error to fetch data',err);
    }
}

//Get Siswa data
async function getSiswaData() {
    try {
        const res = await axios.get('/api/siswa',{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            }
        });
        SiswaData.value = res.data;
        //console.log(SiswaData.value);
    } catch (error) {
        console.log('Error to fetch data',err);
    }
}

onMounted(()=>{
    getAdminInfo();
    getSiswaData();
});

async function deleteSiswa(params){
    try {
        const confirm = window.confirm('Kamu yakin ingin menghapus Siswa ini?.');
        if(confirm){
            await axios.delete(`/api/siswa/delete/${params}`,{
                headers:{
                    'Authorization':localStorage.getItem('admin_token') || ''
                }
            });
            getSiswaData();
            toast.success('Siswa Berhasil Dihapus!.');
        }
    } catch (error) {
        toast.error('Gagal menghapus siswa');  
    }
}

const FilteredData = computed(() => {
    let Aspirasi = SiswaData.value;

    if(searchFilter.value !== ''){
        return Aspirasi.filter(data =>
            data.nis.includes(searchFilter.value) ||
            data.nama_siswa.includes(searchFilter.value)
        )
    }
    return Aspirasi;
});

const handleSearch = (search) => {
    searchFilter.value = search;
};

const paginatedPosts = computed(() =>{
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return FilteredData.value.slice(start,end);
});
</script>

<template>
    <Sidebar/>
    <div class="fixed top-0 right-0 z-40">
            <span class="flex gap-2 px-8 py-6 HelveticaMedium">
                <img src="/assets/icon/user.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <h4>{{ AdminInfo.username }}</h4>
            </span>
    </div>
     <div class="sm:ml-64 sm:mt-12 flex justify-between items-center">
        <searchfield @search="handleSearch"/>
        <router-link to="/admin/add/siswa" class="px-8 py-6 HelveticaBold">
            <span class="bg-green-500 p-3 text-white rounded-lg">
                Tambah Siswa
            </span>
        </router-link>
    </div>
    <div class="sm:ml-64">
            <div class="relative flex flex-col w-full h-full overflow-hidden">
                <table class="w-full mr-6 my-6">
                    <thead class="bg-black text-white text-left text-[14px] HelveticaBold">
                        <tr>
                            <th class="font-normal px-6 py-2">NIS</th>
                            <th class="font-normal px-6">Nama Siswa</th>
                            <th class="font-normal px-6">Kelas</th>
                            <th class="font-normal px-12">Action</th>
                        </tr>
                    </thead>
                    <tbody class="HelveticaRegular">
                        <tr v-for="siswa in paginatedPosts" class="w-full-screen text-[14px] even:bg-gray-200">
                            <td scope="col" class="px-6 py-5 font-normal">{{ siswa.nis }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ siswa.nama_siswa }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ siswa.kelas }}</td>
                            <td scope="col" class="flex flex-col gap-3 px-6 py-5 font-normal">
                                <router-link :to="`/admin/edit/siswa/${siswa.nis}`" class="w-[80px] text-center">✏️Edit</router-link>
                                <button @click="deleteSiswa(siswa.nis)" class="w-[80px] cursor-pointer text-center">⛔Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="paginatedPosts.length === 0" class="flex justify-center items-center HelveticaBold">
                    <span class="bg-green-500 p-2 text-white rounded">
                        Tidak ada Siswa yang Ditemukan😬
                    </span>
                </div>
            </div>
            <div class="flex justify-end px-4 pb-2">
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