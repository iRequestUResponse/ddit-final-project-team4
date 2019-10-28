<template>
  <div>
    <v-app>
      <Map />
      <Specification />
      <AptSearch />
    </v-app>
  </div>
</template>

<script>
import Map from '@/components/map/Map.vue';
import Specification from '@/components/map/Specification.vue';
import AptSearch from '@/components/map/AptSearch.vue';

export default {
  components: {
    Map,
    Specification,
    AptSearch,
  }
}
</script>

<style>

</style>