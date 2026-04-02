<script setup>
import axios from 'axios';
import { ref,onMounted} from 'vue';
import router from '../../router';
import sidebar from '../sidebar.vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const route = useRoute();
const IDaspirasi = route.params.id_aspirasi;

const KategoriList = ref({});
const AspirasiData = ref({
    nis:'',
    id_kategori:'',
    lokasi:'',
    isi_aspirasi:'',
});

onMounted(() => {
    GetKategoriList();
    GetAspirasiByID();
});

async function GetAspirasiByID(params) {
    try {
        const res = await axios.get(`/api/aspirasi/${IDaspirasi}`,{
            headers:{
            'Authorization':localStorage.getItem('Authorization') || ''
            },  
        });
        AspirasiData.value = {
            nis:res.data.nis,
            id_kategori:res.data.id_kategori,
            lokasi:res.data.lokasi,
            isi_aspirasi:res.data.isi_aspirasi
        };
        //console.log(AspirasiData.value);
    } catch (error) {
        console.error('Error fetching siswa data:', error);
    }
}

async function GetKategoriList() {
    try {
        const res = await axios.get('/api/kategori',{
        headers:{
            'Authorization':localStorage.getItem('Authorization') || ''
        },  
        });
        KategoriList.value = res.data;
    } catch (error) {
      console.error('Error fetching siswa data:', error);
    }
}

async function EditData() {
    if(AspirasiData.value.nis === null || AspirasiData.value.id_kategori === null || AspirasiData.value.lokasi === null || AspirasiData.value.isi_aspirasi === null){
        toast.error('Tolong isi semua data yang diperlukan');
        return;
    }
    try {
        await axios.put(`/api/aspirasi/siswa/update/${IDaspirasi}`,AspirasiData.value,{
            headers:{
                'Authorization':localStorage.getItem('Authorization') || ''
            }
        });
        toast.success('Aspirasi berhasil diperbarui');
        router.push('/history/aspirasi');
    } catch (error) {
        toast.error("Gagal mengedit data,coba lagi!.");
    }
}

</script>

<template>
    <sidebar/>
    <section class="flex justify-center items-center py-10">
        <main class="flex justify-center items-center gap-20">
            <form @submit.prevent="EditData">
                <div class="flex flex-col justify-center items-center w-[500px] gap-5">
                    <img src="/assets/login-logo.png" alt="logo-login-school" loading="lazy" class="w-[100px]">
                    <h1 class="text-[31px] HelveticaMedium">Perbarui Aduan!</h1>
                    <input v-model="AspirasiData.nis" type="text" placeholder="nis" class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" disabled>
                    <select v-model="AspirasiData.id_kategori" name="kategori" class="bg-[#D9D9D9] w-[400px] h-[50px] p-2 rounded text-black HelveticaMedium mb-5">
                        <option value="" disabled>Pilih Kategori</option>
                        <option v-for="kategori in KategoriList"
                        :key="kategori.id_kategori" :value="kategori.id_kategori">
                            {{ kategori.ket_kategori }}
                        </option>
                    </select>   
                    <input type="text" placeholder="lokasi" v-model.trim="AspirasiData.lokasi" required class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                    <textarea placeholder="aspirasi" v-model.trim="AspirasiData.isi_aspirasi" required class="bg-[#D9D9D9] w-[400px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" ></textarea>
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold cursor-pointer">submit</button>
                </div>
            </form>
            <img src="/assets/school-login-siswa.png" alt="image about school life" loading="lazy" class="w-[480px] h-full object-cover rounded-[50px]">
        </main>
    </section>
</template>