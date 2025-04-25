<script setup>
import { ref } from 'vue'

const fullname = ref('')
const user = ref('')
const password = ref('')

const register = () => {
  alert(`Account created successfully! You can now login`)
}
</script>

<template>
  <v-responsive>
    <v-container class="fill-height d-flex justify-center align-center pa-4 login-bg" fluid>
      <v-row class="justify-center align-center" style="min-height: 100vh">
        <v-col cols="12" sm="10" md="6" lg="4">
          <v-card class="pa-6 rounded-xl" elevation="2">
            <v-card-title class="text-h5 text-center font-weight-bold">Register</v-card-title>

            <v-card-subtitle class="text-center mb-4 text-body-2">
              Register an account to access
            </v-card-subtitle>

            <v-form @submit.prevent="register">
              <v-text-field
                label="Fullname"
                v-model="fullname"
                type="text"
                dense
                outlined
                required
              />
              <v-text-field label="Username" v-model="user" type="text" dense outlined required />
              <v-text-field
                label="Password"
                v-model="password"
                type="text"
                dense
                outlined
                required
              />

              <v-btn type="submit" color="green-darken-1" block class="mb-3 text-white" height="48">
                Register
              </v-btn>

              <v-btn
                color="white"
                block
                class="mb-3 text-black"
                height="48"
                @click="loginWithGoogle"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Google-g-icon.png"
                  alt="Google Logo"
                  style="width: 30px; height: 30px; margin-right: 10px"
                />
                Login with Google
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.login-bg {
  background: url('/src\assets\bg-water.jpg') no-repeat center center;
  background-size: cover;
}
</style>
