<script setup>
import { ref } from 'vue'
import userpic from '@/assets/userpic.jpg'

const confirm = ref('')
const dialog = ref(false)
const dialog1 = ref(false)
const dialog2 = ref(false)
const location = ref('')
const paymentMethod = ref('COD')
const paymentOptions = ['COD', 'Gcash']

function placeOrder() {
  alert(`Order placed! Location: ${location.value}, Payment: ${paymentMethod.value}`)
  dialog.value = false
  dialog1.value = false
}
</script>

<template>
  <v-responsive>
    <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
      <v-row class="justify-center align-start" style="min-height: 100vh">
        <v-col cols="12" md="3">
          <v-card class="pa-4 rounded-xl dashboard-bg fill-height" elevation="2">
            <v-list nav dense>
              <v-list-item-title class="text-h6 mb-2">Aquatech</v-list-item-title>
              <v-divider class="mb-2"></v-divider>
              <v-list-item to="/customer_dashboard" prepend-icon="mdi-view-dashboard"
                >Dashboard</v-list-item
              >
              <v-divider class="mb-2"></v-divider>
              <v-list-item to="/promo_dashboard" prepend-icon="mdi-sale">Promos</v-list-item>
              <v-divider class="mb-2"></v-divider>
              <v-list-item to="" prepend-icon="mdi-history">Purchase History</v-list-item>
              <v-divider class="mb-2"></v-divider>
              <v-list-item to="/profile_dashboard" prepend-icon="mdi-account-circle"
                >Profile</v-list-item
              >
              <v-divider class="mb-2"></v-divider>
              <v-spacer class="my-15"></v-spacer>
              <v-list-item prepend-icon="mdi-logout" @click="dialog2 = true">Sign out</v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" md="9">
          <v-row class="mb-4">
            <v-col cols="12" class="d-flex justify-space-between align-center">
              <h2 class="text-h5">Dashboard</h2>
              <div class="d-flex align-center gap-2">
                <v-icon>mdi-bell</v-icon>
                <router-link to="/profile_dashboard">
                  <v-avatar size="35">
                    <img
                      :src="userpic"
                      alt="User"
                      style="object-fit: cover; object-position: center; width: 100%; height: 100%"
                    />
                  </v-avatar>
                </router-link>
              </div>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center align-center">
            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\twogallons.jpg" height="150px" cover></v-img>
                <v-card-title>2 Gallons</v-card-title>
                <v-card-subtitle>₱30</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" @click="dialog = true" block>Buy Again</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\fivegallons.jpg" height="150px" cover></v-img>
                <v-card-title>3 + 2 Gallons</v-card-title>
                <v-card-subtitle>₱65</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" @click="dialog1 = true" block>Buy Again</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-dialog v-model="dialog" width="400">
              <v-card class="pa-6 rounded-xl" elevation="4">
                <v-card-title class="justify-center">
                  <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                    2 Gallons
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <v-text-field
                    v-model="location"
                    label="Enter Location"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>

                  <v-select
                    v-model="paymentMethod"
                    :items="paymentOptions"
                    label="Payment Method"
                    outlined
                    dense
                    hide-details
                    class="mt-4"
                  ></v-select>

                  <div class="text-center mt-2">
                    <v-btn variant="text" color="primary" @click="paymentMethod = 'Gcash'"></v-btn>
                  </div>

                  <div class="mt-6">
                    <div class="d-flex justify-space-between">
                      <span class="font-weight-medium">Total</span>
                      <span class="font-weight-bold">₱30.00</span>
                    </div>

                    <v-btn color="blue" class="text-white mt-4" block @click="placeOrder">
                      Place Order
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog1" width="400">
              <v-card class="pa-6 rounded-xl" elevation="4">
                <v-card-title class="justify-center">
                  <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                    3 + 2 Gallons
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <v-text-field
                    v-model="location"
                    label="Enter Location"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>

                  <v-select
                    v-model="paymentMethod"
                    :items="paymentOptions"
                    label="Payment Method"
                    outlined
                    dense
                    hide-details
                    class="mt-4"
                  ></v-select>

                  <div class="text-center mt-2">
                    <v-btn variant="text" color="primary" @click="paymentMethod = 'Gcash'"></v-btn>
                  </div>

                  <div class="mt-6">
                    <div class="d-flex justify-space-between">
                      <span class="font-weight-medium">Total</span>
                      <span class="font-weight-bold">₱60.00</span>
                    </div>

                    <v-btn color="blue" class="text-white mt-4" block @click="placeOrder">
                      Place Order
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog2" width="400">
              <v-card class="pa-6 rounded-xl" elevation="4">
                <v-card-title>
                  <v-card-subtitle class="ml-6" v-model="confirm" block
                    >Are you sure you want to signout?</v-card-subtitle
                  >
                  <div class="mt-6">
                    <v-btn color="blue" class="text-white" block> Sign Out </v-btn>
                  </div>
                </v-card-title>
              </v-card>
            </v-dialog>
          </v-row>
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

.dashboard-bg {
  background: url('/src\assets\bg-water.jpg') no-repeat center center;
  background-size: cover;
}

.gap-2 > * + * {
  margin-left: 8px;
}
</style>
