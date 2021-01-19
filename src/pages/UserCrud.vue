<template>
  <section class="flex items-center flex-col">
    <h1 class="text-2xl my-5">User Crud</h1>
    <a class="my-2" target="_blank" href="https://www.npmjs.com/package/axios"
      >&gt;&gt; Axios Package &lt;&lt;</a
    >
    <a class="my-2" target="_blank" href="https://reqres.in/"
      >&gt;&gt; ReqRes &lt;&lt;</a
    >
    <a class="my-2" target="_blank" href="https://crudcrud.com/"
      >&gt;&gt; CrudCrud &lt;&lt;</a
    >
    <a class="my-2" target="_blank" href="https://cli.vuejs.org/guide/mode-and-env.html#environment-variables"
      >&gt;&gt; Environment Variables Docs &lt;&lt;</a
    >
    <div class="mt-10 mx-5">
      <button class="px-2 py-1 border rounded my-4 bg-green-600 text-white" @click="state.isCreateUserModalOpen = true">Add User</button>
      <table>
        <thead>
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Avatar</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in state.users" :key="user._id">
            <td class="border px-4 py-2">{{ user._id }}</td>
            <td class="border px-4 py-2">
              <img
                :src="user.avatar"
                alt="user avatar"
                class="rounded-full"
                width="50"
              />
            </td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">
              <button class="px-2 py-1 mx-1 bg-yellow-600 rounded text-white" @click="openUpdateUserModal(user._id)">Update</button>
              <button class="px-2 py-1 mx-1 bg-red-600 rounded text-white" @click="deleteUser(user._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="flex justify-between">
        <button
          class="px-3 py-2 border rounded mt-2"
          :class="state.users.page === 1 ? 'bg-gray-100' : 'hover:shadow'"
          @click="prev"
          :disabled="state.users.page === 1"
        >
          Prev
        </button>
        <button
          class="px-3 py-2 border rounded mt-2"
          :class="state.users.page === state.users.total_pages ? 'bg-gray-100' : 'hover:shadow'"
          @click="next"
          :disabled="state.users.page === state.users.total_pages"
        >
          Next
        </button>
      </div> -->
    </div>
  </section>
  <teleport to="body">
    <modal v-if="state.isCreateUserModalOpen" @close-modal="state.isCreateUserModalOpen = false">
      <template #title>
          Add New User
        </template>
        <template #body>
          <form @submit.prevent="createUser" class="flex flex-col">
            <label for="name">Name</label>
            <input class="w-full p-2 rounded border my-2" name="name" type="text" placeholder="User Name" v-model="state.form.name">
            <label for="email">Email</label>
            <input class="w-full p-2 rounded border my-2" name="email" type="email" placeholder="User Email" v-model="state.form.email">
            <label for="avatar">Avatar</label>
            <input class="w-full p-2 rounded border my-2" name="avatar" type="text" placeholder="Avatar URL" v-model="state.form.avatar">
            <input class="w-full p-2 rounded border hover:bg-gray-300 mt-2" type="submit" value="Create">
          </form>
        </template>
    </modal>
  </teleport>
  <teleport to="body">
    <modal v-if="state.isUpdateUserModalOpen" @close-modal="closeUpdateUserModal">
      <template #title>
          Update User Info
        </template>
        <template #body>
          <form @submit.prevent="updateUser" class="flex flex-col">
            <label for="name">User Name</label>
            <input class="w-full p-2 rounded border my-2" name="name" type="text" placeholder="User Name" v-model="state.form.name">
            <label for="email">User Email</label>
            <input class="w-full p-2 rounded border my-2" name="email" type="email" placeholder="User Email" v-model="state.form.email">
            <label for="avatar">Avatar URL</label>
            <input class="w-full p-2 rounded border my-2" name="avatar" type="text" placeholder="Avatar URL" v-model="state.form.avatar">
            <input class="w-full p-2 rounded border hover:bg-gray-300 mt-2" type="submit" value="Update">
          </form>
        </template>
    </modal>
  </teleport>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "../plugins/axios";
import Modal from '../components/Modal.vue';

export default {
  components: { Modal },
  setup() {
    const state = reactive({
      users: [],
      isCreateUserModalOpen: false,
      isUpdateUserModalOpen: false,
      userToBeUpdatedId: '',
      form: {
        name: '',
        email: '',
        avatar: ''
      }
    });

    onMounted(async () => {
      try {
        const { data } = await axios.get('/users?page=1');
        state.users = data;
      } catch (error) {
        console.error(error);
      }
    });

    async function prev() {
      try {
        const { data } = await axios.get('/users?page=1');
        state.users = data;
      } catch (error) {
        console.error(error);
      }
    }

    async function next() {
      try {
        const { data } = await axios.get('/users?page=2');
        state.users = data;
      } catch (error) {
        console.error(error);
      }
    }

    async function createUser() {
      try {
        const { data } = await axios.post('/users', state.form)
        state.users.push(data)
        state.form.email = ''
        state.form.name = ''
        state.form.avatar = ''
        state.isCreateUserModalOpen = false
      } catch (error) {
        console.error(error);
      }
    }

    async function deleteUser(id) {
      try {
        await axios.delete(`/users/${id}`)
        state.users = state.users.filter(user => user._id !== id) 
      } catch (error) {
        console.error(error);
      }
    }
    
    async function openUpdateUserModal(id) {
      try {
        const { data } = await axios.get(`/users/${id}`);
        state.form.email = data.email
        state.form.name = data.name
        state.form.avatar = data.avatar
        state.isUpdateUserModalOpen = true
        state.userToBeUpdatedId = id
      } catch (error) {
        console.error(error);
      }
    }

    async function updateUser() {
      try {
        await axios.put(`/users/${state.userToBeUpdatedId}`, state.form)
        for (const user of state.users) {
          if(user._id === state.userToBeUpdatedId) {
            user.email = state.form.email
            user.name = state.form.name
            user.avatar = state.form.avatar
            break
          }  
        }
        closeUpdateUserModal()
      } catch (error) {
        console.error(error);
      }
      
    }

    function closeUpdateUserModal() {
      state.form.email = ''
      state.form.name = ''
      state.form.avatar = ''
      state.isUpdateUserModalOpen = false
      
    }

    return { state, next, prev, createUser, deleteUser, openUpdateUserModal, updateUser, closeUpdateUserModal };
  },
};
</script>

<style>
</style>