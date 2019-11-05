<template>
  <v-container fluid class="pa-0 ma-0 overflow-y-auto" style="height: 100vh">
    <div class="mt-7 ml-4"><h2>주변 인기 아파트 순위  <span style="color:rgb(21,101,250); font-size:1.5em;"> [{{ this.rankList[0] ? this.rankList[0].APT_ADDR.split(' ')[2] ||  selectdong : selectdong }}]</span> </h2></div>
         <v-row v-if="rankList.length === 0">
          <v-col class="mt-12 pt-12">
            <v-card outlined>
            <div class="title text-center">매물이 없습니다.</div>
            </v-card>
          </v-col>
        </v-row>
    <v-row v-else class="pa-0 mx-0">
      <v-row class="mx-0">
        <v-col cols="12" v-for="aptRank in rankList" :key="aptRank.APT_SEQ">
            <v-card outlined @click="viewAptInfo(aptRank)">
            <div>
              <v-card-title>
                <v-row>
                  <v-col cols="2">
                    <v-icon size="45" icon color="teal accent-3" id="offertitle">home_work</v-icon>
                  </v-col>
                  <v-col cols="10" class="mt-2">
                    <h3>{{ aptRank.APT_NAME }}</h3>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <div><h3 style="color:gray;">{{ aptRank.APT_ADDR }} </h3></div>
                <div class="mt-2"><h3 style="color:gray;">최근거래건수 : {{ aptRank.CNT}}건 <br> 설립년도: {{ aptRank.COMPLETION_DATE.substring(0,4) }}년  </h3></div>
                <div class="mt-4"><h3> <v-icon size="45" icon color="#FFD600" id="offertitle">emoji_events</v-icon> {{ aptRank.RANK }}</h3></div>  
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>  
</template>

<script>
export default {
  props: ['aptNum'], 
  // 여기서 아파트 검색에 대한 값 가져오기 해서 List에 담아서 오기 sql
  beforeMount() {
    this.$root.$on('selectdong', selectdong => {
      this.selectdong = selectdong;
    });

    this.$root.$on('rankList', rankList => {
      
        this.rankList = rankList;
        this.rankList[0].APT_ADDR.split(' ')[2];
     
    });

    this.$root.$on('selectApt', event => {
      if (event != null) {
        this.trans.aptSalesNum = 0;
        this.trans.page = 'AptInfo';
        this.$emit('receivedPage', this.trans);
      }
    });

  },
  data() {
    return {
       trans: {},
       rankList: [],
       ranklength: 0,
       aptSalesNum: 0,
       dong: '',
       selectdong: '',
    }
  },
  methods: {
    viewAptInfo(aptRank){
      let aptSalesNum = aptRank.APT_SEQ;
      this.trans.aptSalesNum = aptSalesNum;
      this.trans.page = 'AptInfo';

      this.$parent.$parent.$children.find(e => e.$el.classList.contains('map_wrap')).map.setLevel(3);
      this.$parent.$parent.$children.find(e => e.$el.classList.contains('map_wrap')).map.setCenter(new kakao.maps.LatLng(aptRank.APT_LAT, aptRank.APT_LNG));

      this.$root.$emit('centerApt', aptRank.APT_SEQ);

      // this.$emit('receivedPage', this.trans);
    },
  }
}
</script>

<style scoped>

</style>