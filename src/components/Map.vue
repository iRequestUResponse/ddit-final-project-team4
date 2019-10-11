<template>
  <div id="map" ref="map">
  </div>
</template>

<script>
export default {
  mounted() {
    let container = this.$refs.map;

    (async () => {
      navigator.geolocation.getCurrentPosition(position => {

        let options = {
          center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
          level: 5,
        };
    
        this.map = new kakao.maps.Map(container, options);
      });
    })();

    // this.$parent.
  },
  data() {
    return {
      map: null
    };
  },
}
</script>

<style scoped>
#map {
  position: fixed;
  top: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
}
</style>