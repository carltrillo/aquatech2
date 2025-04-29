<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const theme = ref('light')
const currentSection = ref('dashboard')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const userName = ref('')
const orders = ref(0)
const pending = ref(0)
const vouchers = ref(0)   // <-- CHANGED from supportTickets
const myOrders = ref([])

const userId = 1

onMounted(async () => {
  try {
    const dashboard = await axios.get(`/api/dashboard/${userId}`)
    userName.value = dashboard.data.name
    orders.value = dashboard.data.orders
    pending.value = dashboard.data.pending
    vouchers.value = dashboard.data.vouchers   // <-- CHANGED from support_tickets

    const ordersResponse = await axios.get(`/api/users/${userId}/orders`)
    myOrders.value = ordersResponse.data
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

function setSection(section) {
  currentSection.value = section
}
</script>

<template>
  <v-app :theme="theme">
    <!-- App Bar -->
    <v-app-bar app>
      <v-toolbar-title>Customer Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
        text="Toggle Theme"
        slim
      />
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item>
          <v-list-item-title class="text-h6">Welcome, {{ userName }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item link @click="setSection('dashboard')">
          <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="setSection('orders')">
          <v-list-item-icon><v-icon>mdi-package-variant</v-icon></v-list-item-icon>
          <v-list-item-title>My Orders</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="setSection('vouchers')">
          <v-list-item-icon><v-icon>mdi-ticket-confirmation</v-icon></v-list-item-icon>
          <v-list-item-title>My Vouchers</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <template v-if="currentSection === 'dashboard'">
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
                <v-card-title>Vouchers</v-card-title> <!-- CHANGED TITLE -->
                <v-card-text class="text-h4">{{ vouchers }}</v-card-text> <!-- CHANGED DATA -->
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-else-if="currentSection === 'orders'">
          <v-card>
            <v-card-title>My Orders</v-card-title>
            <v-divider />
            <v-list>
              <v-list-item
                v-for="order in myOrders"
                :key="order.id"
              >
                <v-list-item-content>
                  <v-list-item-title>Order #{{ order.id }} - {{ order.status }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.date }} • {{ order.total }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </template>

        <template v-else-if="currentSection === 'vouchers'">
          <v-card>
            <v-card-title>My Vouchers</v-card-title>
            <v-card-text>
              You have {{ vouchers }} available vouchers.
            </v-card-text>
          </v-card>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

