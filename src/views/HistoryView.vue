<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const confirm = ref('')

const dialog2 = ref(false)
const dialog3 = ref(false)

const fullName = ref('User')
const avatarUrl = ref(null)
const notifications = ref([])
const showSidebar = ref(false)

const initials = computed(() => {
  return fullName.value
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

// Fetch orders from Supabase
async function fetchOrders() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error('Error fetching user:', userError)
    return
  }

  fullName.value = user.user_metadata.full_name || 'User'
  avatarUrl.value = user.user_metadata.avatar_url || null

  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('full_name', fullName.value) // or use a user_id if available
    .order('created_at', { ascending: false })

  if (orderError) {
    console.error('Error fetching orders:', orderError)
  } else {
    notifications.value = orders.reverse().map((order) => ({
      address: order.address,
      contact_number: order.contact_number,
      quantity: order.quantity,
      totalAmount: order.total_price,
      time: new Date(order.created_at).toLocaleTimeString(),
    }))
  }
}

onMounted(() => {
  fetchOrders()

  // Optional: Poll every 10 seconds for updates
  setInterval(fetchOrders, 10000)
})
</script>

<template>
  <v-responsive>
    <v-slide-x-transition>
      <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
        <v-row class="justify-center align-start" style="min-height: 100vh">
          <v-col v-show="showSidebar || $vuetify.display.lgAndUp">
            <v-list style="max-width: 328px" class="sidebar-border sidebar-bg" nav dense fluid>
              <v-list-item
                style="background-color: white"
                prepend-icon="mdi-bottle-tonic"
                class="text-h4 special-gothic-expanded-one-regular"
              >
                <a style="color: #344cb7" class="special-gothic-expanded-one-regular">Aqua</a>tech
              </v-list-item>

              <v-list-item
                to="/customer_dashboard"
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
                to="#"
                class="mt-2"
                style="background-color: white"
                prepend-icon="mdi-history"
              >
                History
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
                @click="dialog2 = true"
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
                  History
                </h2>
                <div class="d-flex align-center gap-2">
                  <v-badge
                    :content="notifications.length"
                    color="red"
                    v-if="notifications.length > 0"
                  >
                    <v-icon @click="dialog3 = true">mdi-bell</v-icon>
                  </v-badge>
                  <v-icon v-else @click="dialog3 = true">mdi-bell</v-icon>

                  <router-link to="/profile_dashboard">
                    <v-avatar size="40" style="background-color: orange">
                      <template v-if="avatarUrl">
                        <img
                          :src="avatarUrl"
                          alt="User"
                          style="
                            object-fit: cover;
                            object-position: center;
                            width: 100%;
                            height: 100%;
                          "
                        />
                      </template>
                      <template v-else>
                        <span class="text-h5">{{ initials }}</span>
                      </template>
                    </v-avatar>
                  </router-link>
                </div>
              </v-col>
            </v-row>
            <v-divider class=""></v-divider>
            <v-row class="d-flex justify-center align-center mt-2">
              <v-col v-for="(notif, index) in notifications" :key="index" cols="12" md="4">
                <v-card class="pa-4 sidebar-bg" elevation="2">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    Order #{{ index + 1 }}
                  </v-card-title>
                  <v-card-text>
                    <div><strong>Address:</strong> {{ notif.address }}</div>
                    <div><strong>Contact Number:</strong> {{ notif.contact_number }}</div>
                    <div><strong>Quantity:</strong> {{ notif.quantity }} Gallon(s)</div>
                    <div><strong>Total:</strong> ₱{{ notif.totalAmount.toFixed(2) }}</div>
                    <div><strong>Time:</strong> {{ notif.time }}</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-dialog v-model="dialog1" width="400">
                <v-card class="pa-6 rounded-xl" elevation="4">
                  <v-card-title class="justify-center">
                    <v-btn color="red" class="text-white" rounded="lg" width="100%" block>
                      1 + 1 Gallons
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <v-text-field
                      v-model="address"
                      label="Enter address to deliver"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>

                    <v-text-field
                      v-model="contactNum"
                      label="Enter Contact Number"
                      class="mt-2"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>

                    <div class="mt-6">
                      <div class="d-flex justify-space-between">
                        <span class="font-weight-medium">Total</span>
                        <span class="font-weight-bold">₱25.00</span>
                      </div>

                      <v-btn color="blue" class="text-white mt-4" block @click="orderPlaced">
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
                      <v-btn color="blue" class="text-white" to="/logout" block> Sign Out </v-btn>
                    </div>
                  </v-card-title>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialog3" width="400">
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
                          Address: {{ notif.address }}<br />
                          Contact Number: {{ notif.contact_number }} <br />
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
