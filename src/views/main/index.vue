<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Main extends Vue {
  activeIndex: string = '1'

  handleSelect() {}

  mounted() {}
}
</script>
