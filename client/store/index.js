import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentExercise: undefined
}

const mutations = {
  setCurrentExercise(state, exercise) {
    state.currentExercise = exercise
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
