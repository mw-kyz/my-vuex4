<template>
  <div>
    <input
      type="text"
      placeholder="Please input something..."
      v-model="inputRef"
    />
    <button @click="addTodo">ADD TODO</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  // import { useStore } from 'vuex';
  import { useStore } from '@/my-vuex'

  const inputRef = ref('')
  const store = useStore()

  const addTodo = () => {
    if (!inputRef.value) {
      alert('请输入数据！')
      return
    }
    store.dispatch('addTodo', inputRef.value)
    inputRef.value = ''
  }
</script>