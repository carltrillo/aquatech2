<script setup>
// No logic required yet for the static dashboard
</script>

<template>
  <v-responsive>
    <v-container class="fill-height d-flex justify-center align-center pa-4" fluid>
      <v-row class="justify-center align-start" style="min-height: 100vh">
        <v-col cols="12" md="3">
          <v-card class="pa-4 rounded-xl dashboard-bg" elevation="2">
            <v-list nav dense>
              <v-list-item-title class="text-h6 mb-2">VueA</v-list-item-title>
              <v-divider class="mb-2"></v-divider>
              <v-list-item to="#" prepend-icon="mdi-view-dashboard">Dashboard</v-list-item>
              <v-list-item to="#" prepend-icon="mdi-view-promos">Promos</v-list-item>
              <v-list-item to="#" prepend-icon="mdi-avatar-view">Profile</v-list-item>
              <v-spacer class="my-2"></v-spacer>
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
                <v-avatar size="35">
                  <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="User" />
                </v-avatar>
              </div>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center align-center">
            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\onegallon.jpg" height="150px" cover></v-img>
                <v-card-title>1 Gallon</v-card-title>
                <v-card-subtitle>₱15</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" block>Purchase</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\twogallons.jpg" height="150px" cover></v-img>
                <v-card-title>2 Gallons</v-card-title>
                <v-card-subtitle>₱30</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" block>Purchase</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\threegallons.jpg" height="150px" cover></v-img>
                <v-card-title>3 Gallons</v-card-title>
                <v-card-subtitle>₱45</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" block>Purchase</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="text-center py-4" elevation="2">
                <v-img src="src\assets\fourgallons.jpg" height="150px" cover></v-img>
                <v-card-title>4 Gallons</v-card-title>
                <v-card-subtitle>₱60</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" block>Purchase</v-btn>
                </v-card-actions>
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
