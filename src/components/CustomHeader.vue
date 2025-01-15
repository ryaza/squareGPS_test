<template>
  <header class="custom-header">
    <div class="custom-header__wrapper">
      <h1 class="custom-header__title">
        {{ $t('assignment') }}
      </h1>
      <LangSwitcher />
    </div>
    <nav class="custom-header__navigation">
      <router-link
        to="/about"
        class="navigation__link"
      >
        {{ $t('aboutTask') }}
      </router-link>
      <router-link
        to="/map"
        class="navigation__link"
      >
        {{ $t('map') }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LangSwitcher from '@/components/LangSwitcher.vue';

export default defineComponent({
  name: 'CustomHeader',
  components: {
    LangSwitcher,
  },
});
</script>

<style scoped lang="scss">
.custom-header {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #2c3e50;
  margin-bottom: 20px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__navigation {
    margin-top: 16px;
  }

  &__title {
    @include respond(mobile) {
      margin-right: 20px;
    }
  }
}

.navigation__link {
  margin-right: 15px;
  text-decoration: none;
}
</style>
