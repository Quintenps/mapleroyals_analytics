<template>
  <article class="tile is-child box">
    <p class="title">
      {{ title }}
      <span v-if="tooltipMsg" class="hint--top" :aria-label="tooltipMsg">
        <font-awesome-icon
          :icon="['fas', 'question-circle']"
          style="font-size: 24px"
        ></font-awesome-icon>
      </span>
    </p>
    <p class="subtitle">{{ subtitle }}</p>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      default: '0k',
      type: String,
    },
    tooltipMsg: {
      default: null,
      type: String,
    },
    subtitle: {
      default: 'Last month',
      type: String,
    },
  },
}
</script>
