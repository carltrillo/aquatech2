<script setup>
import userpic from '@/assets/userpic.jpg'
</script>

<template>
  <v-responsive>
    <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
      <v-row class="justify-center align-start" style="min-height: 100vh">
        <!-- Sidebar (unchanged) -->
        <v-col cols="12" md="3">
          <v-card class="pa-4 rounded-xl dashboard-bg fill-height" elevation="2">
            <v-list nav dense>
              <v-list-item-title class="text-h6 mb-2">VueA</v-list-item-title>
              <v-divider class="mb-2"></v-divider>
              <v-list-item to="/customer_dashboard" prepend-icon="mdi-view-dashboard"
                >Dashboard</v-list-item
              >
              <v-list-item to="/promo_dashboard" prepend-icon="mdi-sale">Promos</v-list-item>
              <v-list-item to="/history_dashboard" prepend-icon="mdi-history"
                >Purchase History</v-list-item
              >
              <v-list-item to="#" prepend-icon="mdi-account-circle">Profile</v-list-item>
              <v-spacer class="my-2"></v-spacer>
              <v-list-item prepend-icon="mdi-logout">Sign out</v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Main Content -->
        <v-col cols="12" md="9">
          <v-row class="mb-4">
            <v-col cols="12" class="d-flex justify-space-between align-center">
              <h2 class="text-h5">Profile</h2>
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

          <!-- Profile Dashboard Starts Here -->
          <v-card class="rounded-xl pa-6" elevation="2">
            <v-row>
              <!-- Profile Section -->
              <v-col cols="12" md="4" class="text-center">
                <v-avatar size="100" class="mb-4">
                  <img
                    :src="userpic"
                    alt="Profile Picture"
                    style="object-fit: cover; object-position: center; width: 100%; height: 100%"
                  />
                </v-avatar>
                <h3 class="text-h6 mb-1">User</h3>
                <p class="text-caption mb-4">Regular Customer</p>

                <div class="d-flex justify-center mt-4 gap-2">
                  <v-btn variant="outlined" color="primary" size="small">Edit Profile</v-btn>
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
                </v-row>
              </v-col>
            </v-row>
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

.dashboard-bg {
  background: url('/src/assets/bg-water.jpg') no-repeat center center;
  background-size: cover;
}

.gap-2 > * + * {
  margin-left: 8px;
}

/* Fake Chart Background */
.graph-placeholder {
  height: 200px;
  background: linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%);
  border-radius: 16px;
}
</style>
