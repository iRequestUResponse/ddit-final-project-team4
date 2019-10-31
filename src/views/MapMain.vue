<template>
  <v-app>
    <component :is="map" />
    <Specification/>
    <component :is="search" />
  </v-app>
</template>

<script>
import Map from '@/components/map/Map.vue';
import MapNormal from '@/components/map/MapNormal.vue';
import Specification from '@/components/map/Specification.vue';
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
  },
  components: {
    Map,
    MapNormal,
    Specification,
    AptSearch,
    OneSearch,
  }
}
</script>

<style>
  
</style>