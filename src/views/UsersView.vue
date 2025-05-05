<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase.js'
import { useTheme } from 'vuetify'

const theme = useTheme()

const confirm = ref('')

const dialog = ref(false)
const dialog1 = ref(false)

const fullName = ref('User')
const avatarUrl = ref(null)
const notifications = ref([])
const showSidebar = ref(false)

function onClick() {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
}

const initials = computed(() => {
  return fullName.value
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

async function fetchUsers() {
  try {
    const { data: orders, error } = await supabase.from('orders').select('full_name')

    if (error) throw error

    // Use a Map to eliminate duplicates based on email (or full_name if email is not reliable)
    const uniqueUsersMap = new Map()

    orders.forEach((order) => {
      if (!uniqueUsersMap.has(order.full_name)) {
        uniqueUsersMap.set(order.full_name, {
          full_name: order.full_name || 'Unnamed',
          avatar_url: order.avatar_url || null,
        })
      }
    })

    // Convert the Map values to an array
    notifications.value = Array.from(uniqueUsersMap.values())
  } catch (err) {
    console.error('Error fetching users from orders table:', err.message)
  }
}

onMounted(() => {
  fetchUsers()

  // Optional: Poll every 10 seconds for updates
  setInterval(fetchUsers, 10000)
})
</script>

<template>
  <v-responsive>
    <v-slide-x-transition>
      <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
        <v-row :theme="theme" class="justify-center align-start" style="min-height: 100vh">

          <!-- Sidebar -->
          <v-col v-show="showSidebar || $vuetify.display.lgAndUp">
            <v-list style="max-width: 328px" class="sidebar-border sidebar-bg" nav dense fluid>
              <v-list-item
                prepend-icon="mdi-bottle-tonic"
                style="color: #344cb7"
                class="text-h4 special-gothic-expanded-one-regular"
              >
                <a style="color: #344cb7" class="special-gothic-expanded-one-regular">Aqua</a
                ><a style="color: white" class="special-gothic-expanded-one-regular">tech</a>
              </v-list-item>

              <v-list-item
                to="/admin_dashboard"
                class="mt-4"
                style="background-color: white; color: #344cb7"
                prepend-icon="mdi-clipboard-list"
              >
                All Orders
              </v-list-item>

              <v-list-item
                to="#"
                class="mt-2"
                style="background-color: white; color: #344cb7"
                prepend-icon="mdi-account-group"
              >
                All Users
              </v-list-item>

              <v-list-item
                to="/admin_profile"
                class="mt-2"
                style="background-color: white; color: #344cb7"
                prepend-icon="mdi-account-circle"
              >
                Profile
              </v-list-item>

              <v-list-item
                to="#"
                class="mt-2"
                style="background-color: white; color: #344cb7"
                :prepend-icon="
                  theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
                "
                @click="onClick"
              >
                Change Theme
              </v-list-item>

              <v-list-item
                style="background-color: white; color: #344cb7"
                class="mt-2"
                prepend-icon="mdi-logout"
                @click="dialog = true"
                color="#344cb7"
              >
                Sign out
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Main content -->
          <v-col cols="12" md="9">
            <v-row class="mb-4">
              <v-col cols="12" class="d-flex justify-space-between align-center">
                <v-btn icon @click="showSidebar = !showSidebar" class="d-lg-none">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>

                <h2 class="text-h5 special-gothic-expanded-one-regular" style="color: #344cb7">
                  All Users
                </h2>
                <div class="d-flex align-center gap-2">
                  <v-badge
                    :content="notifications.length"
                    color="red"
                    v-if="notifications.length > 0"
                  >
                    <v-icon @click="dialog1 = true">mdi-bell</v-icon>
                  </v-badge>
                  <v-icon v-else @click="dialog1 = true">mdi-bell</v-icon>

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
                    User #{{ index + 1 }}
                  </v-card-title>
                  <v-card-text>
                    <div><strong>Full Name:</strong> {{ notif.full_name }}</div>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Signout dialog -->
              <v-dialog v-model="dialog" width="400">
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

              <!-- notifications dialog -->
              <v-dialog v-model="dialog1" width="400">
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
                          User #{{ index + 1 }}<br />
                          Full Name: {{ notif.full_name }}<br />
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
