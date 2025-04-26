<script setup>
import { ref, onMounted } from 'vue'
import logo from '@/assets/logo-aquatech.jpg'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Dummy user data (replace with API later)
const userName = ref('John Doe')
const orders = ref(12)
const pending = ref(3)
const supportTickets = ref(1)

onMounted(() => {
  // Simulate fetching user data
  // Example: fetch('/api/dashboard').then(...)
})
</script>

<template>
  <v-app :theme="theme">
    <!-- Top App Bar -->
    <v-app-bar app>
      <v-img :src="logo" max-height="40" contain class="mr-4" />
      <v-toolbar-title>Customer Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
        text="Toggle Theme"
        slim
      />
    </v-app-bar>

    <!-- Navigation Drawer (Sidebar) -->
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">Welcome, {{ userName }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-package-variant</v-icon></v-list-item-icon>
          <v-list-item-title>My Orders</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-lifebuoy</v-icon></v-list-item-icon>
          <v-list-item-title>Support</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Total Orders</v-card-title>
              <v-card-text class="text-h4">{{ orders }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Pending Orders</v-card-title>
              <v-card-text class="text-h4">{{ pending }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Support Tickets</v-card-title>
              <v-card-text class="text-h4">{{ supportTickets }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  