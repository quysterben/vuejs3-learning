<script setup lang="ts">

import {useRouter} from "vue-router";
import {inject, ref} from "vue";
import type {AxiosInstance} from "axios";
import instance from "@/plugins/axios";
import Swal from "sweetalert2";

const router = useRouter()
const axios = inject<AxiosInstance>('axios') || instance
const form = ref({
  email: null,
  password: null
})

const gotoRegisterPage = () => {
  router.push({name: 'register'})
}

const gotoHomePage = () => {
  router.push({name: 'home'})
}

const login = async () => {
  const response = await axios.post('auth/login', form.value)
  localStorage.setItem('access_token', response.data.accessToken)
  localStorage.setItem('refresh_token', response.data.refreshToken)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  Swal.fire('Success', 'Login success', 'success')
  gotoHomePage()
}

</script>

<template>
  <v-container size="sm">
    <h1 class="text-center mb-2">Login Form</h1>
    <v-form @submit.prevent="login">
      <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          variant="underlined"
      />
      <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          variant="underlined"
      />
      <div class="mt-2">
        <v-btn type="submit" color="primary">Login</v-btn>
        <v-btn class="ms-4" type="button" color="secondary" @click="gotoRegisterPage">Register</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>