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
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex fixed top-0 left-0 z-40 w-64 h-full bg-zinc-200 flex-col">
        <div class="flex flex-col items-start justify-start h-full px-3 py-4 overflow-y-auto">
            <span class="border-b border-gray-300 flex items-center w-full gap-2 py-2 mb-2">
                <img src="/assets/login-logo.png" alt="logo" loading="lazy" class="w-[42px] object-cover">
                <h2 class="HelveticaBold">Pengaduan sarana.</h2>
            </span>

            <ul class="flex flex-col w-full h-full mt-6 HelveticaMedium">
                <span class="text-[12px] text-gray-500 mb-2 px-2">General</span>

                <router-link
                    to="/"
                    :class="['flex items-center gap-2 w-full py-2 px-2 hover:bg-white rounded-lg transition-colors duration-150', isRouteActive('/') ? 'bg-white shadow-sm' : 'bg-transparent']"
                >
                    <img src="/assets/icon/overview.svg" alt="overview icon" loading="lazy" class="w-[24px] shrink-0">
                    <h4>Semua pengaduan</h4>
                </router-link>

                <router-link
                    to="/add/aspirasi"
                    :class="['flex items-center gap-2 w-full py-2 px-2 hover:bg-white rounded-lg transition-colors duration-150', isRouteActive('/add/aspirasi') ? 'bg-white shadow-sm' : 'bg-transparent']"
                >
                    <img src="/assets/icon/add-file.svg" alt="add file icon" loading="lazy" class="w-[24px] shrink-0">
                    <h4>Tambahkan aduan</h4>
                </router-link>

                <router-link
                    to="/history/aspirasi"
                    :class="['flex items-center gap-2 w-full py-2 px-2 hover:bg-white rounded-lg transition-colors duration-150', isRouteActive('/history/aspirasi') ? 'bg-white shadow-sm' : 'bg-transparent']"
                >
                    <img src="/assets/icon/history.svg" alt="history icon" loading="lazy" class="w-[24px] shrink-0">
                    <h4>Pengaduan kamu</h4>
                </router-link>

                <button
                    @click="logout"
                    class="flex items-center gap-2 mt-auto py-2 px-2 w-full hover:bg-white rounded-lg cursor-pointer transition-colors duration-150"
                >
                    <img src="/assets/icon/logout.svg" alt="logout icon" loading="lazy" class="w-[24px] shrink-0">
                    <h4 class="text-red-500">Logout</h4>
                </button>
            </ul>
        </div>
    </aside>

    <!-- Mobile & Tablet Top Navbar -->
    <nav class="md:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-200 border-b border-gray-300 shadow-sm">
        <!-- Top bar: logo + app name -->
        <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-2">
                <img src="/assets/login-logo.png" alt="logo" loading="lazy" class="w-[32px] object-cover">
                <h2 class="HelveticaBold text-sm">Pengaduan sarana.</h2>
            </div>
            <button
                @click="logout"
                class="flex items-center gap-1 py-1 px-2 hover:bg-white rounded-lg transition-colors duration-150 cursor-pointer"
                title="Logout"
            >
                <img src="/assets/icon/logout.svg" alt="logout icon" loading="lazy" class="w-[20px]">
                <span class="text-red-500 text-xs HelveticaMedium">Logout</span>
            </button>
        </div>

        <!-- Bottom tab row: navigation links -->
        <div class="flex items-center border-t border-gray-300">
            <router-link
                to="/"
                :class="['flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-colors duration-150 relative', isRouteActive('/') ? 'bg-white' : 'hover:bg-white/60']"
            >
                <img src="/assets/icon/overview.svg" alt="overview icon" loading="lazy" class="w-[22px]">
                <span class="text-[10px] HelveticaMedium text-gray-700 leading-none">Semua</span>
                <!-- Active indicator -->
                <span v-if="isRouteActive('/')" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-700 rounded-full"></span>
            </router-link>

            <router-link
                to="/add/aspirasi"
                :class="['flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-colors duration-150 relative', isRouteActive('/add/aspirasi') ? 'bg-white' : 'hover:bg-white/60']"
            >
                <img src="/assets/icon/add-file.svg" alt="add file icon" loading="lazy" class="w-[22px]">
                <span class="text-[10px] HelveticaMedium text-gray-700 leading-none">Tambah</span>
                <span v-if="isRouteActive('/add/aspirasi')" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-700 rounded-full"></span>
            </router-link>

            <router-link
                to="/history/aspirasi"
                :class="['flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-colors duration-150 relative', isRouteActive('/history/aspirasi') ? 'bg-white' : 'hover:bg-white/60']"
            >
                <img src="/assets/icon/history.svg" alt="history icon" loading="lazy" class="w-[22px]">
                <span class="text-[10px] HelveticaMedium text-gray-700 leading-none">Riwayat</span>
                <span v-if="isRouteActive('/history/aspirasi')" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-700 rounded-full"></span>
            </router-link>
        </div>
    </nav>
</template>