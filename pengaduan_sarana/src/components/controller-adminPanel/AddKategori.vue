<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '../../router';
import sidebar from './sidebar.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const KategoriData = ref({ket_kategori:''});

async function SubmitData(){
    if(KategoriData.value.ket_kategori === null){
        toast.error('Tolong isi semua data yang diperlukan');
        return;
    }
    try {
        await axios.post('/api/kategori/add',KategoriData.value,{
        headers:{
             'Authorization':localStorage.getItem('admin_token') || ''
        }
        });
        toast.success('Kategori berhasil ditambahkan!');
        router.push('/admin/kelola/kategori');
    } catch (error) {
      toast.error('Gagal menambahkan data, coba lagi!. Pastikan semua data terisi & Jangan duplikat!.')
    }
}
</script>

<template>
    <sidebar/>
    <section class="flex justify-center items-center py-10">
        <main class="flex justify-center items-center gap-20">
            <form @submit.prevent="SubmitData">
                <div class="flex flex-col justify-center items-center w-[500px] gap-5">
                    <img src="/assets/login-logo.png" alt="logo-login-school" loading="lazy" class="w-[100px]">
                    <h1 class="text-[31px] HelveticaMedium">Tambahkan Kategori Baru!</h1>
                    <input type="text" placeholder="Kategori" v-model.trim="KategoriData.ket_kategori" required class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold cursor-pointer">submit</button>
                </div>
            </form>
            <img src="/assets/Kategori-Image.png" alt="image about school life" loading="lazy" class="w-[480px] h-[600px] object-cover rounded-[50px]">
        </main>
    </section>
</template>