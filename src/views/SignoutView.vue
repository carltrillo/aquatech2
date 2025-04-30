<!-- SignOutView.vue -->
<script setup>
import { supabase } from '@/utils/supabase.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  await supabase.auth.signOut()
  router.push({ name: 'login' })
})
</script>

<template>
  <div class="text-center mt-10">
    <h2 class="special-gothic-expanded-one-regular special-gothic-expanded-one-regular">
      Signing you out...
    </h2>
  </div>
</template>

<style scoped>
.special-gothic-expanded-one-regular {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
