import { createRouter , createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import { useSiswaStore } from "@/stores/siswaStore"
import axios from "axios";

import LoginSiswa from "@/view/LoginSiswa.vue";
import LoginAdmin from "@/view/LoginAdmin.vue";
import DashboardSiswa from "@/view/DashboardSiswa.vue";
import DashboardAdmin from "@/view/DashboardAdmin.vue";
import AddAspirasiSiswaView from "@/view/AddAspirasiSiswaView.vue";
import EditAspirasiView from "@/view/EditAspirasiView.vue";
import HistoryPengaduanView from "@/view/HistoryPengaduanView.vue";
import EditAspirasiAdminView from "@/view/EditAspirasiAdminView.vue";
import DashboardKategoriAdminView from "@/view/DashboardKategoriAdminView.vue";
import AddKategoriAdminView from "@/view/AddKategoriAdminView.vue";
import EditKategoriAdminView from "@/view/EditKategoriAdminView.vue";
import DashboardSiswaAdminView from "@/view/DashboardSiswaAdminView.vue";
import AddSiswaAdminView from "@/view/AddSiswaAdminView.vue";
import EditSiswaAdminView from "@/view/EditSIswaAdminView.vue";
import NotFoundPageView from "@/view/404pageView.vue";

const routes = [
    {
        path: '/',
        name: 'DashboardSiswa',
        component: DashboardSiswa,
        meta:{
            requireAuth:true,
            authType:'siswa'
        }
    },
    {
        path: '/history/aspirasi',
        name: 'HistoryAspirasi',
        component: HistoryPengaduanView,
        meta:{
            requireAuth:true,
            authType:'siswa'
        }
    },
    {
        path: '/add/aspirasi',
        name: 'AddAspirasi',
        component: AddAspirasiSiswaView,
        meta:{
            requireAuth:true,
            authType:'siswa'
        }
    },
    {
        path: '/edit/aspirasi/:id_aspirasi',
        name: 'EditAspirasi',
        component: EditAspirasiView,
        meta:{
            requireAuth:true,
            authType:'siswa'
        },
        beforeEnter: async (to, from, next) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/aspirasi/siswa/${to.params.id_aspirasi}`)
            const data = response.data

            const editableStatuses = ['menunggu'];

            if (!editableStatuses.includes(data.status)) {
                next({ name: 'HistoryAspirasi' })
            } else { 
                next()
            }
        } catch (error) {
            next({ name: 'NotFound' })
        }
        }
    },
    {
        path: '/admin',
        name: 'DashboardAdmin',
        component: DashboardAdmin,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path: '/admin/edit/aspirasi/:id_aspirasi',
        name: 'EditAdminAspirasi',
        component: EditAspirasiAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path: '/admin/kelola/kategori',
        name: 'KelolaKategori',
        component: DashboardKategoriAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path: '/admin/add/kategori',
        name: 'AddKategori',
        component: AddKategoriAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path: '/admin/update/kategori/:id_kategori',
        name: 'EditKategori',
        component: EditKategoriAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path: '/admin/kelola/siswa',
        name: 'KelolaSiswa',
        component: DashboardSiswaAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
     {
        path: '/admin/add/siswa',
        name: 'AddSiswa',
        component: AddSiswaAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path: '/admin/edit/siswa/:nis',
        name: 'EditSiswa',
        component: EditSiswaAdminView,
        meta:{
            requireAuth:true,
            authType:'admin'
        }
    },
    {
        path:'/login-siswa',
        name: 'LoginSiswa',
        component: LoginSiswa
    },
    {
        path:'/login-admin',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    {
        path:'/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPageView
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (e) {
    return true;
  }
}

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requireAuth) {
    return next(); // public route, allow
  }

  if (to.meta.authType === 'admin') {
    const adminStore = useAdminStore();
    const isAuth = await adminStore.checkAuth();
    if (isAuth) {
      next();
    } else {
      next('/login-admin');
    }
    return;
  }

  if (to.meta.authType === 'siswa') {
    const siswaStore = useSiswaStore(); // 👈 use store instead of localStorage
    const isAuth = await siswaStore.checkAuth();
    if (isAuth) {
      next();
    } else {
      next('/login-siswa');
    }
    return;
  }

  next();
});

export default router;