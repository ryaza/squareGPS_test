<template>
  <div class="about">
    <section class="about__section">
      <h1 class="about__title">
        {{ $t('squareGpsTask') }}
      </h1>
      <div
        v-html="$t('createApplication')"
        class="about__description"
      />
    </section>
    <section class="about__section">
      <h2 class="section__title"> {{ $t('aboutTaskSection') }} </h2>
      <div class="section__description">
        {{ $t('taskText') }}
      </div>
    </section>
    <section class="about__section">
      <h2 class="section__title"> {{ $t('mapSection') }} </h2>
      <div class="section__description">
        {{ $t('mapInstructions') }}
        <ol class="section__list">
          <li class="section__item">
            {{ $t('addMarkerMode') }}
            <ol
              type="a"
              class="section__list"
            >
              <li
                v-html="$t('addressSearch')"
                class="section__item"
              />
              <li class="section__item">
                {{ $t('errorHandling') }}
              </li>
            </ol>
          </li>
          <li class="section__item">
            {{ $t('markerHighlight') }}
          </li>
          <li class="section__item">
            {{ $t('centerMap') }}
          </li>
          <li class="section__item">
            {{ $t('persistentMarkers') }}
          </li>
          <li class="section__item">
            {{ $t('urlDisplay') }}
          </li>
        </ol>
      </div>
      {{ $t('backendService') }}
    </section>
    <section class="about__section">
      <h3> {{ $t('additional') }} </h3>
      <ol class="section__list">
        <li class="section__item">
          {{ $t('mobileSupport') }}
        </li>
        <li class="section__item">
          {{ $t('localization') }}
        </li>
        <li
          v-html="$t('unitTestRequirement')"
          class="section__item"
        />
      </ol>
    </section>
    <section class="about__section">
      <h3 class="notice__title"> {{ $t('reminder') }}</h3>
      <span> {{ $t('reminderText') }}</span>
    </section>
    <section class="about__section">
      <h4 class="example__title"> {{ $t('example') }} </h4>
      <img
        src="@/assets/example_map.png"
        alt="example_map"
        class="section__img"
      >
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutView',
});
</script>

<style scoped lang="scss">
.about {
  &__section {
    width: 100%;
    margin-bottom: 40px;
  }

  &__title {
    font-size: 30px;
    margin-bottom: 16px;
  }

  &__description {
    font-size: 16px;
    line-height: 24px;
  }
}

.about__section {
  .section {
    &__title {
      font-size: 26px;
      margin-bottom: 16px;
    }

    &__list {
      margin: 16px 0;
      padding-left: 16px;
    }

    &__item {
      margin: 16px 0 16px 16px;
      text-indent: -16px;
      padding-left: 16px;
    }

    &__img {
      margin: 0 auto;
      display: block;
      max-width: 700px;
      width: 100%;
    }
  }
}

.notice__title {
  display: inline;
}

.example__title {
  font-weight: normal;
  margin-bottom: 16px;
}
</style>
