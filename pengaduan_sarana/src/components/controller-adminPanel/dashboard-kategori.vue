<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import router from '../../router/index';
import Sidebar from './sidebar.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const KategoriData = ref([]);

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
        console.log('Error to fetch data',error);
    }
}

//Get Kategori data
async function getKategoriData() {
    try {
        const res = await axios.get('/api/kategori',{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            }
        });
        KategoriData.value = res.data;
        //console.log(KategoriData.value);
    } catch (error) {
        console.log('Error to fetch data',error);
    }
}

onMounted(()=>{
    getAdminInfo();
    getKategoriData();
})

async function deleteKategori(params){
    try {
        const confirm = window.confirm('Kamu yakin ingin menghapus Kategori ini?.');
        if(confirm){
            await axios.delete(`/api/kategori/delete/${params}`,{
                headers:{
                    'Authorization':localStorage.getItem('admin_token') || ''
                }
            });
            getKategoriData()
            toast.success('Kategori Berhasil Dihapus!.');
        }
    } catch (error) {        
        toast.error('Gagal mengapus kategori');  
    }
}
</script>

<template>
    <Sidebar/>
    <div class="fixed top-0 right-0 z-40">
            <span class="flex gap-2 px-8 py-6 HelveticaMedium">
                <img src="/assets/icon/user.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <h4>{{ AdminInfo.username }}</h4>
            </span>
    </div>
     <div class="sm:mt-16 flex justify-end">
        <router-link to="/admin/add/kategori" class="px-8 py-6 HelveticaBold">
            <span class="bg-green-500 p-3 text-white rounded-lg">
                Tambah Kategori
            </span>
        </router-link>
    </div>
    <div class="sm:ml-64">
            <div class="relative flex flex-col w-full h-full overflow-hidden">
                <table class="w-full mr-6 my-6">
                    <thead class="bg-black text-white text-left text-[14px] HelveticaBold">
                        <tr>
                            <th class="font-normal px-6 py-2">Jenis Kategori</th>
                            <th class="font-normal px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody class="HelveticaRegular">
                        <tr v-for="Kategori in KategoriData" class="w-full-screen text-[14px] even:bg-gray-200">
                            <td scope="col" class="px-6 py-5 font-normal">{{ Kategori.ket_kategori }}</td>
                            <td scope="col" class="flex flex-col gap-3 px-6 py-5 font-normal">
                                <router-link :to="`/admin/update/kategori/${Kategori.id_kategori}`" class="w-[80px] text-center">✏️Edit</router-link>
                                <button @click="deleteKategori(Kategori.id_kategori)" class="w-[80px] cursor-pointer text-center">⛔Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="KategoriData.length === 0" class="flex justify-center items-center HelveticaBold">
                    <span class="bg-green-500 p-2 text-white rounded">
                        Tidak ada Kategori yang Ditemukan📝
                    </span>
            </div>
        </div>
</template>