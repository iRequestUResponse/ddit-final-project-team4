<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row class="pa-5 ma-0 titleRow">
      <v-row>
        <v-col cols=12 class="text-center">
          <h1>{{ info.APT_NAME }}</h1>
        </v-col>
      </v-row>
      <v-col cols=12 class="text-center">
        <h3>주소 : {{ info.APT_ADDR }}</h3>
      </v-col>
    </v-row>

    <v-row class="mx-0 px-2" align="center">
      <v-col cols="4">
        <div>
          {{ info.COMPLETION_DATE.substring(0,4) }}년 완공
        </div>
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <div class="text-right">
          <v-btn icon color="yellow darken-3" @click="showReview">
            <v-icon large>star</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="2">
        <div>
          <h4 class="title">{{ rating }}</h4>
        </div>
      </v-col>
    </v-row>

    <hr id="hrstyle">

    <!-- 가격 -->
    <v-row class="mx-0 pa-0">
      <v-col cols="12">
        <v-row>
          <v-col>
            <h3 class="text-right" style="color:rgb(21,101,250)">최근 실거래 기준 1개월 평균</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1 class="display-3 text-left" style="color:rgb(21,101,250)"> ￦</h1>
          </v-col>
          <v-spacer />
          <h1 class="display-3 text-right" style="color:rgb(21,101,250)">{{ this.avgPrice | comma }}</h1>
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
    <hr id="hrstyle">
    <v-btn class="mt-5" id="btn" @click="salesListView">매물보기</v-btn><br />

    <h3 class="ma-4">인기순위</h3>
    <v-row class="pa-0 ma-3">
      <v-row class="text-center">
        <v-col>
          <h4>총 {{this.populaptDongList.length}} 단지 중<br></h4>
          <h2 style="color:rgb(21,101,250)">{{ this.dong }} {{ this.rankDong }}위</h2>
        </v-col>
        <hr>
        <v-col>
          <h4>총 {{this.populaptList.length}} 단지 중<br></h4>
          <h2 style="color:rgb(21,101,250)">{{ this.gu }} {{ this.rank }}위</h2>
        </v-col>
      </v-row>

      <!-- chartJs -->
      <br>
      <v-row class="mt-5">
      <div class="small">
        <h3 class="ml-1">실거래가 변동</h3>(기간 : 2018년1월1일 - 2019년9월31일)
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
      </v-row>
      <v-row>
      <div class="small">
        <h3 class="ml-1">거래건수</h3>(기간 : 2018년1월1일 - 2019년9월31일)
        <bar-chart height='200px' :chart-data="datacollection1"></bar-chart>
      </div>
      </v-row>
      
    </v-row>
  </v-container>
</template>

