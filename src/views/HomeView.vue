<script setup lang="ts">

import {useRouter} from "vue-router";
import type {AxiosInstance} from "axios";
import instance from "@/plugins/axios";
import {computed, inject, ref} from "vue";

const router = useRouter()
const axios = inject<AxiosInstance>('axios') || instance
const users = ref([])

const headers = computed(() => {
  return [
    {title: 'ID', key: '_id'},
    {title: 'Email', key: 'email'},
    {title: 'Username', key: 'username'},
    {title: 'Role', key: 'role'},
    {title: 'Avatar', key: 'avatarUrl'},
  ]
})

const roleName = (role: Number) => {
  switch (role) {
    case 2:
      return 'User'
    case 1:
      return 'Admin'
    default:
      return 'Unknown'
  }
}

const fetchUsers = async () => {
  const response = await axios.get('users')
  users.value = response.data.data
}

const created = () => {
  fetchUsers()
}

created()

</script>

<template>
  <v-container>
    <h1>
      Home Page
    </h1>
    <v-data-table
        :headers="headers"
        :items="users"
    >
      <template v-slot:[`item.role`]="{ item }">
        {{ roleName(item.role) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
</style>