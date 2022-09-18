import { inject, reactive } from 'vue'
import {
  createMutations,
  createActions,
  createGetters,
  createCommitFn,
  createDispatchFn
} from './creators'

class Store {
  constructor (options) {
    const {
      state,
      getters,
      mutations,
      actions
    } = options
 
    const store = this
    const { commit, dispatch } = store

    store._state = reactive({ data: state })
    store._mutations = Object.create(null)
    store._actions = Object.create(null)

    createMutations(store, mutations)
    createActions(store, actions)
    createGetters(store, getters)
    createCommitFn(store, commit)
    createDispatchFn(store, dispatch)
  }

  get state () {
    return this._state.data
  }

  commit (type, payload) {
    this._mutations[type](payload)
  }

  dispatch (type, payload) {
    this._actions[type](payload)
  }

  install (app) {
    // 配合 useStore 使用
    app.provide('store', this)
    // 给全局增加 $store 属性，这样就可以在 vue 的template 中直接使用 $store
    app.config.globalProperties.$store = this
  }
}

/**
 * 创建 store => use(store)
 * 
 * 每次在执行 => 返回一个新的 store
 * @param {*} options 
 * @returns Object
 */
export function createStore (options) {
  return new Store(options)
}

export function useStore () {
  return inject('store')
}