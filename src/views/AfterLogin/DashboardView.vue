<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const getIdCookie = document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/, '$1');

  if (!getIdCookie) {
    router.push('/');
  }
});
</script>
