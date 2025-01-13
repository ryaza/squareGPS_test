<template>
  <div class="language-switcher">
    <button @click="toggleDropdown" class="language-btn">
      <span class="arrow" :class="{ open: isDropdownOpen }">
        <font-awesome-icon :icon="['fas', 'globe']" />
      </span>
    </button>
    <ul v-if="isDropdownOpen" class="language-menu">
      <li
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="{ active: lang.code === currentLanguage }"
      >
        {{ lang.name }}
      </li>
    </ul>
  </div>
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

<style scoped lang="scss">
.language-switcher {
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;
}

.language-btn {
  background-color: #4998da;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 1;
}

.language-btn:hover {
  opacity: 0.8;
}

.arrow {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 5px 0;
  width: 150px;
  z-index: 1000;
}

.language-menu li {
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.language-menu li:hover {
  background-color: #f0f0f0;
}

.language-menu li.active {
  background-color: #4998da;
  color: white;
  font-weight: bold;
}
</style>
