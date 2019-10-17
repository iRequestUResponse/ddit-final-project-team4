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

        this.cluster = new kakao.maps.MarkerClusterer({
            map: this.map,
            averageCenter: true,
            minLevel: 3
        });

        this.refresh();
        kakao.maps.event.addListener(this.map, 'dragend', this.refresh);
        kakao.maps.event.addListener(this.map, 'zoom_changed', this.refresh);
      });
    })();
  },
  data() {
    return {
      map: null,
      cluster: null,
    };
  },
  methods: {
    refresh() {
      if (this.map.getLevel() > 5) return;
      
      this.cluster.clear();

      (async () => {

        let addressList = (await axios({
          url: `${this.serverLocation}/c2a?x=${this.map.getCenter().getLng()}&y=${this.map.getCenter().getLat()}`,
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK 3b0fdc6196cbd2de9db95c5bbf5e3969',
            'Content-Type': 'x-www-form-urlencoded',
          }
        })).data;

        let markers = [];

        for (let e of addressList) {
          let position = new kakao.maps.LatLng(e.APT_LAT, e.APT_LNG);
          let marker = new kakao.maps.Marker({ position });

          // marker.setMap(this.map);
          markers.push(marker);
        }
        this.cluster.addMarkers(markers);
      })();
    },
  }
}
</script>

<style scoped>
#map {
  position: fixed;
  top: 0;
  height: 0;
  width: calc(100% - 400px);
  height: 100vh;
}
</style>