<script setup>
import axios from 'axios';
import { ref,onMounted} from 'vue';
import router from '../../router';
import sidebar from '../../components/controller-adminPanel/sidebar.vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const route = useRoute();
const IDaspirasi = route.params.id_aspirasi;

const KategoriList = ref({});
const AdminList = ref({});
const AspirasiData = ref({
    nis:'',
    id_kategori:'',
    id_admin:'',
    lokasi:'',
    isi_aspirasi:'',
    status:'',
    feedback:''
});

onMounted(() => {
   GetAspirasiByID();
   GetKategoriData();
   GetUserData();
});

async function GetAspirasiByID() {
    try {
        const res = await axios.get(`/api/aspirasi/${IDaspirasi}`,{
            headers:{
            'Authorization':localStorage.getItem('admin_token') || ''
            },  
        });
        AspirasiData.value = {
            nis:res.data.nis,
            id_kategori:res.data.id_kategori,
            id_admin:res.data.id_admin,
            lokasi:res.data.lokasi, 
            isi_aspirasi:res.data.isi_aspirasi,
            status:res.data.status,
            feedback:res.data.feedback
        };
        console.log(AspirasiData.value);
    } catch (error) {
        console.error('Error fetching siswa data:', error);
    }
}

async function GetKategoriData() {
    try {
        const res = await axios.get('/api/kategori',{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            },  
        });
        KategoriList.value = res.data;  
    } catch (error) {
        console.error('Error fetching siswa data:', error);
    }
}

async function GetUserData() {
    try {
        const res = await axios.get('/api/user',{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            },  
        });
        AdminList.value = res.data;
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
        axios.put(`/api/aspirasi/admin/update/${IDaspirasi}`,AspirasiData.value,{
            headers:{
                'Authorization':localStorage.getItem('admin_token') || ''
            }
        }).then(()=>{
            toast.success('Aspirasi berhasil diperbarui');
            router.push('/admin');
        }).catch(()=>{
            toast.error("Gagal mengedit data,coba lagi!.")
        })
    } catch (error) {
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
                    <h1 class="text-[31px] HelveticaMedium">Proses Aduan!</h1>
                    <div class="flex gap-2">
                        <span>
                            <h4 class="mb-2 HelveticaBold text-gray-600">nis</h4>
                            <input v-model="AspirasiData.nis" type="text" placeholder="nis" class="bg-[#D9D9D9] w-[200px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" disabled>
                        </span>
                        <span>
                            <h4 class="mb-2 HelveticaBold text-gray-600">kategori</h4>
                            <select v-model="AspirasiData.id_kategori" name="kategori" disabled class="bg-[#D9D9D9] w-[200px] h-[50px] p-2 rounded text-black HelveticaMedium mb-5">
                                <option value="" disabled>Pilih Kategori</option>
                                <option v-for="kategori in KategoriList"
                                :key="kategori.id_kategori" :value="kategori.id_kategori">
                                    {{ kategori.ket_kategori }}
                                </option>
                            </select>
                        </span>
                    </div>
                    <div class="flex gap-2">
                        <span>
                            <h4 class="mb-2 HelveticaBold text-gray-600">admin</h4>
                            <select v-model="AspirasiData.id_admin" name="admin" class="bg-[#D9D9D9] w-[200px] h-[50px] p-2 rounded text-black HelveticaMedium mb-5">
                               <option value="" disabled class="text-gray-600">Pilih Admin</option>
                               <option v-for="admin in AdminList"
                               :key="admin.id_admin" :value="admin.id_admin">
                                   {{ admin.username }}
                               </option>
                           </select>   
                        </span>
                        <span>
                            <h4 class="mb-2 HelveticaBold text-gray-600">lokasi</h4>
                            <input type="text" placeholder="lokasi" v-model.trim="AspirasiData.lokasi" disabled class="bg-[#D9D9D9] w-[200px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5">
                        </span>
                    </div>
                    <span>
                        <h4 class="mb-2 HelveticaBold text-gray-600">aspirasi</h4>
                        <textarea placeholder="aspirasi" v-model.trim="AspirasiData.isi_aspirasi" disabled class="bg-[#D9D9D9] w-[400px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"></textarea>
                    </span>
                    <span>
                        <h4 class="mb-2 HelveticaBold text-gray-600">status</h4>
                        <select v-model="AspirasiData.status" class="bg-[#D9D9D9] w-[400px] h-[50px] p-2 rounded text-black HelveticaMedium mb-5">
                            <option value="menunggu">menunggu</option>
                            <option value="diproses">diproses</option>
                            <option value="selesai">selesai</option>
                            <option value="ditolak">ditolak</option>
                        </select>
                    </span>
                    <span>
                         <h4 class="mb-2 HelveticaBold text-gray-600">feedback</h4>
                         <textarea placeholder="Isi feedback" v-model.trim="AspirasiData.feedback" required class="bg-[#D9D9D9] w-[400px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5"></textarea>
                    </span>
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold cursor-pointer">submit</button>
                </div>
            </form>
            <img src="/assets/school-login-siswa.png" alt="image about school life" loading="lazy" class="w-[480px] h-full object-cover rounded-[50px]">
        </main>
    </section>
</template>