<template>
  <v-container id="specification" class="pa-0 ma-0">
    <v-row class="juk-map_toparea pa-0 ma-0">
      <router-link class="logo pa-4" to="/">죽방</router-link>
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
    };
  },
  components: {
    ReviewMain: () => import('@/components/map/review/ReviewMain'),
  },
  methods: {

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
  color: #FFF;
  font-size: 24pt;
  font-weight: bold;
  text-decoration: none;
}

.juk-map_toparea {
  background-color: #1564f9;
}

.bor {
  border: 1px solid black;
}
</style>