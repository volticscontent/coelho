import { createStore } from 'vuex'
import { quizStore } from './quizStore'

export default createStore({
  modules: {
    quiz: quizStore
  }
}) 