<script setup>
import { ref, computed } from 'vue'
import userpic from '@/assets/userpic.jpg'
import onegallon from '@/assets/onegallon.jpg'
import twogallons from '@/assets/twogallons.jpg'
import threegallons from '@/assets/threegallons.jpg'
import fourgallons from '@/assets/fourgallons.jpg'

const confirm = ref('')
const dialog = ref(false)
const dialog1 = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
const dialog4 = ref(false)
const dialog5 = ref(false)
const dialog6 = ref(false)

const location = ref('')
const quantity = ref(1)
const showSidebar = ref(false)

const pricePerGallon = 15
const totalPrice = computed(() => quantity.value * pricePerGallon)

const notifications = ref([]) // <-- NEW: store order notifications
const selectedProduct = ref({ quantity: 1, price: 15 }) // <-- NEW: to store selected product info

function placeOrder() {
  notifications.value.push({
    location: location.value,
    quantity: selectedProduct.value.quantity ?? quantity.value, // Use selected quantity OR custom quantity
    totalAmount: selectedProduct.value.price ?? quantity.value * pricePerGallon, // Use selected price OR custom total
    time: new Date().toLocaleTimeString(), // optional, to show time
  })

  // Reset after order
  location.value = ''
  quantity.value = 1
  dialog.value = false
  dialog1.value = false
  dialog2.value = false
  dialog3.value = false
  dialog4.value = false
  dialog5.value = false
  dialog6.value = false
}

function openDialog(product) {
  selectedProduct.value = product
}
</script>

