<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

</script>

<template>
  <v-responsive>
  <v-app>
    <v-container fluid class="d-flex flex-column fill-height pa-0" style="background-color: #dfeaf3;">
     
      <v-row
  class="justify-space-between align-center"
  style="background-color: white; height: -100px; width: 100%; margin-bottom: 30px;"
>
  <!-- Optional: Add logo or nav content here -->
</v-row>


      <!-- Main Content -->
      <v-row class="flex-grow-1">
        <!-- Left Side: Image and Logo -->
        <v-col cols="12" md="6" class="d-flex align-center justify-center pa-10" style= "background-size: cover;">
          <div class="text-center">
            <v-img src="/src\assets\logo-aquatech.png" max-width="300" class="mx-auto mb-4" style="border-radius: 10%;" />
            <br><h1 class="font-weight-bold" style="font-size: 3rem;">
              <span style="color:#5dade2">Aqua</span><span style="color:#333">tech</span>
            </h1>
          </div>
        </v-col>

        <!-- Right Side: Login Form -->
        <v-col cols="12" md="6" class="d-flex align-center justify-center" style="background-color: #dfeaf3;">
          <v-card flat class="pa-6" width="350">
            <v-text-field v-model="username" label="Username" outlined />
            <v-text-field v-model="password" label="Password" type="password" outlined />
            <v-btn color="blue" block class="mt-4">Login</v-btn>
            <v-btn
  color="green"
  block
  class="mt-4"
  :to="{ path: '/register' }"
  tag="RouterLink"
>
  Register
</v-btn>

          </v-card>
        </v-col>
      </v-row>

      <v-row 
  class="justify-center align-center"
  style="background-color: white; height: -20px; width: 100%; margin-top: 48px; font-family: Poppins, sans-serif"
>   © 2025 - Aquatech
</v-row>

    </v-container>
  </v-app>
</v-responsive>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
