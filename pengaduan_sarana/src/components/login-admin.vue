<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { router } from '../router/index';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const field = ref({
    username:'',
    password:''
});

async function loginAdmin(){
    if(field.value.username === '' || field.value.password === ''){
        toast.error('Please fill in all fields before submitting.')
        return;
    }
    try {
        const res = await axios.post('/api/user/login',field.value)
        const token = res.data.token;
        localStorage.setItem('admin_token',token);
        router.push('/admin');
        toast.success('Login successfuly!');
    } catch (error) {
        toast.error('Make sure your username and password are correct.');
    }
}
</script>

<template>
    <section class="flex justify-center items-center py-10">
        <main class="flex justify-center items-center gap-20">
            <form @submit.prevent="loginAdmin">
                <div class="flex flex-col justify-center items-center w-[500px] gap-5">
                    <img src="/assets/login-logo.png" alt="logo-login-school" loading="lazy" class="w-[100px]">
                    <h1 class="text-[31px] HelveticaMedium">Selamat Datang Kembali!</h1>
                    <input type="text" placeholder="username" class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" v-model.trim="field.username">
                    <input type="password" placeholder="password" class="bg-[#D9D9D9] w-[400px] h-[50px] p-5 rounded text-black placeholder:text-black HelveticaMedium mb-5" v-model.trim="field.password">
                    <button type="submit" class="bg-black w-[400px] h-[50px]  rounded text-white HelveticaBold mb-5 cursor-pointer">login</button>
                </div>
            </form>
            <img src="/assets/admin-login-school.png" alt="image about school life" loading="lazy" class="w-[480px] h-full object-cover rounded-[50px]">
        </main>
    </section>
</template>