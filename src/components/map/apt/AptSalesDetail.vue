<template>
  <v-container fluid class="pa-0 ma-0 overflow-y-auto" style="height: 90vh">
    <v-row class="pa-0 mx-0 titleRow">
      <v-col cols=12 class="text-center">
        <div class="display-1 white--text">{{ aptsale.APT_NAME }}</div>
      </v-col>
      <v-col cols=12 class="text-center">
        <div class="subtitle grey--text">{{ aptsale.APT_ADDR }}</div>
      </v-col>
    </v-row>

    <v-row class="mx-0 px-4 py-2" align="center">
      <v-col cols="12" class="pa-0 ma-0">
        <div>
          {{ aptsale.COMPLETION_DATE.substring(0,4) }}년 완공
        </div>
      </v-col>
      <v-col cols="12" class="pa-0 ma-0">
        <div>
          {{ aptsale.AVAILABILITY_DATE }}부터 입주가능
        </div>
      </v-col>
    </v-row>

    <hr id="hrstyle">

    <v-row>
      <v-carousel class="carousel" cycle hide-delimiter-background height="300">
        <v-carousel-item v-for="(photos,i) in aptsale.photolist" :key="i" width="100%"
          :src="`//192.168.0.121:9000/api/file/${photos.PHOTO_PATH}`"/>
      </v-carousel>
    </v-row>

    <!-- 가격 -->
    <v-row class="mx-0 pa-0">
      <v-col cols="12">
        <v-row>
          <v-col class="pa-0 pr-3">
            <div class="headline text-right" style="color:rgb(21,101,250)">{{ aptsale.SALES_TYPE }}</div>
          </v-col>
        </v-row>
        <v-row class="pl-4 pr-2 py-2">
          <div class="display-2 text-left" style="color:rgb(21,101,250)">
            ￦
          </div>
          <v-spacer />
          <div class="display-2 text-right" style="color:rgb(21,101,250)">
            {{ aptsale | comma }}
          </div>
        </v-row>
        <hr>
        <v-row class="my-6">
          <v-col cols="12" class="pa-0 pr-3">
            <h3 class="text-right">최근 1개월 매물 평균</h3>
          </v-col>
          <v-col cols="12" class="pa-0 pr-3">
            <h3 class="text-right">{{ salesPrice | comm }}</h3>
          </v-col>
        </v-row>
        <v-row class="mt-4 mb-0">
          <v-col cols="4" class="juk-divide_right py-1">
            <div class="caption">면적(평)</div>
            <div class="headline text-center">{{ aptsale.PYEONG }}</div>
          </v-col>
          <v-col cols="4" class="juk-divide_right py-1">
            <div class="caption">층(해당층/전체층)</div>
            <div class="headline text-center">{{ aptsale.RELEVANT_FLOOR }}/{{ aptsale.WHOLE_FLOOR }}</div>
          </v-col>
          <v-col cols="4" class="py-1">
            <div class="caption">방향</div>
            <div class="headline text-center">{{ aptsale.DIRECTION }}</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="subtitle">
              {{ aptsale.SALES_CONT }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <hr id="hrstyle">

    <h3 class="ma-4">관리비</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <v-col cols="12" class="pa-0 pl-6">
        <div class="display-1" style="color:rgb(21,101,250)">{{ aptsale.UTILITY_COST | commanor }}원<span
            class="title grey--text">(난방비 제외)</span></div>
      </v-col>
    </v-row>

    <hr id="hrstyle">

    <v-btn class="mt-5" id="btn" color="juk-blue">문의하기</v-btn>
    <v-btn class="mt-0 mb-5" id="btn" color="juk-red">신고하기</v-btn>
  </v-container>
</template>

<script>
  export default {
    props: ['aptNum'],
    beforeMount() {
      this.$parent.$parent.$on('selectApt', event => {
        if (event != null) {
          this.trans.aptSalesNum = 0;
          this.trans.page = 'AptInfo';
          this.$emit('receivedPage', this.trans);
        }
      });

      (async () => {
        // 매물의 상세데이터 가져오기
        let result = (await axios({
          url: `${this.serverLocation}/mpGetAptSalesDetail?aptNum=${this.aptNum}`
        })).data;

        // 매물에 대한 1개월 평균값 가져오기
        this.salesPrice = (await axios({
          url: `${this.serverLocation}/getSalesPrice?aptNo=${ result.APT_SEQ }`
        })).data;

        let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e =>
          new Date(e));
        result.COMPLETION_DATE =
          `${completeionDate.getFullYear()}.${completeionDate.getMonth() + 1}.${completeionDate.getDate()}`;
        result.AVAILABILITY_DATE =
          `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;

        this.aptsale = result;
      })();
    },
    filters: {
      comma(sales) {
        let price = sales.PRICE;

        let result = '';
        if (price > 100000000) {
          result += `${Math.floor(price / 100000000)}억 `;
          price %= 100000000;
        }
        if (price > 10000) {
          result += `${Math.floor(price / 10000)}만 `
          price %= 10000;
        }
        if (price > 0) {
          result += `${price}`
        }

        return `${result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${sales.DEPOSIT ? '/월' : ''}`;

        // var num = new Number(sales);

        // if(num == 0){
        //     return '';   
        // }else{
        //     return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,");
        // }
      },
      commanor(value) {
        let price = new Number(value);

        let result = '';
        if (price > 10000) {
          result += `${Math.floor(price / 10000)}만`
          price %= 10000;
          if (price > 0) result += ` ${(price + '').replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,")}`;

          return result
        }
        if (price > 0) {
          return `${(price + '').replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,")}`;
        }
        if (price == 0) {
          return 0;
        }
      },
      comm(value) {
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
        return str;
      }
    },
    data() {
      return {
        trans: {},
        aptsale: {},
        salesPrice: 0,
      }
    },
    methods: {

    }
  }
</script>

<style>
  .titleRow {
    background: rgb(21, 101, 250);
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
    margin-top: 10px;
    font-weight: bold;
    font-size: 1.4em;
    color: white;
    border-radius: 10px;
  }

  .juk-blue {
    background-color: rgb(21, 101, 250) !important;
  }

  .juk-red {
    background-color: rgba(255, 0, 0, 0.7) !important;
  }

  .juk-divide_right {
    border-right: 1px solid #AEAEAE;
  }

  .bor {
    border: 1px solid black;
  }
</style>