<template>
  <div>
    <a
      href="javascript:;"
      :class="{ active: $store.state.filter === 'all' }"
      @click="setFilter('all')"
    >All</a>
    <a
      href="javascript:;"
      :class="{ active: $store.state.filter === 'finished' }"
      @click="setFilter('finished')"
    >Finished</a>
    <a
      href="javascript:;"
      :class="{ active: $store.state.filter === 'unfinished' }"
      @click="setFilter('unfinished')"
    >Unfinished</a>
  </div>
</template>

<script setup>
  // import { useStore } from 'vuex'
  import { useStore } from '@/my-vuex'

  const store = useStore()

  const setFilter = (filter) => {
    store.commit('setFilter', filter)
  }
</script>

<style lang="scss" scoped>
  a {
    margin-right: 15px;

    &.active {
      text-decoration: none;
      color: #000;
    }
  }
</style>