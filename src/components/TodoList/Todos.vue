<template>
  <div>
    <div
      v-for="item of $store.getters.filteredTodos"
      :key="item.id"
    >
      <input
        type="checkbox"
        :checked="item.isFinished"
        @click="toggleTodo(item.id)"
      />
      <span :class="{ finished: item.isFinished }">{{ item.text }}</span>
      <button @click="removeTodo(item.id)">DELETE</button>
    </div>
  </div>
</template>

<script setup>
  // import { useStore } from 'vuex';
  import { useStore } from '@/my-vuex';

  const store = useStore()

  const toggleTodo = id => {
    store.dispatch('toggleTodo', id)
  }

  const removeTodo = id => {
    store.dispatch('removeTodo', id)
  }
</script>