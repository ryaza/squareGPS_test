<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      color="error"
      :timeout="3000"
      top
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn text @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <div class="map-view">
      <MarkerList
        :list="savedMarkers"
        class="map-list"
        @select.self="selectMarker"
      />
      <div id="map" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import VueScrollTo from 'vue-scrollto';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import L, { Map, LeafletMouseEvent } from 'leaflet';
import { IMarker, FetchAddress, AddMarker } from '@/types';
import MarkerList from '@/components/MarkerList.vue';

export default defineComponent({
  name: 'MapView',
  components: {
    MarkerList,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const t = useI18n();
    let map: Map;
    const savedMarkers = ref<IMarker[]>([]);
    const isAddMode = ref(false);
    const snackbar = ref(false);
    const snackbarMessage = ref('');

    const showSnackbar = (message: string) => {
      snackbarMessage.value = message;
      snackbar.value = true;
    };

    const toggleAddMode = () => {
      isAddMode.value = !isAddMode.value;
    };

    const fetchAddress: FetchAddress = async (lat, lng) => {
      try {
        const apiKey = '678104b27b645724661641xrk721041';
        const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${apiKey}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Ошибка в запросе');
        }

        return data.display_name || 'Адрес не найден';
      } catch (error) {
        console.error('Ошибка получения адреса:', error);
        return null;
      }
    };

    const addMarker: AddMarker = async (lat, lng) => {
      if (!map) return;

      const address = await fetchAddress(lat, lng);

      if (!address) {
        console.error('Маркер не добавлен из-за ошибки при получении адреса');
        showSnackbar(t.t('error'));
        return;
      }

      const id = +new Date();
      const marker: IMarker = {
        id, lat, lng, address,
      };

      const leafletMarker = L.marker([lat, lng]).addTo(map);
      leafletMarker.bindPopup(`${t.t('address')} ${address}`).openPopup();

      leafletMarker.on('click', () => {
        store.dispatch('markers/selectMarker', id);
        router.push({ name: 'mapWithId', params: { id } });
      });

      await store.dispatch('markers/addMarker', marker);
    };

    const loadMarkers = async () => {
      await store.dispatch('markers/fetchMarkers');

      savedMarkers.value = store.getters['markers/markers'];
      savedMarkers.value.forEach((markerData: IMarker) => {
        const leafletMarker = L.marker([markerData.lat, markerData.lng]).addTo(map);
        leafletMarker.bindPopup(`${t.t('address')} ${markerData.address}`);

        leafletMarker.on('click', () => {
          store.dispatch('markers/selectMarker', markerData.id);
          router.push({ name: 'mapWithId', params: { id: markerData.id } });

          const target = document.getElementById(`marker-${markerData.id}`);
          if (target) {
            VueScrollTo.scrollTo(target, 500, {
              container: '.marker-list__list',
              duration: 500,
              easing: 'ease-in-out',
            });
          }
        });
      });
    };

    const selectMarker = (id: number) => {
      const selectedMarker: IMarker = savedMarkers.value.find((m) => m.id === id) as IMarker;
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          const { lat, lng } = layer.getLatLng();
          if (lat === selectedMarker.lat && lng === selectedMarker.lng) {
            layer.openPopup();
          } else {
            layer.closePopup();
          }
        }
      });
      map.setView([selectedMarker!.lat, selectedMarker!.lng], map.getZoom());
      store.dispatch('markers/selectMarker', selectedMarker.id);
      router.push({ name: 'mapWithId', params: { id } });
    };

    onMounted(async () => {
      map = L.map('map', {
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true,
        inertia: true,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      }).setView([44.8125, 20.4612], 13);

      await loadMarkers();

      map.on('click', (event: LeafletMouseEvent) => {
        if (isAddMode.value) {
          const { lat, lng } = event.latlng;
          addMarker(lat, lng);
        }
      });

      const AddButtonControl = L.Control.extend({
        options: {
          position: 'bottomright',
        },
        onAdd: () => {
          const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
          button.innerText = isAddMode.value ? t.t('stop') : '+';
          button.style.backgroundColor = '#2196F3';
          button.style.width = '50px';
          button.style.height = '50px';
          button.style.borderRadius = '100%';
          button.style.border = 'none';
          button.style.color = '#fff';
          button.style.fontSize = '16px';
          button.style.cursor = 'pointer';

          L.DomEvent.on(button, 'click', (e) => {
            L.DomEvent.stopPropagation(e);
            toggleAddMode();
            button.innerText = isAddMode.value ? t.t('stop') : '+';
            button.style.backgroundColor = isAddMode.value ? '#EF5350' : '#2196F3';
          });

          return button;
        },
      });
      map.addControl(new AddButtonControl());
    });

    return {
      savedMarkers,
      selectMarker,
      snackbar,
      snackbarMessage,
      showSnackbar,
    };
  },
});
</script>

<style scoped lang="scss">
.map-view {
  display: flex;
  justify-content: space-between;
  height: 760px;

  @include respond(mobile,tablet) {
    flex-direction: column-reverse;
    height: 100vh;
  }
}

.map-list {
  min-width: 300px;
  @include respond(mobile,tablet) {
    width: 100%;
  }
}

#map {
  height: 100%;
  width: 100%;

  @include respond(mobile,tablet) {
    margin: 20px auto;
    max-height: 600px;
  }

  @include respond(mobile) {
    max-height: 350px;
  }
}
</style>
