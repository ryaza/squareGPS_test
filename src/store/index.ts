import { createStore } from 'vuex';
import markersModule from './modules/markers';

const store = createStore({
  modules: {
    markers: markersModule,
  },
});

export default store;
