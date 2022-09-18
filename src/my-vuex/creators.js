import { computed } from 'vue'
import { forEachValueKey } from './utils'

export function createMutations (store, mutations) {
  // 重新封装用户传入的mutations，更改this执行，传入所需参数
  forEachValueKey(mutations, (mutationFn, mutationKey) => {
    store._mutations[mutationKey] = (payload) => {
      mutationFn.apply(store, [store.state, payload])
    }
  })
}

export function createActions (store, actions) {
  // 重新封装用户传入的actions，更改this执行，传入所需参数
  forEachValueKey(actions, (actionFn, actionKey) => {
    store._actions[actionKey] = (payload) => {
      actionFn.apply(store, [store, payload])
    }
  })
}

export function createGetters (store, getters) {
  store.getters = {}

  forEachValueKey(getters, (getterFn, getterKey) => {

    const getterFnComputed = computed(() => {
      return getterFn(store.state, store.getters)
    })

    Object.defineProperty(store.getters, getterKey, {
      get () {
        return getterFnComputed.value
      }
    })
  })
}

export function createCommitFn (store, commit) {
  // 重新封装，更改this指向
  store.commit = function (type, payload) {
    commit.apply(store, [ type, payload ])
  }
}

export function createDispatchFn (store, dispatch) {
  // 重新封装，更改this指向
  store.dispatch = function (type, payload) {
    dispatch.apply(store, [ type, payload ])
  }
}