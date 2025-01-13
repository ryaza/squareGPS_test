import { Module } from 'vuex';
import Backend from '@/api/Backend';
import { IMarker } from '@/types';

interface MarkersState {
  markers: IMarker[];
  selectedMarkerId: number | null;
}

const markerBackend = new Backend<IMarker>('markers');

const markersModule: Module<MarkersState, any> = {
  namespaced: true,
  state: {
    markers: [],
    selectedMarkerId: null,
  },
  mutations: {
    SET_MARKERS(state, markers: IMarker[]) {
      state.markers = markers;
    },
    ADD_MARKER(state, marker: IMarker) {
      state.markers.push(marker);
    },
    SET_SELECTED_MARKER_ID(state, id: number | null) {
      state.selectedMarkerId = id;
    },
  },
  actions: {
    async fetchMarkers({ commit }) {
      const savedMarkers = await markerBackend.getAll();
      commit('SET_MARKERS', savedMarkers);
    },
    async addMarker({ commit }, marker: IMarker) {
      await markerBackend.add(marker);
      commit('ADD_MARKER', marker);
    },
    selectMarker({ commit }, id: number) {
      commit('SET_SELECTED_MARKER_ID', id);
    },
  },
  getters: {
    markers: (state) => state.markers,
    selectedMarkerId: (state) => state.selectedMarkerId,
    selectedMarker: (state) => state.markers.find((marker) => marker.id === state.selectedMarkerId),
  },
};

export default markersModule;
