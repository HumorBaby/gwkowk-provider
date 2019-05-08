<template>
  <a :href="'#'+href">
    <span class="icon">
      <i class="fas fa-link"></i>
    </span>
  </a>
</template>

<script>
export default {
  props: ['href']
}
</script>

<style lang="sass" scoped>
.notification:hover > a
    visibility: inherit

.notification > a
    visibility: hidden
    &:hover
        color: $blue
</style>
