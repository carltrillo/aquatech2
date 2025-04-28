<script setup>
import { ref } from 'vue'
import userpic from '@/assets/userpic.jpg'

const confirm = ref('')
const dialog = ref(false)
const dialog1 = ref(false)
const dialog2 = ref(false)

const name = ref('')
const pass = ref('')
const showSidebar = ref(false)

function changeName() {
  alert(`Name change success!`)
  dialog.value = false
}

function changePass() {
  alert(`Password change success!`)
  dialog1.value = false
}

async function uploadAvatar(event) {
  const file = event.target.files[0]
  if (!file) return

  // if you want just local preview:
  const reader = new FileReader()
  reader.onload = () => {
    userpic.value = reader.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <v-responsive>
    <v-slide-x-transition>
      <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
        <v-row class="justify-center align-start" style="min-height: 100vh">
          <!-- Sidebar (unchanged) -->
          <v-col v-show="showSidebar || $vuetify.display.mdAndUp">
            <v-list style="min-height: 97vh" class="sidebar-border sidebar-bg" nav dense fluid>
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
                to="/history_dashboard"
                class="mt-2"
                style="background-color: white"
                prepend-icon="mdi-history"
              >
                Buy Again
              </v-list-item>

              <v-list-item
                to="#"
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

          <!-- Main Content -->
          <v-col cols="12" md="9">
            <v-row class="mb-3">
              <v-col cols="12" class="d-flex justify-space-between align-center">
                <v-btn icon @click="showSidebar = !showSidebar" class="d-md-none">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>

                <h2 class="text-h5 special-gothic-expanded-one-regular" style="color: #344cb7">
                  Profile
                </h2>
                <div class="d-flex align-center gap-2">
                  <v-icon>mdi-bell</v-icon>
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
            <!-- Profile Dashboard Starts Here -->
            <v-card class="rounded-xl pa-6 mt-5 sidebar-bg" elevation="2">
              <v-row>
                <!-- Profile Section -->
                <v-col cols="12" md="4" class="text-center">
                  <label style="cursor: pointer; display: inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      @change="uploadAvatar"
                      style="display: none"
                    />
                    <v-avatar size="100" class="mb-4">
                      <img
                        :src="userpic"
                        alt="Profile Picture"
                        style="
                          object-fit: cover;
                          object-position: center;
                          width: 100%;
                          height: 100%;
                        "
                      />
                    </v-avatar>
                  </label>
                  <h3 class="text-h6 mb-1">Jason Momoa</h3>
                  <p class="text-caption mb-4">Customer</p>

                  <div class="d-flex justify-center mt-4 gap-2">
                    <v-btn variant="outlined" color="primary" size="small" @click="dialog = true"
                      >Edit Name</v-btn
                    >
                    <v-btn color="blue" class="text-white ml-2" size="small" @click="dialog1 = true"
                      >Edit Password</v-btn
                    >
                  </div>
                </v-col>

                <!-- Graph / Statistics Section -->
                <v-col cols="12" md="8">
                  <v-row>
                    <v-col cols="4" class="text-center mt-10">
                      <h4 class="text-h5 font-weight-bold d-flex justify-center mt-10">5</h4>
                      <p class="text-caption d-flex justify-center">Total Purchase</p>
                    </v-col>
                    <v-col cols="4" class="text-center mt-10">
                      <h4 class="text-h5 font-weight-bold d-flex justify-center mt-10">₱100</h4>
                      <p class="text-caption d-flex justify-center">Money Saved</p>
                    </v-col>
                    <v-col cols="4" class="text-center mt-10">
                      <h4 class="text-h5 font-weight-bold d-flex justify-center mt-10">1</h4>
                      <p class="text-caption d-flex justify-center">Voucher Available</p>
                    </v-col>
                  </v-row>
                </v-col>

                <v-dialog v-model="dialog" width="400">
                  <v-card class="pa-6 rounded-xl" elevation="4">
                    <v-card-title class="justify-center">
                      <v-btn color="green" class="text-white" rounded="lg" width="100%" block>
                        Name Edit
                      </v-btn>
                    </v-card-title>

                    <v-card-text>
                      <v-text-field
                        v-model="name"
                        label="Enter New Full Name"
                        outlined
                        dense
                        hide-details
                      ></v-text-field>

                      <div class="mt-6">
                        <v-btn color="blue" class="text-white mt-4" block @click="changeName">
                          Change Name
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialog1" width="400">
                  <v-card class="pa-6 rounded-xl" elevation="4">
                    <v-card-title class="justify-center">
                      <v-btn color="green" class="text-white" rounded="lg" width="100%" block>
                        Password Edit
                      </v-btn>
                    </v-card-title>

                    <v-card-text>
                      <v-text-field
                        v-model="pass"
                        label="Enter New Password"
                        outlined
                        dense
                        hide-details
                      ></v-text-field>

                      <div class="mt-6">
                        <v-btn color="blue" class="text-white mt-4" block @click="changePass">
                          Change Password
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
                        <v-btn color="blue" class="text-white" to="/" block> Sign Out </v-btn>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
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
