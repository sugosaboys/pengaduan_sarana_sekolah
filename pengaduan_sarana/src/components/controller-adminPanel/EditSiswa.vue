<script setup>
import axios from 'axios';
import { ref,onMounted} from 'vue';
import router from '../../router/index';
import sidebar from './sidebar.vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const route = useRoute();
const NIS = route.params.nis;

const SiswaData = ref({
    nama_siswa:'',
    kelas:''
});

onMounted(async () => {
    try {
        const res = await axios.get(`/api/siswa/${NIS}`,{
            headers:{
            'Authorization':localStorage.getItem('admin_token') || ''
            },  
        })
        SiswaData.value = {
            nama_siswa:res.data.nama_siswa,
            kelas:res.data.kelas
        };
        //console.log(SiswaData.value);
    } catch (error) {
        console.error('Error fetching siswa data:', error);
    }
});

async function EditData() {
    if(SiswaData.value.nama_siswa === null || SiswaData.value.kelas === null){
        toast.error('Tolong isi semua data yang diperlukan');
        return;
    }
    try {
        await axios.put(`/api/siswa/update/${NIS}`,SiswaData.value,{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            }
        })
        toast.success('Siswa berhasil diperbarui');
        router.push('/admin/kelola/siswa');
    } catch (error) {
        toast.error("Gagal mengedit data,coba lagi!.")
        console.error('Error fetching data:', error);
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
                    <h1 class="text-[31px] HelveticaMedium">Perbarui Siswa!</h1>
                    <input v-model="SiswaData.nama_siswa" type="text" placeholder="Nama Siswa" required class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                    <input v-model="SiswaData.kelas" type="text" placeholder="Kelas" required class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold cursor-pointer">submit</button>
                </div>
            </form>
            <img src="/assets/Kategori-Image.png" alt="image about school life" loading="lazy" class="w-[480px] h-[600px] object-cover rounded-[50px]">
        </main>
    </section>
</template>