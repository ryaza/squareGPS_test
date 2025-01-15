<template>
  <v-menu
    v-model="isDropdownOpen"
    offset-y
    transition="scale-transition"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        class="language-btn"
      >
        <font-awesome-icon :icon="['fas', 'globe']" />
      </v-btn>
    </template>
    <v-list class="language-menu">
      <v-list-item
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="{ active: lang.code === currentLanguage }"
      >
        <v-list-item-title>
          {{ lang.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { loadLocaleMessages } from '@/i18n';

const supportedLocales = ['ru', 'en'] as const;
type Locale = typeof supportedLocales[number];

export default defineComponent({
  name: 'LangSwitcher',
  setup() {
    const { locale } = useI18n();

    const languages = [
      {
        code: 'ru',
        name: 'Русский',
      },
      {
        code: 'en',
        name: 'English',
      },
    ];

    const currentLanguage = ref(locale.value);
    const isDropdownOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const changeLanguage = async (lang: Locale) => {
      await loadLocaleMessages(lang);
      locale.value = lang;
      currentLanguage.value = lang;
      isDropdownOpen.value = false;
    };

    onMounted(async () => {
      await changeLanguage('ru');
    });

    return {
      languages,
      currentLanguage,
      isDropdownOpen,
      toggleDropdown,
      changeLanguage,
    };
  },
});
</script>
