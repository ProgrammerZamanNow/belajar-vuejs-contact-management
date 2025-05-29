<script setup>
import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {contactDelete, contactList} from "../../lib/api/ContactApi.js";
import {useLocalStorage} from "@vueuse/core";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";

const token = useLocalStorage("token", "")
const search = reactive({
  name: "",
  email: "",
  phone: ""
})
const page = ref(1);
const totalPage = ref(1);
const contacts = ref([]);
const pages = ref([]);

async function handleDelete(id) {
  if (!await alertConfirm("Are you sure you want to delete this contact?")) {
    return;
  }

  const response = await contactDelete(token.value, id);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSuccess("Contact deleted successfully")
    await fetchContacts();
  } else {
    await alertError(responseBody.errors)
  }
}

watch(totalPage, (value) => {
  const data = [];
  for (let i = 1; i <= value; i++) {
    data.push(i);
  }
  pages.value = data;
})

async function handleChangePage(value) {
  page.value = value;
  await fetchContacts();
}

async function handleSearch() {
  page.value = 1;
  await fetchContacts();
}

async function fetchContacts() {
  const response = await contactList(token.value, {
    name: search.name,
    email: search.email,
    phone: search.phone,
    page: page.value
  })
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    contacts.value = responseBody.data;
    totalPage.value = responseBody.paging.total_page;
  } else {
    await alertError(responseBody.errors);
  }
}

onBeforeMount(async () => {
  await fetchContacts();
})

onMounted(() => {
  const toggleButton = document.getElementById('toggleSearchForm');
  const searchFormContent = document.getElementById('searchFormContent');
  const toggleIcon = document.getElementById('toggleSearchIcon');

  // Add transition for smooth animation
  searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
  searchFormContent.style.overflow = 'hidden';
  searchFormContent.style.maxHeight = '0px';
  searchFormContent.style.opacity = '0';
  searchFormContent.style.marginTop = '0';

  toggleButton.addEventListener('click', function () {
    if (searchFormContent.style.maxHeight !== '0px') {
      // Hide the form
      searchFormContent.style.maxHeight = '0px';
      searchFormContent.style.opacity = '0';
      searchFormContent.style.marginTop = '0';
      toggleIcon.classList.remove('fa-chevron-up');
      toggleIcon.classList.add('fa-chevron-down');
    } else {
      // Show the form
      searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
      searchFormContent.style.opacity = '1';
      searchFormContent.style.marginTop = '1rem';
      toggleIcon.classList.remove('fa-chevron-down');
      toggleIcon.classList.add('fa-chevron-up');
    }
  });
})
</script>

<template>
  <div class="flex items-center mb-6">
    <i class="fas fa-users text-blue-400 text-2xl mr-3"></i>
    <h1 class="text-2xl font-bold text-white">My Contacts</h1>
  </div>

  <!-- Search form -->
  <div class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <i class="fas fa-search text-blue-400 mr-3"></i>
        <h2 class="text-xl font-semibold text-white">Search Contacts</h2>
      </div>
      <button type="button" id="toggleSearchForm"
              class="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
        <i class="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
      </button>
    </div>
    <div id="searchFormContent" class="mt-4">
      <form v-on:submit.prevent="handleSearch">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label for="search_name" class="block text-gray-300 text-sm font-medium mb-2">Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-500"></i>
              </div>
              <input type="text" id="search_name" name="search_name"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Search by name" v-model="search.name">
            </div>
          </div>
          <div>
            <label for="search_email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-500"></i>
              </div>
              <input type="text" id="search_email" name="search_email"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Search by email" v-model="search.email">
            </div>
          </div>
          <div>
            <label for="search_phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-phone text-gray-500"></i>
              </div>
              <input type="text" id="search_phone" name="search_phone"
                     class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Search by phone" v-model="search.phone">
            </div>
          </div>
        </div>
        <div class="mt-5 text-right">
          <button type="submit"
                  class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
            <i class="fas fa-search mr-2"></i> Search
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Contact cards grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Create New Contact Card -->
    <div
        class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
      <RouterLink to="/dashboard/contacts/create" class="block p-6 h-full">
        <div class="flex flex-col items-center justify-center h-full text-center">
          <div
              class="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
            <i class="fas fa-user-plus text-3xl text-white"></i>
          </div>
          <h2 class="text-xl font-semibold text-white mb-3">Create New Contact</h2>
          <p class="text-gray-300">Add a new contact to your list</p>
        </div>
      </RouterLink>
    </div>

    <div v-for="contact in contacts" :key="contact.id"
         class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
      <div class="p-6">
        <RouterLink :to="`/dashboard/contacts/${contact.id}`"
                    class="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3">
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
              <i class="fas fa-user text-white"></i>
            </div>
            <h2 class="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
              {{ contact.first_name }} {{ contact.last_name }}
            </h2>
          </div>
          <div class="space-y-3 text-gray-300 ml-2">
            <p class="flex items-center">
              <i class="fas fa-user-tag text-gray-500 w-6"></i>
              <span class="font-medium w-24">First Name:</span>
              <span>{{ contact.first_name }}</span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-user-tag text-gray-500 w-6"></i>
              <span class="font-medium w-24">Last Name:</span>
              <span>{{ contact.last_name }}</span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-envelope text-gray-500 w-6"></i>
              <span class="font-medium w-24">Email:</span>
              <span>{{ contact.email }}</span>
            </p>
            <p class="flex items-center">
              <i class="fas fa-phone text-gray-500 w-6"></i>
              <span class="font-medium w-24">Phone:</span>
              <span>{{ contact.phone }}</span>
            </p>
          </div>
        </RouterLink>
        <div class="mt-4 flex justify-end space-x-3">
          <RouterLink :to="`/dashboard/contacts/${contact.id}/edit`"
                      class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
            <i class="fas fa-edit mr-2"></i> Edit
          </RouterLink>
          <button v-on:click="() => handleDelete(contact.id)"
                  class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
            <i class="fas fa-trash-alt mr-2"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="mt-10 flex justify-center">
    <nav
        class="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
      <a href="#" v-if="page > 1" v-on:click="() => handleChangePage(page - 1)"
         class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center">
        <i class="fas fa-chevron-left mr-2"></i> Previous
      </a>
      <a href="#" v-for="value in pages" :key="value" v-on:click="() => handleChangePage(value)"
         :class="[
             page === value ?
             'px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md'
             :
             'px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200',
         ]">
        {{ value }}
      </a>
      <a href="#" v-if="page < totalPage" v-on:click="() => handleChangePage(page + 1)"
         class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center">
        Next <i class="fas fa-chevron-right ml-2"></i>
      </a>
    </nav>
  </div>
</template>

<style scoped>

</style>