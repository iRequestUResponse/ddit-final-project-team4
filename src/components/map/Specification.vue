<template>
  <v-container id="specification" class="pa-0 ma-0">
    <v-row class="pa-0 ma-0">
      <router-link class="logo pa-4" to="/">죽방</router-link>
      <v-btn @click="joinTest">chat test</v-btn>
    </v-row>
    <component
      :is="mapPage"
    />
    <v-row class="pa-0 ma-0">
      {{ info }}
    </v-row>
  </v-container>
</template>

<script>
export default {
  beforeMount() {
    this.$parent.$on('selectApt', event => {
      this.info = event;
    });
  },
  data() {
    return {
      info: {},
      mapPage: '',
    }
  },
  components: {
    ReviewMain: () => import('@/components/map/review/ReviewMain'),
  },
  methods: {
    joinTest() {
      this.$store.dispatch('chatJoin', prompt(''));
    }
  }
}
</script>

<style scoped>
#specification {
  position: fixed;
  right: 0;
  width: 400px;
  background: #FFF;
  height: 100vh;
}

a.logo {
  color: #1564f9;
  font-size: 24pt;
  font-weight: bold;
  text-decoration: none;
}

.bor {
  border: 4px solid black;
}
</style>