<template>
  <v-responsive>
    <v-slide-x-transition>
      <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
        <v-row class="justify-center align-start" style="min-height: 100vh">
          <v-col v-show="showSidebar || $vuetify.display.lgAndUp">
            <v-list style="max-width: 335px" class="sidebar-border sidebar-bg" nav dense fluid>
              <v-list-item
                style="background-color: white"
                prepend-icon="mdi-bottle-tonic"
                class="text-h4 special-gothic-expanded-one-regular"
              >
                <a style="color: #344cb7" class="special-gothic-expanded-one-regular">Aqua</a>tech
              </v-list-item>

              <v-list-item
                to="#"
                class="mt-4"
                style="background-color: white"
                prepend-icon="mdi-view-dashboard"
              >
                Dashboard
              </v-list-item>

              <v-list-item
                to="/promo_dashboard"
                class="mt-2"
                style="background-color: white"
                prepend-icon="mdi-sale"
              >
                Promos
              </v-list-item>

              <v-list-item
                to="/history_dashboard"
                class="mt-2"
                style="background-color: white"
                prepend-icon="mdi-history"
              >
                Buy Again
              </v-list-item>

              <v-list-item
                to="/profile_dashboard"
                class="mt-2"
                style="background-color: white"
                prepend-icon="mdi-account-circle"
              >
                Profile
              </v-list-item>

              <v-list-item
                style="background-color: white"
                class="mt-2"
                prepend-icon="mdi-logout"
                @click="dialog4 = true"
              >
                Sign out
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="9">
            <v-row class="mb-4">
              <v-col cols="12" class="d-flex justify-space-between align-center">
                <v-btn icon @click="showSidebar = !showSidebar" class="d-lg-none">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>

                <h2 class="text-h5 special-gothic-expanded-one-regular" style="color: #344cb7">
                  Dashboard
                </h2>
                <div class="d-flex align-center gap-2">
                  <v-badge
                    :content="notifications.length"
                    color="red"
                    v-if="notifications.length > 0"
                  >
                    <v-icon @click="dialog6 = true">mdi-bell</v-icon>
                  </v-badge>
                  <v-icon v-else @click="dialog6 = true">mdi-bell</v-icon>

                  <router-link to="/profile_dashboard">
                    <v-avatar size="35">
                      <img
                        :src="userpic"
                        alt="User"
                        style="
                          object-fit: cover;
                          object-position: center;
                          width: 100%;
                          height: 100%;
                        "
                      />
                    </v-avatar>
                  </router-link>
                </div>
              </v-col>
            </v-row>
            <v-divider class=""></v-divider>
            <v-row class="d-flex justify-center align-center mt-2">
              <v-col cols="12" sm="6" md="3">
                <v-card class="text-center py-4 sidebar-bg" elevation="2">
                  <v-img :src="onegallon" height="150px" cover></v-img>
                  <v-card-title>1 Gallon</v-card-title>
                  <v-card-subtitle>₱15</v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="white"
                      style="background-color: brown"
                      @click="(openDialog({ quantity: 1, price: 15 }), (dialog = true))"
                      block
                      >Purchase</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="text-center py-4 sidebar-bg" elevation="2">
                  <v-img :src="twogallons" height="150px" cover></v-img>
                  <v-card-title>2 Gallons</v-card-title>
                  <v-card-subtitle>₱30</v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="white"
                      style="background-color: brown"
                      @click="(openDialog({ quantity: 2, price: 30 }), (dialog1 = true))"
                      block
                      >Purchase</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="text-center py-4 sidebar-bg" elevation="2">
                  <v-img :src="threegallons" height="150px" cover></v-img>
                  <v-card-title>3 Gallons</v-card-title>
                  <v-card-subtitle>₱45</v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="white"
                      style="background-color: brown"
                      @click="(openDialog({ quantity: 3, price: 45 }), (dialog2 = true))"
                      block
                      >Purchase</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card class="text-center py-4 sidebar-bg" elevation="2">
                  <v-img :src="fourgallons" height="150px" cover></v-img>
                  <v-card-title>4 Gallons</v-card-title>
                  <v-card-subtitle>₱60</v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      color="white"
                      style="background-color: brown"
                      @click="(openDialog({ quantity: 4, price: 60 }), (dialog3 = true))"
                      block
                      >Purchase</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-btn
                color="primary"
                class="mt-2"
                @click="(openDialog({ quantity: 4, price: 60 }), (dialog5 = true))"
                >Custom Purchase</v-btn
              >

              <v-dialog v-model="dialog" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title class="justify-center">
                    <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                      1 Gallon
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

                    <div class="mt-6">
                      <div class="d-flex justify-space-between">
                        <span class="font-weight-medium">Total</span>
                        <span class="font-weight-bold">₱15.00</span>
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

              <v-dialog v-model="dialog2" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title class="justify-center">
                    <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                      3 Gallons
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

                    <div class="mt-6">
                      <div class="d-flex justify-space-between">
                        <span class="font-weight-medium">Total</span>
                        <span class="font-weight-bold">₱45.00</span>
                      </div>

                      <v-btn color="blue" class="text-white mt-4" block @click="placeOrder">
                        Place Order
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialog3" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title class="justify-center">
                    <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                      4 Gallons
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

              <v-dialog v-model="dialog4" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title>
                    <v-card-subtitle class="ml-6" v-model="confirm" block
                      >Are you sure you want to signout?</v-card-subtitle
                    >
                    <div class="mt-6">
                      <v-btn color="blue" class="text-white" to="/" block> Sign Out </v-btn>
                    </div>
                  </v-card-title>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialog5" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title class="justify-center">
                    <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                      Custom Purchase
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <v-text-field
                      class="mb-3"
                      v-model.number="quantity"
                      label="Enter Amount of Gallons"
                      type="number"
                      outlined
                      dense
                      hide-details
                      min="1"
                    ></v-text-field>

                    <v-text-field
                      v-model="location"
                      label="Enter Location"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>

                    <div class="mt-6">
                      <div class="d-flex justify-space-between">
                        <span class="font-weight-medium">Total</span>
                        <span class="font-weight-bold">₱{{ totalPrice.toFixed(2) }}</span>
                      </div>

                      <v-btn color="blue" class="text-white mt-4" block @click="placeOrder">
                        Place Order
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialog6" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title class="justify-center">
                    <v-btn color="black" class="text-white" rounded="lg" width="100%" block>
                      Notifications
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <div v-if="notifications.length === 0" class="text-center">
                      <v-card-subtitle>No notifications yet.</v-card-subtitle>
                    </div>

                    <div v-else>
                      <div v-for="(notif, index) in notifications" :key="index" class="mb-4">
                        <v-card-subtitle>
                          Order #{{ index + 1 }}<br />
                          Location: {{ notif.location }}<br />
                          Quantity: {{ notif.quantity }} Gallon(s)<br />
                          Total: ₱{{ notif.totalAmount.toFixed(2) }}<br />
                          Time: {{ notif.time }}
                        </v-card-subtitle>
                        <v-divider class="my-2"></v-divider>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-x-transition>
  </v-responsive>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.sidebar-bg {
  background: linear-gradient(310deg, blue, lightblue);
  background-size: 300% 300%;
}

.special-gothic-expanded-one-regular {
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.sidebar-border {
  border-right: 2px solid #cccccc; /* Border on the right */
  height: 100vh; /* Fill the whole screen vertically */
  position: fixed; /* Stick to the side */
  top: 0;
  left: 0;
  z-index: 1000; /* So it stays above everything */
  width: 350px;
}

.gap-2 > * + * {
  margin-left: 15px;
}
</style>
