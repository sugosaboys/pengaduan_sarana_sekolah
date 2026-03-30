<script setup>
import { useRoute } from 'vue-router';
import router from '../router';

const isRouteActive = (RoutePath)=>{
    const router = useRoute();
    return router.path === RoutePath
}
//logout
function logout(){
    localStorage.removeItem('Authorization');
    router.push('/login-siswa');
}
</script>

<template>
    <aside class="fixed top-0 left-0 z-40 w-64 h-full bg-zinc-200">
        <div class="flex flex-col h-full px-3 py-4 overflow-y-auto">
            <span class="border-b-1 border-gray-300 flex items-center w-full gap-2 py-2">
                <img src="/assets/login-logo.png" alt="logo" loading="lazy" class="w-[42px] object-cover">
                <h2 class="HelveticaBold">Pengaduan sarana.</h2>
            </span>
            <ul class="flex flex-col h-full mt-8 HelveticaMedium">
                <span class="caption-top text-[14px] text-gray-500">General</span>
                <li :class="['flex gap-2 w-full py-2 px-2 hover:bg-white rounded-lg',isRouteActive('/') ? 'bg-white' : 'bg-transparent']">
                    <img src="/assets/icon/overview.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <router-link to="/">Semua pengaduan</router-link>
                </li>
                <li :class="['flex gap-2 w-full py-2 px-2 hover:bg-white rounded-lg',isRouteActive('/add/aspirasi') ? 'bg-white' : 'bg-transparent']">
                    <img src="/assets/icon/add-file.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <router-link to="/add/aspirasi">Tambahkan aduan</router-link>
                </li>
                <li :class="['flex gap-2 w-full py-2 px-2 hover:bg-white rounded-lg',isRouteActive('/history/aspirasi') ? 'bg-white' : 'bg-transparent']">
                    <img src="/assets/icon/history.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <router-link to="/history/aspirasi">Pengaduan kamu</router-link>
                </li>
                <li class="flex gap-2 mt-auto left-0 bottom-6 py-2 px-2 w-full hover:bg-white rounded-lg">
                    <img src="/assets/icon/logout.svg" alt="overview icon" loading="lazy" class="w-[24px]">
                    <button @click="logout" class="text-red-600 cursor-pointer">logout</button>
                </li>
            </ul>
        </div>
    </aside>
</template>