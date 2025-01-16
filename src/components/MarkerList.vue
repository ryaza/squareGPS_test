<template>
  <v-card class="marker-list">
    <v-card-title>
      {{ $t('markers') }}
    </v-card-title>
    <v-card-text>
      <v-list
        v-if="list.length"
        class="marker-list__list"
      >
        <v-list-item
          v-for="(item, index) in list"
          :key="`Marker-${item.id}`"
          class="marker-list__item"
          :id="`marker-${item.id}`"
          :class="getItemClasses(item.id)"
          @click="onSelect(item.id)"
        >
          <v-list-item-title>
            <strong>{{ $t('marker') }} №{{ index + 1 }}</strong>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.lat }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ item.lng }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <span v-else> {{ $t('listEmpty') }} </span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { IMarker } from '@/types';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MarkerList',
  props: {
    list: {
      type: Array as PropType<IMarker[]>,
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const store = useStore();
    const selectedMarkerId = computed(() => store.getters['markers/selectedMarkerId']);
    const isItemSelected = (id: number): boolean => id === selectedMarkerId.value;

    const onSelect = (id: number) => {
      emit('select', id);
    };

    const getItemClasses = (id: number) => {
      const isSelected = isItemSelected(id);
      return {
        'border-sm': isSelected,
        'bg-grey-lighten-5': isSelected,
        rounded: isSelected,
      };
    };

    return {
      isItemSelected,
      onSelect,
      selectedMarkerId,
      getItemClasses,
    };
  },
});
</script>

<style scoped lang="scss">
.marker-list {
  padding: 16px;

  &__list {
    max-height: 700px;
    overflow-y: auto;

    @include respond(tablet) {
      max-height: 300px;
    }

    @include respond(mobile) {
      max-height: 200px;
    }
  }

  &__item {
    margin: 5px 0;
  }
}
</style>
