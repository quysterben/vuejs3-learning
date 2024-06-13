<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref, inject} from "vue";
import type {AxiosInstance} from "axios";

const router = useRouter()

const axios = inject<AxiosInstance>('axios')
const form = ref({
  email: null,
  username: null,
  password: null,
  confirmPassword: null
})

const gotoLoginPage = () => {
  router.push({name: 'login'})
}

const register = async () => {
  const response = await axios.post('auth/register', form.value)
  gotoLoginPage()
}

</script>

<template>
  <v-container size="sm">
    <h1 class="text-center mb-2">Register Form</h1>
    <v-form @submit.prevent="register">
      <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          variant="underlined"
      />
      <v-text-field
          v-model="form.username"
          label="Username"
          variant="underlined"
      />
      <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          variant="underlined"
      />
      <v-text-field
          v-model="form.confirmPassword"
          label="Confirm password"
          type="password"
          variant="underlined"
      />
      <div class="mt-2">
        <v-btn type="submit" color="primary">Register</v-btn>
        <v-btn class="ms-4" type="button" color="secondary" @click="gotoLoginPage">Login</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>