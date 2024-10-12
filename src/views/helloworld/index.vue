<script setup lang="ts">
import { onMounted, ref } from "vue";

const data = ref<string>("");

onMounted(async () => {
  const response = await fetch(`/api/hello-world`);
  data.value = await response.text();
  // await fetch(`/api/user/detail?id=1`);
});
</script>

<template>
  <div>
    <h1>{{ data }}</h1>
  </div>
</template>

<style scoped></style>