<script>
import LineChart from './LineChart.js'
import BarChart from './BarChart.js'

  export default {
    components: {
      LineChart,
      BarChart
    },
    props: ['data', 'options'],
    beforeMount() {
      this.$parent.$parent.$on('selectApt', event => {
        
        // 시작
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

        // 리뷰 별점
        (async () => {
          this.rating = (await axios({
            url: `${this.serverLocation}/getAptAvgScore?seq=${this.info.APT_SEQ}`
          })).data.SCORE || 0;
        })();

        // 인기순위 정하기(구별)
        (async () => {
          this.populaptList = (await axios({
            url: `${this.serverLocation}/getPopulApt?addr=${ this.addr }`
          })).data;

          // console.log("찍혀라", this.populaptList.length)  -> 182

          // 순위 정하기
          
          let cnt = 0;
          for (let e of this.populaptList) {
            if (e.APT_ADDR === this.addr) {
              cnt = e.CNT;
              break;
            }
          }
          for (let i = 0; i < this.populaptList.length; i++) {
            if (this.populaptList[i].CNT === cnt) {
              this.rank = i + 1;
              this.gu = this.populaptList[i].GU;
              break;
            }
          }
        })();
        
        // 인기순위 정하기(동별)
        (async () => {
          this.populaptDongList = (await axios({
            url: `${this.serverLocation}/getPopulAptDong?addr=${ this.addr }`
          })).data;
          
          for (let i = 0; i < this.populaptDongList.length; i++) {
            if (this.populaptDongList[i].APT_ADDR === this.addr) {
              this.rankDong = this.populaptDongList[i].RANK;

              this.dong = this.populaptDongList[i].DONG;
              break;
            }
          }
        })();

        // chartJs메서드
        (async () => {
          this.chartPrice = (await axios({
            url: `${this.serverLocation}/getChartPrice?aptNo=${ this.aptNo }`
          })).data;

          console.log("차트값가져오기",this.chartPrice)

          // for(let i = 0; i < this.chartPrice.length; i++){
          //   this.chartX = this.chartPrice[i].MON;
          //   this.chartY = this.chartPrice[i].AVGPRICE;
          // }

          let priceList = this.chartPrice.map(e => e.AVGPRICE);
          let month = this.chartPrice.map(e => e.MON);
          
          this.datacollection = {
            
            // x축(월)
            labels: month,
            
            datasets: [
              {
                // 제목
                label: '실거래가',
                // color
                borderColor: '#f87979',
                backgroundColor: 'rgba(255,255,255,0.1)',

                data: priceList,
              },
            ],
            options: {
              responsive: false,
              scales: {
                xAxes: [{
                  type: 'category',
                }],
                yAxes: [{
                    type: 'y축',
                    ticks: {
                      max: 50000,
                      min: 10000,
                      stepSize: 10000,
                      beginAtZero: true,
                    }
                }]
              }
            }
           
          }

        })();

        // BarChartJs메서드
        (async () => {
          this.BarchartPrice = (await axios({
            url: `${this.serverLocation}/getAptGunsu?aptNo=${ this.aptNo }`
          })).data;

          console.log("바차트값가져오기",this.BarchartPrice)

          let GunsuList = this.BarchartPrice.map(e => e.CNT);
          let month = this.BarchartPrice.map(e => e.MON);

          console.log("GunsuList", GunsuList)
          console.log("month", month)

          this.datacollection1 = {

            // x축(월)
            labels: month,

            datasets: [
              {
                // 제목
                label: '건수',
                // color
                borderColor: 'rgb(21,101,250)',
                backgroundColor: 'rgb(21,101,250)',
                barThickness: '15',
                maxBarThickness: '15',
                data: GunsuList,
              },
            ],
             options: {
              responsive: false,
              scales: {
                  xAxes: [{
                      ticks: {
                        stepSize: 10,
                      }
                  }], 
                  yAxes: [{
                    ticks: {
                      max: 50,
                      min: 0,
                      stepSize: 5,
                      beginAtZero: true,
                    }
                  }]
              }
            }
          }
        })();



      });

    },
    data() {
      return {
        info: {},
        trans: {},
        aptNo: 0,
        avgPrice: 0,
        salesPrice: 0,
        addr: '',
        populaptList: [],
        populaptDongList: [],
        rating: 0,
        rank: 0,
        rankDong: 0,
        gu: '',
        dong: '',
        datacollection: null,
        chartPrice: [],
        chartX: [],
        chartY: [],
        BarchartPrice: [],
        datacollection1: null,
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
    methods: {
     salesListView() {
        this.trans.aptSalesNum = this.aptNo;
        this.trans.page = 'AptSalesList';
        
        this.$emit('receivedPage', this.trans);
    },
    showReview() {
        this.trans.aptSalesNum = this.aptNo;
        this.trans.page = 'ReviewMain';
        
        this.$emit('receivedPage', this.trans);
      },
  
    }
  }
</script>

<style scope>
  * {
    font-family: 'ON-IGothic';
  }

  .titleRow {
    background: rgba(21, 101, 250);
    color: white;
  }

  #hrstyle {
    height: 5px;
    background: lightgray;
    border: none;
  }

  #btn {
    width: 90%;
    height: 50px;
    margin-left: 20px;
    margin-bottom: 20px;
    background: rgb(21, 101, 250);
    margin-top: 10px;
    font-weight: bold;
    font-size: 1.4em;
    color: white;
    border-radius: 10px;
  }

  .bor {
    border: 1px solid black;
  }
  .small {
    width: 100%;
    margin: 10px;
  }
  .small1 {
    max-height: 50px;
  }

</style>