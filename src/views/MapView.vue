<template>
  <div class="map-view">
    <MarkerList
      :list="markers"
      :selected-item-id="selectedIItemId"
      class="map-list"
      @select.self="selectMarker"
    />
    <div id="map" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import L, { Map, LeafletMouseEvent } from 'leaflet';
import { IMarker, FetchAddress, AddMarker } from '@/types';
import Backend from '@/api/Backend';
import MarkerList from '@/components/MarkerList.vue';

export default defineComponent({
  name: 'MapView',
  components: {
    MarkerList,
  },
  setup() {
    const router = useRouter();
    const t = useI18n();
    let map: Map;
    const markers = ref<IMarker[]>([]);
    const isAddMode = ref(false);
    const selectedIItemId = ref(0);
    const markerBackend = new Backend<IMarker>('markers');

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
        alert('Маркер не добавлен из-за ошибки при получении адреса');
        return;
      }

      const id = +new Date();
      const markerValue: IMarker = {
        id, lat, lng, address,
      };

      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`${t.t('address')} ${address}`).openPopup();

      marker.on('click', () => {
        selectedIItemId.value = id;
        router.push({ name: 'mapWithId', params: { id } });
      });

      await markerBackend.add(markerValue);
      markers.value.push(markerValue);
    };

    const loadMarkers = async () => {
      const savedMarkers = await markerBackend.getAll();

      savedMarkers.forEach((markerData) => {
        const marker = L.marker([markerData.lat, markerData.lng]).addTo(map);
        marker.bindPopup(`${t.t('address')} ${markerData.address}`);

        marker.on('click', () => {
          selectedIItemId.value = markerData.id;
          router.push({ name: 'mapWithId', params: { id: markerData.id } });
        });
      });

      markers.value = savedMarkers;
    };

    const selectMarker = (id: number) => {
      const selectedMarker = markers.value.find((m) => m.id === id);
      selectedIItemId.value = id;
      map.setView([selectedMarker!.lat, selectedMarker!.lng], map.getZoom());
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
          button.innerText = isAddMode.value ? '-' : '+';
          button.style.backgroundColor = '#fff';
          button.style.width = '50px';
          button.style.height = '30px';

          L.DomEvent.on(button, 'click', (e) => {
            L.DomEvent.stopPropagation(e);
            toggleAddMode();
            button.innerText = isAddMode.value ? t.t('stop') : '+';
          });

          return button;
        },
      });
      map.addControl(new AddButtonControl());
    });

    return {
      markers,
      selectedIItemId,
      selectMarker,
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
  width: 300px;

  @include respond(mobile,tablet) {
    width: 100%;
  }
}

#map {
  height: 100%;
  width: 100%;
  margin-top: 40px;

  @include respond(mobile,tablet) {
    margin: 20px auto;
  }
}
</style>
