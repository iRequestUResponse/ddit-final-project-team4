<template>
  <v-container fluid class="pa-0 ma-0 overflow-y-auto" style="height: 100vh">

    <div class="mt-7 ml-4"><h2>주변 인기 원룸 순위  <span style="color:rgb(21,101,250); font-size:1.5em;">  [{{ ((rankList[0] || {}).ADDRESS || ' ').split(' ')[2] ||  selectdong  }}]</span> </h2></div>
 
        <v-row v-if="ranklength === 0">
          <v-col class="mt-12 pt-12">
            <v-card outlined>
            <div class="title text-center">매물이 없습니다.</div>
            </v-card>
          </v-col>
        </v-row>
       
    <v-row v-else class="pa-0 mx-0">
      <v-row class="mx-0 mt-2">
        
          
        <v-col cols="12" v-for="aptRank in rankList" :key="aptRank.NORSALES_NUM">
            <v-card outlined>
            <div class="mt-3 ml-3"><h3> <v-icon size="35" icon color="#FFD600" id="offertitle">emoji_events</v-icon> {{ aptRank.RANK }}
              
            <span class="mr-4" style="float:right;">조회수 {{ aptRank.VIEW_CNT }}</span>
            </h3>
            </div>
            <v-row class="mx-0 mr-4">
              <v-spacer></v-spacer>
              <v-btn outlined tile @click="viewDetail(aptRank.NORSALES_NUM)">상세보기</v-btn>
            </v-row>
            <div id="title" @click="viewOneInfo(aptRank)">
              <v-card-title>
                <v-row justify="center">
                  <v-col cols="1">
                    <v-icon size="40" icon color="deep-orange lighten-1" id="offertitle">hotel</v-icon>
                  </v-col>
                  <v-col cols="10" class="mt-1 ml-3">
                    <h4>{{ aptRank.SALES_TITLE }}</h4>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <div>
                      <v-img :src="`${fileServer}/file/${aptRank.PHOTO_PATH}`" width="230px" height="150px" />

                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="mt-2"><h4 style="color:gray;"> {{ aptRank.BUILD_TYPE }}  </h4></div>
                    <div class="mt-2"><h3 style=""> {{ (aptRank.DEPOSIT / 10000).toFixed(0)}}만 / {{ (aptRank.PRICE / 10000).toFixed(0) }}만  </h3></div>
                    
                    <div class="mt-2"><h3 style="">{{ aptRank.AREA }}m² / {{ aptRank.RELEVANT_FLOOR }}층  </h3></div>
                    
                    <div class="mt-2"><h4 style="color:gray;"> {{ aptRank.SALES_CONT }} </h4></div>
                  </v-col>
                </v-row>
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
  props: ['rankList', 'ranklength', 'cnt', 'selectdong'],
  beforeMount() {
    // this.selectdong = this.rankList[0].ADDRESS.split(' ')[2];
    // console.log("주소", this.rankList[0].ADDRESS.split(' ')[2])
    console.log("ddd"+this.rankList)
  },
  
  data() {
    return {
      trans: {},
      rpdialog: false,
      select: '',
      reportCont: '',
      // selectdong: '',
    }
  },

  methods: {

    viewOneInfo(aptRank){
      
      this.$parent.$parent.$children.find(e => e.$el.classList.contains('map_wrap')).map.setLevel(3);
      this.$parent.$parent.$children.find(e => e.$el.classList.contains('map_wrap')).map.setCenter(new kakao.maps.LatLng(aptRank.SALES_LAT, aptRank.SALES_LNG));

      this.$root.$emit('centerOne', aptRank.NORSALES_NUM);

    },
    viewDetail(salesNum) {
      this.trans.norSalesNum = salesNum;
      this.trans.page = 'info';
      this.$emit('receivedPage', this.trans);
    }
  }




}

</script>

<style scoped>
 
</style>