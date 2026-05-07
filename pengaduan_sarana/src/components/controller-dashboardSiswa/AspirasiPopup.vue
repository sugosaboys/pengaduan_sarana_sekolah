<script setup>
import { useformatdate } from '../../composables/useformatdate';
const { formatDate } = useformatdate();
    defineProps({
        Aspirasi: {
            type: Object,
            default: null
        }
    });
</script>

<template>
    <div @click.self="$emit('close')" class="fixed top-0 inset-0 z-54 flex justify-center items-center bg-black/75 py-10">
        <div class="bg-white w-full md:w-xl min-h-full p-6 rounded-lg">
            <header class="flex justify-between items-center pb-8">
                <h4 class="HelveticaBold">Information Details</h4>
                <img src="/assets/icon/close.svg" alt="" loading="lazy" class="w-[24px] cursor-pointer" @click="$emit('close')">
            </header>
            <section v-if="Aspirasi">
                <span>
                    <h4 class="HelveticaBold">NIS</h4>  
                    <p class="HelveticaMedium">{{ Aspirasi.nis }}</p>
                </span>
                <span>
                    <h4 class="HelveticaBold">Nama Siswa</h4>
                    <p class="HelveticaMedium">{{ Aspirasi.nama_siswa }}</p>
                </span>
                <span>
                   <h4 class="HelveticaBold">Kategori</h4>
                   <p class="HelveticaMedium">{{ Aspirasi.ket_kategori }}</p>
               </span>
                <span>
                    <h4 class="HelveticaBold">Admin</h4>
                    <p class="HelveticaMedium">{{ Aspirasi.admin_username || 'Belum ditugaskan'}}</p>
                </span>
                 <span>
                    <h4 class="HelveticaBold">Lokasi</h4>
                    <p class="HelveticaMedium">{{ Aspirasi.lokasi }}</p>
                </span>
                <span>
                    <h4 class="HelveticaBold">Isi aspirasi</h4>
                    <p class="HelveticaMedium">{{ Aspirasi.isi_aspirasi }}</p>
                </span>
                <span>
                    <h4 class="HelveticaBold"> Status</h4>
                    <p class="HelveticaMedium">{{ Aspirasi.status }}</p>
                </span>
                <span>
                    <h4 class="HelveticaBold"> Feedback</h4>
                    <p class="HelveticaMedium">{{ Aspirasi.feedback || 'Belum ada tanggapan' }}</p>
                </span>
                <span>
                    <h4 class="HelveticaBold"> Dibuat</h4>
                    <p class="HelveticaMedium">{{ formatDate(Aspirasi.created_at) }}</p>
                </span>
                <span>
                    <h4 class="HelveticaBold"> Diperbarui</h4>
                    <p class="HelveticaMedium">{{ formatDate(Aspirasi.updated_at) }}</p>
                </span>
            </section>
        </div>
    </div>
</template>