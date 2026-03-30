<script setup>
    const emit = defineEmits(['filter']);

    const filter = (e) => {
        emit('filter',e.target.value)
    };
</script>

<template>
    <div class="flex">
        <label class="flex mr-4 items-center flex-nowrap">
            <input type="radio" name="show" value="all" checked @change="filter">
            <span class="whitespace-nowrap ml-1 HelveticaBold">Show All</span>
        </label>
           <label class="flex mr-4 items-center flex-nowrap">
            <input type="radio" name="show" value="today" @change="filter">
            <span class="whitespace-nowrap ml-1 HelveticaBold">Due Today</span>
        </label>
           <label class="flex mr-4 items-center flex-nowrap">
            <input type="radio" name="show" value="past" @change="filter">
            <span class="whitespace-nowrap ml-1 HelveticaBold">Past Due</span>
        </label>
    </div>
</template>