import { createRouter , createWebHistory } from "vue-router";

import LoginSiswa from "../view/LoginSiswa.vue";
import LoginAdmin from "../view/LoginAdmin.vue";
import DashboardSiswa from "../view/DashboardSiswa.vue";
import DashboardAdmin from "../view/DashboardAdmin.vue";
import AddAspirasiSiswaView from "../view/AddAspirasiSiswaView.vue";
import EditAspirasiView from "../view/EditAspirasiView.vue";
import HistoryPengaduanView from "../view/HistoryPengaduanView.vue";
import EditAspirasiAdminView from "../view/EditAspirasiAdminView.vue";
import DashboardKategoriAdminView from "../view/DashboardKategoriAdminView.vue";
import AddKategoriAdminView from "../view/AddKategoriAdminView.vue";
import EditKategoriAdminView from "../view/EditKategoriAdminView.vue";
import DashboardSiswaAdminView from "../view/DashboardSiswaAdminView.vue";
import AddSiswaAdminView from "../view/AddSiswaAdminView.vue";
import EditSiswaAdminView from "../view/EditSIswaAdminView.vue";
import NotFoundPageView from "../view/404pageView.vue";

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

router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){

        if(to.meta.authType === 'admin'){
            if(localStorage.getItem('admin_token')){
                next();
            }else{          
                next('/login-admin')
            }
            return;
        }

        if(to.meta.authType === 'siswa'){
            if(localStorage.getItem('Authorization')){
                next();
            }else{          
                next('/login-siswa')
            }
            return;
        }

    }else{
        next();
    }
});

export default router;