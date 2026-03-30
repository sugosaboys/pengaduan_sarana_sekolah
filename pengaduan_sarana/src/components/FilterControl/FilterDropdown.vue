<script setup>
import { computed, ref } from 'vue';
const show = ref(false);
const emit = defineEmits(['filter']);

const props = defineProps({
    dataAspirasi: {
        type:Array,
        required: true,
    }
});

const statususes = computed(()=>{
    return [...new Set(props.dataAspirasi.map(data => data.status))];
});

const filter = (e) => {
    emit('filter',e.target.value)
};
</script>

<template>
    <div class="relative flex items-center w-full px-4">
        <button @click="show = !show" class="transition-all w-full flex items-center justify-center gap-2 px-3 py-1 text-sm HelveticaBold text-gray-900 hover:text-purple-500 bg-gray-200 rounded-lg border-2 border-gray-300  cursor-pointer">
            <img src="/assets/icon/Filter-icon.png" alt="Filter" loading="lazy" class="w-[12px]">
            Filter
        </button>
        <div v-if="show" class="absolute top-16 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
            <h6 class="mb-3 text-sm font-medium text-gray-900">Status</h6>
            <ul class="space-y-2 text-sm">
                <li v-for="(status, index) in statususes" class="flex gap-2 HelveticaBold">
                    <input :id="`filter_option_${index}`" @change="filter" type="checkbox" :value="status" />
                    <label :for="`filter_option_${index}`">{{ status }}</label>
                </li>
            </ul>
        </div>
    </div>
</template>