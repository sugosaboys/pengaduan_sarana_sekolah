<script setup>
import { useRoute } from 'vue-router';
import { useAdminStore } from '@/stores/adminStore';
import router from '../../router/index';

const adminStore = useAdminStore();

const isRouteActive = (RoutePath)=>{
    const router = useRoute();
    return router.path === RoutePath
}
//logout
function logout(){
    localStorage.removeItem('admin_token');
    adminStore.ClearAdminInfo();
    router.push('/login-admin');
}
</script>   

<<template>
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex fixed top-0 left-0 z-40 w-64 h-full bg-zinc-200 flex-col">
        <div class="flex flex-col h-full px-3 py-4 overflow-y-auto">
            <span class="border-b border-gray-300 flex items-center w-full gap-2 py-2 mb-2">
                <img src="/assets/login-logo.png" alt="logo" loading="lazy" class="w-[42px] object-cover">
                <h2 class="HelveticaBold">Pengaduan sarana.</h2>
            </span>

            <ul class="flex flex-col h-full mt-6 HelveticaMedium">
                <span class="text-[12px] text-gray-500 mb-2 px-2">General</span>

                <li :class="['flex items-center gap-2 w-full py-2 px-2 hover:bg-white rounded-lg transition-colors duration-150', isRouteActive('/admin') ? 'bg-white shadow-sm' : 'bg-transparent']">
                    <img src="/assets/icon/overview.svg" alt="overview icon" loading="lazy" class="w-[24px] shrink-0">
                    <router-link to="/admin" class="w-full">Semua pengaduan</router-link>
                </li>

                <li :class="['flex items-center gap-2 w-full py-2 px-2 hover:bg-white rounded-lg transition-colors duration-150', isRouteActive('/admin/kelola/siswa') ? 'bg-white shadow-sm' : 'bg-transparent']">
                    <img src="/assets/icon/add-file.svg" alt="kelola siswa icon" loading="lazy" class="w-[24px] shrink-0">
                    <router-link to="/admin/kelola/siswa" class="w-full">Pengelolaan Siswa</router-link>
                </li>

                <li :class="['flex items-center gap-2 w-full py-2 px-2 hover:bg-white rounded-lg transition-colors duration-150', isRouteActive('/admin/kelola/kategori') ? 'bg-white shadow-sm' : 'bg-transparent']">
                    <img src="/assets/icon/history.svg" alt="kelola kategori icon" loading="lazy" class="w-[24px] shrink-0">
                    <router-link to="/admin/kelola/kategori" class="w-full">Pengelolaan Kategori</router-link>
                </li>

                <li class="flex items-center gap-2 mt-auto py-2 px-2 w-full hover:bg-white rounded-lg transition-colors duration-150">
                    <img src="/assets/icon/logout.svg" alt="logout icon" loading="lazy" class="w-[24px] shrink-0">
                    <button @click="logout" class="text-red-500 cursor-pointer w-full text-left">Logout</button>
                </li>
            </ul>
        </div>
    </aside>

    <!-- Mobile & Tablet Top Navbar -->
    <nav class="md:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-200 border-b border-gray-300 shadow-sm">
        <!-- Top bar: logo + logout -->
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
                to="/admin"
                :class="['flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-colors duration-150 relative', isRouteActive('/admin') ? 'bg-white' : 'hover:bg-white/60']"
            >
                <img src="/assets/icon/overview.svg" alt="overview icon" loading="lazy" class="w-[22px]">
                <span class="text-[10px] HelveticaMedium text-gray-700 leading-none">Semua</span>
                <span v-if="isRouteActive('/admin')" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-700 rounded-full"></span>
            </router-link>

            <router-link
                to="/admin/kelola/siswa"
                :class="['flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-colors duration-150 relative', isRouteActive('/admin/kelola/siswa') ? 'bg-white' : 'hover:bg-white/60']"
            >
                <img src="/assets/icon/add-file.svg" alt="kelola siswa icon" loading="lazy" class="w-[22px]">
                <span class="text-[10px] HelveticaMedium text-gray-700 leading-none">Siswa</span>
                <span v-if="isRouteActive('/admin/kelola/siswa')" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-700 rounded-full"></span>
            </router-link>

            <router-link
                to="/admin/kelola/kategori"
                :class="['flex flex-1 flex-col items-center justify-center gap-1 py-2 px-1 transition-colors duration-150 relative', isRouteActive('/admin/kelola/kategori') ? 'bg-white' : 'hover:bg-white/60']"
            >
                <img src="/assets/icon/history.svg" alt="kelola kategori icon" loading="lazy" class="w-[22px]">
                <span class="text-[10px] HelveticaMedium text-gray-700 leading-none">Kategori</span>
                <span v-if="isRouteActive('/admin/kelola/kategori')" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gray-700 rounded-full"></span>
            </router-link>
        </div>
    </nav>
</template>