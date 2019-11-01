<template>
  <v-app>
    <Map />
    <Specification/>
    <AptSearch />
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

<style scoped>
  .juk-color {
    background-color: #1564f9 !important;
  }

  .juk-btn_position {
    bottom: 50px !important;
    right: 500px !important;
  }
</style>