<script setup>

import {onBeforeMount, ref} from "vue";
import {useLocalStorage} from "@vueuse/core";
import {userDetail, userUpdatePassword, userUpdateProfile} from "../../lib/api/UserApi.js";
import {alertError, alertSuccess} from "../../lib/alert.js";

const token = useLocalStorage("token", "")
const name = ref("")
const password = ref("")
const confirm_password = ref("")

async function fetchUser() {
  const response = await userDetail(token.value);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    name.value = responseBody.data.name;
  } else {
    await alertError(responseBody.errors)
  }
}

async function handleChangeName() {
  const response = await userUpdateProfile(token.value, {name: name.value});
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSuccess("Profile updated successfully")
  } else {
    await alertError(responseBody.errors)
  }
}

async function handleChangePassword() {
  if (password.value !== confirm_password.value) {
    await alertError("Passwords do not match")
    return;
  }

  const response = await userUpdatePassword(token.value, {password: password.value});
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    password.value = "";
    confirm_password.value = "";
    await alertSuccess("Password updated successfully")
  } else {
    await alertError(responseBody.errors)
  }
}

onBeforeMount(async () => {
  await fetchUser();
})

</script>

<template>
  <div class="flex items-center mb-6">
    <i class="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold text-white">My Profile</h1>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Form 1: Edit Name -->
    <div
        class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
            <i class="fas fa-user-edit text-white"></i>
          </div>
          <h2 class="text-xl font-semibold text-white">Edit Profile</h2>
        </div>
        <form v-on:submit.prevent="handleChangeName">
          <div class="mb-5">
            <label for="name" class="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-500"></i>
              </div>
              <input type="text" id="name" name="name"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter your full name" required v-model="name">
            </div>
          </div>

          <div class="mt-6">
            <button type="submit"
                    class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
              <i class="fas fa-save mr-2"></i> Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Form 2: Edit Password -->
    <div
        class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
            <i class="fas fa-key text-white"></i>
          </div>
          <h2 class="text-xl font-semibold text-white">Change Password</h2>
        </div>
        <form v-on:submit.prevent="handleChangePassword">
          <div class="mb-5">
            <label for="new_password" class="block text-gray-300 text-sm font-medium mb-2">New Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-500"></i>
              </div>
              <input type="password" id="new_password" name="new_password"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter your new password" required v-model="password">
            </div>
          </div>

          <div class="mb-5">
            <label for="confirm_password" class="block text-gray-300 text-sm font-medium mb-2">Confirm New
              Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-check-double text-gray-500"></i>
              </div>
              <input type="password" id="confirm_password" name="confirm_password"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Confirm your new password" required v-model="confirm_password">
            </div>
          </div>

          <div class="mt-6">
            <button type="submit"
                    class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
              <i class="fas fa-key mr-2"></i> Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>