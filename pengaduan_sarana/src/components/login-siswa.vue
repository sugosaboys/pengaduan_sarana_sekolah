<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { router } from '../router/index';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const field = ref({
    nis:'',
    password:''
});

async function LoginSiswa(){
    if(field.value.nis === '' || field.value.password === ''){
        toast.error('Please fill in all fields before submitting.')
        return;
    }
    try {
        const res = await axios.post('/api/authsiswa/login',field.value)
        const token = res.data.token;
        localStorage.setItem('Authorization',token);
        router.push('/');
        toast.success('Login successfull!');
    } catch (error) {
        toast.error('Make sure your nis and password are correct.');
    }
}

</script>

<template>
    <section class="flex justify-center items-center py-10">
        <main class="flex justify-center items-center gap-20">
            <form @submit.prevent="LoginSiswa">
                <div class="flex flex-col justify-center items-center w-[500px] gap-5">
                    <img src="/assets/login-logo.png" alt="logo-login-school" loading="lazy" class="w-[100px]">
                    <h1 class="text-[31px] HelveticaMedium">Selamat Datang Kembali!</h1>
                    <input type="text" placeholder="nis" class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" v-model.trim="field.nis">
                    <input type="password" placeholder="password" class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" v-model.trim="field.password">
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold mb-5 cursor-pointer">login</button>
                </div>
            </form>
            <img src="/assets/school-login-siswa.png" alt="image about school life" loading="lazy" class="w-[480px] h-full object-cover rounded-[50px]">
        </main>
    </section>
</template>