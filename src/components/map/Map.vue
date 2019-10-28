<template>
  <div id="map" ref="map">
  </div>
</template>

<script>


export default {
  mounted() {
    let container = this.$refs.map;

    this.$parent.$on('refresh', (e) => {
      console.log(e);
      this.refresh(e);
    });

    this.$parent.$on('changedFilter', (filter) => {
      this.filter = filter;
      function between(value, arr) {
        return +value >= arr[0] && +value <= arr[1];
      }
      console.log(filter);
      for (let marker of this.markerList) {
        let e = marker.data;
        if (e.BUILD_TYPE == filter.method && (e.BUILD_TYPE !== '월세' || between(e.APT_DEPOSIT, filter.deposit)) && between(e.APT_AREA, filter.area) && between(e.APT_PRICE, filter.price)) {
          marker.setImage(this.markerImage.booking);
        } else {
          marker.setImage(this.markerImage.normal);
        }
      }
    });

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
            minLevel: 6
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
      markerImage: {
        normal: new kakao.maps.MarkerImage(`//192.168.0.121:9000/api/file/icon/icons8-apartment-48.png`, new kakao.maps.Size(48, 48), new kakao.maps.Point(0, 0)),
        booking: new kakao.maps.MarkerImage(`//192.168.0.121:9000/api/file/icon/icons8-booking-48.png`, new kakao.maps.Size(48, 48), new kakao.maps.Point(0, 0)),
      },
      filter: {},
      markerList: [],
    };
  },
  methods: {
    refresh({ arr, filter } = {}) {
      if (filter) {
        this.filter = filter;
      } else {
        filter = this.filter;
      }

      if (this.map.getLevel() > 5) return;
      
      this.cluster.clear();
      let center = this.map.getCenter();
      let position = {
        lng: center.getLng(),
        lat: center.getLat(),
      };

      if (arr) {
        position.lat = arr.LAT;
        position.lng = arr.LNG;
        this.map.setCenter(new kakao.maps.LatLng(arr.LAT, arr.LNG));
      }

      (async () => {
        let addressList = (await axios({
          url: `${this.serverLocation}/c2a?x=${position.lng}&y=${position.lat}&type=${filter.method || ''}`,
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK 3b0fdc6196cbd2de9db95c5bbf5e3969',
            'Content-Type': 'x-www-form-urlencoded',
          }
        })).data;

        let markers = [];

        function between(value, arr) {
          return +value >= arr[0] && +value <= arr[1];
        }

        for (let e of addressList) {
          let position = new kakao.maps.LatLng(e.APT_LAT, e.APT_LNG);
          const marker = new kakao.maps.Marker({ position });
          marker.data = e;

          let bookingCondition = e.BUILD_TYPE;
          if (bookingCondition && between(e.APT_AREA, filter.area)) {
            if (e.BUILD_TYPE === '월세') {
              bookingCondition = between(e.APT_DEPOSIT, filter.price) && between(e.APT_PRICE, filter.deposit);
            } else {
              bookingCondition = between(e.APT_PRICE, filter.price);
            }
          }
          if (bookingCondition) {
            marker.setImage(this.markerImage.booking);
          } else {
            marker.setImage(this.markerImage.normal);
          }

          kakao.maps.event.addListener(marker, 'click', () => {
            this.$parent.$emit('selectApt', e);
          });

          kakao.maps.event.addListener(marker, 'mouseover', () => {
            marker.setOpacity(0.75);
          });

          kakao.maps.event.addListener(marker, 'mouseout', () => {
            marker.setOpacity(1);
          });

          // marker.setMap(this.map);
          markers.push(marker);
        }
        this.markerList = markers;
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