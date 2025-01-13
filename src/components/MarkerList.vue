<template>
  <div class="marker-list">
    <h3 class="marker-list__title">
      {{ $t('markers')}}
    </h3>
    <ul
      v-if="list.length"
      class="marker-list__list"
    >
      <li
        v-for="(item, index) in list"
        :key="`Marker-${item.id}`"
        class="marker-list__item"
        :class="{ 'marker-list__item--selected': isItemSelected(item.id) }"
        @click="() => onSelect(item.id)"
      >
        <strong> {{ $t('marker')}} №{{index + 1}} </strong>
        <div>
          {{ item.lat }}, {{ item.lng }}
        </div>
      </li>
    </ul>
    <font-awesome-icon
      v-else
      class="marker-list__icon"
      :icon="['fas', 'road-barrier']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface IMarker {
  lat: number;
  lng: number;
  address: string;
  id: number,
}

export default defineComponent({
  name: 'MarkerList',
  props: {
    list: {
      type: Array as PropType<IMarker[]>,
      default: () => [],
    },
    selectedItemId: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const isItemSelected = (id: number): boolean => id === props.selectedItemId;

    const onSelect = (id: number) => {
      emit('select', id);
    };

    return {
      isItemSelected,
      onSelect,
    };
  },
});
</script>

<style scoped lang="scss">
.marker-list {
  padding: 16px;

  &__title {
    font-size: 26px;
    margin-bottom: 24px;
  }

  &__list {
    list-style: none;
    height: 100%;
    overflow: scroll;

    @include respond(tablet) {
      max-height: 450px;
    }

    @include respond(mobile) {
      max-height: 250px;
    }
  }

  &__item {
    margin-bottom: 16px;
    padding: 5px;
    cursor: pointer;

    &--selected {
      background-color: #f0f8ff;
      border: 2px solid #007BFF;
      border-radius: 8px;
    }
  }

  &__icon {
    font-size: 100px;
  }
}
</style>
