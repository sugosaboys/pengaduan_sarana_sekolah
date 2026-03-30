<template>
    <div class="flex items-center gap-2 px-5 py-3">
        <h1 class="HelveticaBold text-[72px]">404</h1>
        <h2 class="HelveticaMedium italic text-[24px]">Page Not Found</h2>
    </div>
    <div class="flex flex-col gap-2 px-5 py-3">
        <p class="HelveticaMedium text-[24px]">Mungkin ini karena URL yang anda tuju tidak valid.</p>
        <router-link to="/" class="bg-black text-white text-center p-2 rounded HelveticaMedium w-[200px]">Back to /</router-link>
    </div>
</template>