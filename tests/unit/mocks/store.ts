import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedMarkerId: 1,
  },
  getters: {
    'markers/selectedMarkerId': (state) => state.selectedMarkerId,
  },
  actions: {
    'markers/selectMarker': jest.fn(),
  },
});
export default store;
