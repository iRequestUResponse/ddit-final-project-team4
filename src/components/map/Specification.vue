<template>
  <v-container id="specification" class="pa-0 ma-0">
    <v-row class="juk-map_toparea pa-0 ma-0">
      <router-link class="logo pa-4" to="/">죽방</router-link>
    </v-row>
    <component
      :is="mapPage"
    />
    <v-row class="pa-0 ma-3">
      <v-row justify="center" class="titleRow pa-5">
        <v-col cols=12 class="text-center">
        <h1>{{ info.APT_NAME }}</h1>
        </v-col>
        <v-col cols=12 class="text-center">       
        <h4>주소 : {{ info.APT_ADDR }}</h4>
        </v-col>
      </v-row>
      
      <v-row class="mt-4 ml-3">
        <v-col>
          <div>
        <h4>{{ info.COMPLETION_DATE.substring(0,4) }}년 완공</h4>
          </div>
        </v-col>
        <v-spacer/>
        <v-col>
          ★점수
        </v-col>
      </v-row>
    </v-row>
    <hr id = "hrstyle">

    <!-- 가격 -->
    <v-row class="ma-0">
      <v-col>
        <v-row>
          <v-col>
            <h3 class="text-right" style="color:rgb(21,101,250)">최근 실거래 기준 1개월 평균</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1 class="display-3 text-left" style="color:rgb(21,101,250)"> ￦</h1>
          </v-col>
          <v-spacer/>
            <div class="display-3 text-right" style="color:rgb(21,101,250)">{{ this.avgPrice | comma }}</div>
        </v-row>
        <hr>
        <v-row>
          <v-col>
            <h3 class="text-right">최근 1개월 매물 평균</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3 class="text-right">{{ this.salesPrice | comma }}</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <hr id = "hrstyle">
      <v-btn class="mt-5" id="btn" @click="salesListView">매물보기</v-btn><br/>

      <h3 class="ma-4">인기순위</h3>
    <v-row class="pa-0 ma-3">
      <v-row class="text-center">
        <v-col>
            <h4>총 단지 중<br></h4>
            <h2 style="color:rgb(21,101,250)">00동 00위</h2>
        </v-col>
        <hr>
        <v-col>
            <h4>총 단지 중<br></h4>
            <h2 style="color:rgb(21,101,250)">00구 00위</h2>
        </v-col>
      </v-row>
    </v-row>
    <hr>
    {{ info }}
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

        console.log("찍혀라" , this.populaptList)
      })();

      // for(let i; i < this.populaptList[0].length(); i++){

      // }

    });

  },
  data() {
    return {
      info: {},
      mapPage: '',
      aptNo: 0,
      avgPrice: 0,
      salesPrice: 0,
      addr: '',
      populaptList: [],
    }
  },
  filters: {
    // 10898 -> 1억 0,898
    comma(value) {
        let num = new Number(value);

        let str = '';

        if (value >= 10000) {
          str = Math.floor(value / 10000) + '억';
          value %= 10000;
        }

        if (value > 0) {
          str += ` ${(value + '').replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,")}만`;
        }

        if (num == 0) {
          str = '0';
        }
        console.log(str)
        return str;
    }
  },
  components: {
    ReviewMain: () => import('@/components/map/review/ReviewMain'),
  },
  methods: {
    salesListView(){

    }
  }
}
</script>

<style scoped>
* {
   font-family: 'ON-IGothic';
}
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
.titleRow {
  background: rgb(21,101,250);
  color: white;
}

#hrstyle {
  height: 5px;
  background: lightgray;
  border : none;
}

#btn{
    width: 90%;
    height: 50px;
    margin-left: 20px;
    margin-bottom: 20px;
    background: rgb(21,101,250);
    margin-top: 10px;
    font-weight: bold;
    font-size: 1.4em;
    color: white;
    border-radius: 10px;
}
</style>