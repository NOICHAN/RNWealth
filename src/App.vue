<template>
<Navbar></Navbar>
  <router-view/>
<Footer></Footer>
</template>

<script setup>
import Navbar from '@/components/NavbarComponent.vue';
import Footer from '@/components/FooterComponent.vue';
</script>
