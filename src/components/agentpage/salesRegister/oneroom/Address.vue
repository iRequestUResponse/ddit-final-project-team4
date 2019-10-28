<template>
  <div>
    <v-container>
      <v-row v-if="nor_information != ''" class="mb-8">
        <v-col cols="12">
          <div class="pr-5 mr-5">
            <p class="pa-0 ma-0">주소</p>
            <p class="display-1 black--text">{{ nor_information }}</p>
          </div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>

      <div class="address">
        <vue-daum-postcode
          @complete="getAddress"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    (async () => {

    })();
  },
  data() {
    return {
      nor_information: '',
    };
  },
  methods: {
    getAddress(event) {
      let address = event.jibunAddress || event.autoJibunAddress;

      new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
        if (status !== kakao.maps.services.Status.OK) return;

        let { x: lng, y: lat } = result[0];

        this.$emit('selectAddress', {
          address, lng, lat,
        });

        this.nor_information = address;
      });
    },
    // ------------
    async search(event) {
      if (event.code !== 'Enter' || this.itemList.includes(this.query)) return;

      this.cluster.clear();

      let result = (await axios({
        url: `${this.serverLocation}/searchAptList?query=${this.query}&x=${this.map.getCenter().getLng()}&y=${this.map.getCenter().getLat()}`,
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK 3b0fdc6196cbd2de9db95c5bbf5e3969',
          'Content-Type': 'x-www-form-urlencoded',
        }
      })).data;

      this.itemList = [...(result.areaList || []).map(e => e.AREA), ...(result.nameList || []).map(e => `${e.ADDR} : ${e.NAME}`)];
    },
    async selectKeyword(keyword) {
      if (!this.itemList.includes(keyword)) return;

      navigator.geolocation.getCurrentPosition(async res => {

        let result = (await axios({
          url: `${this.serverLocation}/searchApt/${this.query}`
        })).data;

        this.refresh(result);
      });
    },
    refresh(aptList) {
      this.cluster.clear();

      let markers = [];

      for (let e of aptList) {
        let position = new kakao.maps.LatLng(e.APT_LAT, e.APT_LNG);
        let marker = new kakao.maps.Marker({ position });
        marker.setTitle(e.APT_NAME);
        marker.apt_info = e;

        let self = this;

        kakao.maps.event.addListener(marker, 'click', function() {
          self.$emit('selectAddress', this.apt_info);
        });

        kakao.maps.event.addListener(marker, 'mouseover', function() {
          this.setOpacity(0.75);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function() {
          this.setOpacity(1);
        });

        // marker.setMap(this.map);
        markers.push(marker);
      }
      this.cluster.addMarkers(markers);
      this.markerList = markers;
      let avg = this.markerList.reduce((p, c, i) => {
        p.Ga += +c.getPosition().Ga;
        p.Ha += +c.getPosition().Ha;
        return p;
      }, { Ga: 0, Ha: 0 });
      avg.Ga /= this.markerList.length;
      avg.Ha /= this.markerList.length;

      this.map.setCenter(new kakao.maps.LatLng(avg.Ha, avg.Ga));
    },
  }
}
</script>

<style scoped>
.address {
  max-height: 600px;
  overflow-y: auto;
}
</style>