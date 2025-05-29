<script setup>
import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import {contactDetail, contactUpdate} from "../../lib/api/ContactApi.js";
import {useLocalStorage} from "@vueuse/core";
import {alertError, alertSuccess} from "../../lib/alert.js";

const route = useRoute();
const {id} = route.params;
const contact = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: ""
})
const token = useLocalStorage("token", "")

async function handleSubmit() {
  const response = await contactUpdate(token.value, id, contact);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSuccess("Contact updated successfully")
  } else {
    await alertError(responseBody.errors)
  }
}

async function fetchContact() {
  const response = await contactDetail(token.value, id);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    contact.first_name = responseBody.data.first_name;
    contact.last_name = responseBody.data.last_name;
    contact.email = responseBody.data.email;
    contact.phone = responseBody.data.phone;
  } else {
    await alertError(responseBody.errors)
  }
}

onMounted(async () => {
  await fetchContact();
})

</script>

<template>
  <div class="flex items-center mb-6">
    <RouterLink to="/dashboard/contacts"
                class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
      <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-user-edit text-blue-400 mr-3"></i> Edit Contact
    </h1>
  </div>

  <div
      class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <form v-on:submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label for="first_name" class="block text-gray-300 text-sm font-medium mb-2">First Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
              </div>
              <input type="text" id="first_name" name="first_name"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter first name" v-model="contact.first_name" required>
            </div>
          </div>
          <div>
            <label for="last_name" class="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-500"></i>
              </div>
              <input type="text" id="last_name" name="last_name"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter last name" v-model="contact.last_name" required>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-500"></i>
            </div>
            <input type="email" id="email" name="email"
                   class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                   placeholder="Enter email address" v-model="contact.email" required>
          </div>
        </div>

        <div class="mb-6">
          <label for="phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-phone text-gray-500"></i>
            </div>
            <input type="tel" id="phone" name="phone"
                   class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                   placeholder="Enter phone number" v-model="contact.phone" required>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <RouterLink to="/dashboard/contacts"
                      class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
            <i class="fas fa-times mr-2"></i> Cancel
          </RouterLink>
          <button type="submit"
                  class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
            <i class="fas fa-save mr-2"></i> Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>