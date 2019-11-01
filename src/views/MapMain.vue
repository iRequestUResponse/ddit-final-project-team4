<template>
  <v-app>
    <component :is="map" />
    <Specification :is="spec"/>
    <component :is="search" />
    <v-btn
      absolute
      fab
      bottom
      right
      fixed
      width="80px"
      height="80px"
      color="amber"
      class="juk-btn_position"
      to="/"
    >
      <v-icon x-large>home</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Map from '@/components/map/Map.vue';
import MapNormal from '@/components/map/MapNormal.vue';
import Specification from '@/components/map/Specification.vue';
import SpecificationNormal from '@/components/map/SpecificationNormal.vue';
import AptSearch from '@/components/map/AptSearch.vue';
import OneSearch from '@/components/map/OneSearch.vue';

export default {
  computed: {
    search() {
      if (this.$route.params.func === 'apart') {
        return 'AptSearch';
      } else {
        return 'OneSearch';
      }
    },
    map() {
      if (this.$route.params.func === 'apart') {
        return 'Map';
      } else {
        return 'MapNormal';
      }
    },
    spec() {
      if (this.$route.params.func === 'apart') {
        return 'Specification';
      } else {
        return 'SpecificationNormal';
      }
    }
  },
  components: {
    Map,
    MapNormal,
    Specification,
    SpecificationNormal,
    AptSearch,
    OneSearch,
  }
}
</script>

<style scoped>
  .juk-color {
    background-color: #1564f9 !important;
  }

  .juk-btn_position {
    bottom: 50px !important;
    right: 500px !important;
  }
</style>