<template>
  <div class="entry">
    <div :id="entry.commands[0]" class="notification is-radiusless">
      <h5 class="subtitle is-5 is-inline">
        <code class="commands">{{entry.commands.join(', ')}}</code>
      </h5>
      <icon-link-hoverable :href="entry.commands[0]"/>
    </div>
    <div class="notification has-background-white is-radiusless">{{entry.doc}}</div>
    <div v-if="entry.examples" class="examples">
      <p>
        <strong>Example</strong>
      </p>
      <div class="notification is-radiusless">
        <code>
          <p v-for="example in entry.examples" :key="example">
            <span class="username">&lt;YouTheUser&gt;</span>
            {{example}}
          </p>
        </code>
      </div>
    </div>
  </div>
</template>

<script>
import IconLinkHoverable from './IconLinkHoverable'

export default {
  components: {
    IconLinkHoverable
  },
  props: ['entry']
}
</script>

<style lang="sass" scoped>
.notification
  margin-bottom: 0

.examples
  .notification
    background: $examples-background
  >p
    padding-left: 1.5rem

.entry
  .notification:last-child
    margin-bottom: 4rem

code
  background: none
  &.commands
    color: $commands-color

.examples code
  padding: 0
  color: white
  p:not(:first-child)
    padding-top: 1rem

.username
  color: $username-color
</style>
