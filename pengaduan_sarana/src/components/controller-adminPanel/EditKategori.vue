<script setup>
import axios from 'axios';
import { ref,onMounted} from 'vue';
import router from '../../router/index';
import sidebar from './sidebar.vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const route = useRoute();
const IDkategori = route.params.id_kategori;

const KategoriData = ref({
    ket_kategori:''
});

 
onMounted(async () => {
    try {
        const res = await axios.get(`/api/kategori/${IDkategori}`,{
            headers:{
            'Authorization':localStorage.getItem('admin_token') || ''
            },  
        })
        KategoriData.value = {
            ket_kategori:res.data.ket_kategori,
        };
        //console.log(KategoriData.value);
    } catch (error) {
        console.error('Error fetching kategori data:', error);
    }
});

async function EditData() {
    if(KategoriData.value.ket_kategori === null){
        toast.error('Tolong isi semua data yang diperlukan');
        return;
    }
    try {
        await axios.put(`/api/kategori/update/${IDkategori}`,KategoriData.value,{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            }
        });
        toast.success('Kategori berhasil diperbarui');
        router.push('/admin/kelola/kategori');
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
                    <h1 class="text-[31px] HelveticaMedium">Perbarui Kategori!</h1>
                    <input v-model="KategoriData.ket_kategori" type="text" placeholder="Kategori" required class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold cursor-pointer">submit</button>
                </div>
            </form>
            <img src="/assets/Kategori-Image.png" alt="image about school life" loading="lazy" class="w-[480px] h-[600px] object-cover rounded-[50px]">
        </main>
    </section>
</template>