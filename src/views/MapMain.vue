<template>
  <div>
    <Map />
    <Specification />
    <Search />
  </div>
</template>

<script>
import Map from '@/components/map/Map.vue';
import Specification from '@/components/map/Specification.vue';
import Search from '@/components/map/Search.vue';

export default {
  components: {
    Map,
    Specification,
    Search,
  }
}
</script>

<style>

</style>