import { mount } from '@vue/test-utils';
import MarkerList from '@/components/MarkerList.vue';
import { IMarker } from '@/types';
import i18n, { initializeI18n } from '@/i18n';
import store from './mocks/store';
import { vuetifyComponents } from './mocks/vuetify';

const markers: IMarker[] = [
  {
    id: 1, lat: 44.8125, lng: 20.4612, address: 'Test address 1',
  },
  {
    id: 2, lat: 44.8135, lng: 20.4622, address: 'Test address 2',
  },
];

describe('MarkerList.vue', () => {
  beforeAll(async () => {
    await initializeI18n();
  });

  it('renders a list of markers', () => {
    const wrapper = mount(MarkerList, {
      props: {
        list: markers,
      },
      global: {
        plugins: [i18n, store],
        stubs: {
          ...vuetifyComponents(),
        },
      },
    });

    expect(wrapper.findAll('.marker-list__item')).toHaveLength(markers.length);
  });
});
