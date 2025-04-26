<script setup>
import userpic from '@/assets/userpic.jpg'
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
              <v-list-item prepend-icon="mdi-logout">Sign out</v-list-item>
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
                <v-card-subtitle color="primary" class="mt-2">Purchased</v-card-subtitle>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\fivegallons.jpg" height="150px" cover></v-img>
                <v-card-title>3 + 2 Gallons</v-card-title>
                <v-card-subtitle>₱65</v-card-subtitle>
                <v-card-subtitle color="primary" class="mt-2">Purchased</v-card-subtitle>
              </v-card>
            </v-col>
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
