<script setup>
import { ref } from 'vue'
import aqlogo from '@/assets/aqlogo.jpg'
import { supabase } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'
import { emailValidator, passwordValidator, fullNameValidator } from '@/utils/validators.js'

const router = useRouter()

const fullname = ref('')
const email = ref('')
const password = ref('')

const fullnameError = ref('')
const emailError = ref('')
const passwordError = ref('')

const showPassword = ref(false)

const validateForm = () => {
  let isValid = true

  // Fullname validation
  const fullNameValidation = fullNameValidator(fullname.value)
  if (fullNameValidation !== true) {
    fullnameError.value = fullNameValidation
    isValid = false
  } else {
    fullnameError.value = ''
  }

  // Email validation (just required)
  const emailValidation = emailValidator(email.value)
  if (emailValidation !== true) {
    emailError.value = emailValidation
    isValid = false
  } else {
    emailError.value = ''
  }

  // Password validation
  const passwordValidation = passwordValidator(password.value)
  if (passwordValidation !== true) {
    passwordError.value = passwordValidation
    isValid = false
  } else {
    passwordError.value = ''
  }

  return isValid
}

const register = async () => {
  // First validate the form
  const isValid = validateForm()
  if (!isValid) return // stop if invalid

  // Then try to sign up
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: fullname.value,
      },
    },
  })

  if (error) {
    alert(`Error: ${error.message}`)
  } else {
    alert('Account created successfully! You can now login')
    fullname.value = ''
    email.value = ''
    password.value = ''
    router.replace('/customer_dashboard')
  }
}
</script>

<template>
  <v-responsive>
    <v-container class="fill-height d-flex justify-center align-center pa-4 login-bg" fluid>
      <v-row class="justify-center align-center" style="min-height: 100vh">
        <v-col cols="12" sm="10" md="6" lg="4">
          <div class="text-center mb-6 rounded-x2">
            <v-img
              :src="aqlogo"
              alt="Aquatech Logo"
              contain
              max-width="90"
              class="mx-auto mb-4"
              style="border-radius: 12px"
            ></v-img>
            <div
              class="text-h4 font-weight-bold special-gothic-expanded-one-regular"
              style="letter-spacing: 2px; color: whitesmoke"
            >
              <a style="color: #344cb7" class="special-gothic-expanded-one-regular">AQUA</a>TECH
            </div>
          </div>
          <v-card class="pa-6 rounded-xl" elevation="2">
            <v-card-title class="text-h5 text-center font-weight-bold">Register</v-card-title>

            <v-card-subtitle class="text-center mb-4 text-body-2">
              Register an account to access
            </v-card-subtitle>

            <v-form @submit.prevent="register">
              <v-text-field
                label="Full Name (2 words only)"
                v-model="fullname"
                :error-messages="fullnameError"
                type="text"
                dense
                outlined
                required
              />
              <v-text-field
                label="Email"
                v-model="email"
                :error-messages="emailError"
                type="text"
                dense
                outlined
                required
              />
              <v-text-field
                label="Password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                dense
                outlined
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                :error-messages="passwordError"
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
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook Logo"
                  style="width: 30px; height: 30px; margin-right: 10px"
                />
                Login with Facebook
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

.special-gothic-expanded-one-regular {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.login-bg {
  background: linear-gradient(310deg, blue, lightblue);
  background-size: 300% 300%;
}
</style>
