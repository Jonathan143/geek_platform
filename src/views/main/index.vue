<template>
  <div class="main">
    <navbar></navbar>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navbar from './components/Navbar.vue'

@Component({
  components: {
    Navbar
  }
})
export default class Main extends Vue {
  mounted() {}
}
</script>
