<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import router from '../../router';
import sidebar from '../sidebar.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const KategoriList = ref([]);
const AspirasiData = ref({
    nis:'',
    id_kategori:'',
    lokasi:'',
    isi_aspirasi:'',
});

//get nis info
async function GetSiswaNIS() {
    try {
        const res = await axios.get('/api/siswa/getsiswa',{
        headers:{
            'Authorization':localStorage.getItem('Authorization') || ''
            }  
        });
        AspirasiData.value.nis = res.data.nis;
    } catch (error) {
        console.error('Error fetching siswa data:', err);
    }
}

//get kategori info
async function GetKategoriList() {
    try {
        const res = await axios.get('/api/kategori',{
        headers:{
            'Authorization':localStorage.getItem('Authorization') || ''
        },  
        });
        KategoriList.value = res.data;
    } catch (error) {
        console.error('Error fetching kategori data:', error);
    }
}

onMounted(()=>{
    GetSiswaNIS();
    GetKategoriList();
})

async function submitData(){
    if(AspirasiData.value.nis === null ||  AspirasiData.value.id_kategori === null || AspirasiData.value.lokasi === null || AspirasiData.value.isi_aspirasi === null){
        toast.error('Tolong isi semua data yang diperlukan');
        return;
    }   
    try {
        await axios.post('/api/aspirasi/siswa/add',AspirasiData.value,{
            headers:{
            'Authorization':localStorage.getItem('Authorization') || ''
            }, 
        });
        router.push('/');
        toast.success('Aduan berhasil diajukan!');
    } catch (error) {
        toast.error('Gagal menambahkan data, coba lagi!. Pastikan semua data terisi!.')
    }
};
</script>

<template>
    <sidebar/>
    <section class="flex justify-center items-center py-10">
        <main class="flex justify-center items-center gap-20">
            <form @submit.prevent="submitData">
                <div class="flex flex-col justify-center items-center w-[500px] gap-5">
                    <img src="/assets/login-logo.png" alt="logo-login-school" loading="lazy" class="w-[100px]">
                    <h1 class="text-[31px] HelveticaMedium">Ajukan Aduan Kalian!</h1>
                    <input type="text" placeholder="nis" v-model.trim="AspirasiData.nis" class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" disabled>
                    <select v-model.trim="AspirasiData.id_kategori" name="kategori" class="bg-[#D9D9D9] w-[400px] h-[50px] p-2 rounded text-black HelveticaMedium mb-5">
                        <option value="" disabled>Pilih Kategori</option>
                        <option v-for="kategori in KategoriList" 
                        :key="kategori.id_kategori" :value="kategori.id_kategori">
                            {{ kategori.ket_kategori }}
                        </option>
                    </select>   
                    <input type="text" placeholder="lokasi" v-model.trim="AspirasiData.lokasi" required class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                    <textarea placeholder="aspirasi" v-model.trim="AspirasiData.isi_aspirasi" required class="bg-[#D9D9D9] w-[400px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"></textarea>
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold cursor-pointer">submit</button>
                </div>
            </form>
            <img src="/assets/school-login-siswa.png" alt="image about school life" loading="lazy" class="w-[480px] h-full object-cover rounded-[50px]">
        </main>
    </section>
</template>