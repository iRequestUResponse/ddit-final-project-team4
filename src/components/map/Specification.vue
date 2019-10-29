<template>
  <v-container id="specification" class="pa-0 ma-0">
    <v-row class="juk-map_toparea pa-0 ma-0">
      <router-link class="logo pa-4" to="/">죽방</router-link>
    </v-row>
    <component
      :is="mapPage"
      :aptNum="aptSalesNum"
      @receivedPage="switchScreen"
    />
  </v-container>
</template>

<script>
export default {
  beforeMount() {
    this.$parent.$on('selectApt', event => {

      this.info = event;
      this.aptNo = this.info.APT_SEQ;
      this.addr = this.info.APT_ADDR;

      // 아파트에 대한 3개월 평균값 가져오기
      (async () => {
        this.avgPrice = (await axios({
          url: `${this.serverLocation}/getAptPrice?aptNo=${ this.aptNo }`
        })).data;
      })();

      // 매물에 대한 1개월 평균값 가져오기
      (async () => {
        this.salesPrice = (await axios({
          url: `${this.serverLocation}/getSalesPrice?aptNo=${ this.aptNo }`
        })).data;
      })();

      // 인기순위 정하기(구별)
      (async () => {
        this.populaptList = (await axios({
          url: `${this.serverLocation}/getPopulApt?addr=${ this.addr }`
        })).data;

        console.log("찍혀라" , this.populaptList.value)
      })();

      // for(let i; i < this.populaptList.length; i++){

      // }

    });

  },
  data() {
    return {
      mapPage: 'AptInfo',
      aptSalesNum: 0,
    }
  },
  
  components: {
    ReviewMain: () => import('@/components/map/review/ReviewMain'),
    AptInfo: () => import('@/components/map/apt/AptInfo'),
  },

  methods: {
    switchScreen(convertPage) {
      this.aptSalesNum = convertPage.aptSalesNum;
      this.mapPage = convertPage.page;
    }
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