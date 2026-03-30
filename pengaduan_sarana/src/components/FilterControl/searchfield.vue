<script setup>
    const emit = defineEmits(['search']);

    const search = (e) =>{
        emit('search',e.target.value)
    };
</script>

<template>
    <form class="py-6 px-6 flex justify-end items-center">
        <label class="sr-only">Search</label>
        <div class="relative w-full">
            <input type="text" @input="search" placeholder="Search" class="bg-gray-50 border border-gray-500 p-2 rounded-lg focus:outline-blue-500 w-[300px]">
        </div>
    </form>
</template>