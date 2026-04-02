<script setup>
import axios from 'axios';
import { computed,onMounted, ref } from 'vue';
import sidebar from './sidebar.vue';
import searchfield from './FilterControl/searchfield.vue';
import FilterRadio from './FilterControl/FilterRadio.vue';
import FilterDropdown from './FilterControl/FilterDropdown.vue';

const searchFilter = ref('');
const radioFilter = ref('');
const StatususeFilter = ref([]);
const AspirasiData = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(5);

const SiswaInfo = {
    nis:'',
    nama_siswa:''
}
//get siswa info
async function getSiswaInfo() {
    try {
       const res = await axios.get('/api/siswa/getsiswa',{
            headers:{
                'Authorization':localStorage.getItem('Authorization') || ''
            },  
        })
        SiswaInfo.nis = res.data.nis;
        SiswaInfo.nama_siswa = res.data.nama_siswa;
    } catch (error) {
        console.error('Error fetching siswa data:', error);
    }
}
//get data aspirasi
async function getAspirasiData() {
    try {
        const res = await axios.get('/api/aspirasi',{
            headers:{
                'Authorization':localStorage.getItem('Authorization') || ''
            }
        })
        AspirasiData.value = res.data;
        //console.log(AspirasiData.value);
    } catch (error) {
        console.log('Error to fetch data',error);
    }
}

onMounted(()=>{
    getSiswaInfo();
    getAspirasiData();
});

const FilteredData = computed(() => {
    let Aspirasi = AspirasiData.value;

    switch (radioFilter.value){
        case 'today':
            Aspirasi = Aspirasi.filter(data => new Date(data.created_at).getDate() === new Date().getDate());
            break;
        case 'past':
             Aspirasi = Aspirasi.filter(data => { return data.created_at.slice(0,10) < new Date().toISOString().slice(0,10)});
            break;
    }

    if(StatususeFilter.value.length){
        Aspirasi = Aspirasi.filter(data => StatususeFilter.value.includes(data.status));
    }

    if(searchFilter.value !== ''){
        Aspirasi = Aspirasi.filter(data =>
            data.nis.includes(searchFilter.value) ||
            data.nama_siswa.includes(searchFilter.value)
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
    if(StatususeFilter.value.includes(filter)){
        return StatususeFilter.value.splice(StatususeFilter.value.indexOf(filter,1));
    }

    StatususeFilter.value.push(filter);
};

const paginatedPosts = computed(() =>{
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return FilteredData.value.slice(start,end);
});

</script>

<template>
        <sidebar/>
        <div class="fixed top-0 right-0 z-40">
            <span class="flex gap-2 px-8 py-6 HelveticaMedium">
                <img src="/assets/icon/user.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <h4>{{ SiswaInfo.nama_siswa }}</h4>
                    <h4>{{ SiswaInfo.nis  }}</h4>
            </span>
        </div>
        <div class="sm:ml-64 sm:mt-16">
            <div class="flex justify-between">
                <searchfield @search="handleSearch"/>
                <span class="flex gap-2">
                    <FilterRadio @filter="handleRadioFilter"/>
                    <FilterDropdown :dataAspirasi="AspirasiData" @filter="handleCheckboxFilter"/>
                </span>
            </div>
            <div class="relative flex flex-col w-full h-full overflow-x-hidden">
                <table class="w-full table-fixed mr-6 my-6">
                    <thead class="bg-black text-white text-[14px] HelveticaBold">
                        <tr>
                            <th class="font-normal py-2">NIS</th>
                            <th class="font-normal">Nama siswa</th>
                            <th class="font-normal">Kategori</th>
                            <th class="font-normal">Admin</th>
                            <th class="font-normal">Lokasi</th>
                            <th class="font-normal">Isi aspirasi</th>
                            <th class="font-normal">Status</th>
                            <th class="font-normal">Feedback</th>
                            <th class="font-normal">Dibuat</th>
                            <th class="font-normal">Diperbarui</th>
                        </tr>
                    </thead>
                    <tbody class="HelveticaRegular">
                        <tr v-for="Aspirasi in paginatedPosts" class="w-full-screen text-[14px] even:bg-gray-200">
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.nis }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.nama_siswa }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.ket_kategori }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.admin_username || 'Belum ditugaskan'}}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.lokasi }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.isi_aspirasi }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.status }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ Aspirasi.feedback || 'Belum ada tanggapan'}}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ new Date(Aspirasi.created_at).toLocaleString('id-ID') }}</td>
                            <td scope="col" class="px-6 py-5 font-normal">{{ new Date (Aspirasi.updated_at).toLocaleString('id-ID') }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="paginatedPosts.length === 0" class="flex justify-center items-center HelveticaBold">
                    <span class="bg-green-500 p-2 text-white rounded">
                        Tidak ada Pengaduan Hari Ini📝
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