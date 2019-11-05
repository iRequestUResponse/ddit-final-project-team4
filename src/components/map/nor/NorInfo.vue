<template>
  <v-container fluid class="pa-0 ma-0 overflow-y-auto overflow-x-hidden" style="height: 100vh">
    <v-row class="pa-0 py-4 mx-0 amber">
      <v-btn icon class="ml-4" @click="showPopularList">
        <v-icon large>arrow_back</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-show="this.onUser != 'noUser'" icon class="mr-4" @click="insertInterest">
        <v-icon large>notifications</v-icon>
      </v-btn>
    </v-row>
    <v-row class="pa-0 mx-0 pb-6 amber">
      <v-col cols=12 class="text-center pa-0 mb-2">
        <div class="headline">{{ norData.SALES_TITLE }}</div>
      </v-col>
      <v-col cols=12 class="text-center pa-0">
        <div class="subtitle">{{ norData.ADDRESS }}</div>
      </v-col>
    </v-row>
    <v-row class="mx-0 px-4 py-2" align="center">
      <v-col cols="6" class="pa-0 ma-0">
        <div>
          {{ norData.COMPLETION_DATE }}년 완공
        </div>
        <div>
          {{ norData.AVAILABILITY_DATE }}부터 입주가능
        </div>
      </v-col>
      <v-spacer/>
      <v-col cols="2">
        <div class="text-right">
          <v-btn icon color="deep-orange" @click="showReview">
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

    <v-row>
      <v-carousel class="carousel" cycle hide-delimiter-background height="300">
        <v-carousel-item v-for="(photos,i) in norData.photolist" :key="i" width="100%"
          :src="`${fileServer}/file/${photos.PHOTO_PATH}`" />
      </v-carousel>
    </v-row>

    <!-- 가격 -->
    <v-row class="mx-0 pa-0">
      <v-col cols="12" class="pb-0">
        <v-row>
          <v-col class="pa-0 pr-3">
            <div class="headline text-right deep-orange--text">{{ norData.SALES_TYPE }}</div>
          </v-col>
        </v-row>
        <v-row class="pl-4 pr-2 py-2">
          <div class="display-2 text-left deep-orange--text">
            ￦
          </div>
          <v-spacer />
          <div class="display-2 text-right deep-orange--text">
            {{ norData.PRICE | commanor }}
          </div>
        </v-row>
        <hr>
        <v-row v-show="norData.DEPOSIT > 0" class="my-6">
          <v-col cols="12" class="pa-0 pr-3">
            <h3 class="text-right">보증금</h3>
          </v-col>
          <v-col cols="12" class="pa-0 pr-3">
            <h3 class="text-right">{{ norData.DEPOSIT | commanor }}원</h3>
          </v-col>
        </v-row>
        <v-row class="mt-4 mb-0">
          <v-col cols="3" class="juk-divide_right py-1">
            <div class="caption">면적(평)</div>
            <div class="headline text-center">{{ norData.AREA }}</div>
          </v-col>
          <v-col cols="4" class="juk-divide_right py-1">
            <div class="caption">층(해당층/전체층)</div>
            <div class="headline text-center">{{ norData.RELEVANT_FLOOR }}/{{ norData.WHOLE_FLOOR }}</div>
          </v-col>
          <v-col cols="5" class="py-1">
            <div class="caption">구조</div>
            <div class="headline text-center">{{ norData.STRUCTURE }}</div>
          </v-col>
        </v-row>

        <v-row class="pa-2">
          <v-col cols="12">
            <div class="subtitle">
              {{ norData.SALES_CONT }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <hr id="hrstyle">

    <h3 class="ma-4">관리비</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <v-col cols="12" class="pa-0 pl-6">
        <div class="display-1 deep-orange--text">{{ norData.UTILITY_COST | commanor }}원<span
            class="title grey--text">(난방비 제외)</span></div>
      </v-col>
    </v-row>

    <hr id="hrstyle">

    <h3 class="ma-4">옵션</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <v-col v-for="option in norData.optionlist" :key="option.OPTION_SEQ" cols="12" sm="3" md="3">
        <v-row justify="center">
          <v-icon large>{{ optionIconMapping[option.OPTION_CODE]}}</v-icon>
        </v-row>
        <v-row justify="center">
          <div class="body-2">{{ optionMapping[option.OPTION_CODE] }}</div>
        </v-row>
      </v-col>
    </v-row>

    <hr id="hrstyle">
    
    <!-- <h3 class="ma-4">넘어온 값</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <div>{{ norData }}</div>
    </v-row>

    <hr id="hrstyle">
    
    <h3 class="ma-4">넘어온 값(interestCheck)</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <div>{{ interestCheck }}</div>
    </v-row>

    <hr id="hrstyle">
    
    <h3 class="ma-4">넘어온 값(reportCheck)</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <div>{{ reportCheck }}</div>
    </v-row>

    <hr id="hrstyle">
    
    <h3 class="ma-4">넘어온 값(onUser)</h3>
    <v-row class="pa-0 ma-3 mb-6">
      <div>{{ onUser }}</div>
    </v-row> -->

    <v-btn v-show="this.onUser != 'noUser'" class="mt-5" id="btn" color="amber" @click="joinTest">문의하기</v-btn>
    <v-btn v-show="this.onUser != 'noUser'" class="mt-0 mb-5" id="btn" color="juk-red" @click="showReport">신고하기</v-btn>

    <!-- 신고하기 다이얼로그 및 버튼 -->
    <v-dialog v-model="rpdialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">신고하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4" class="pa-0 mt-4">
                <v-select v-model="select" :items="items" item-text="text" item-value="text"
                  :rules="[v => !!v || '선택하시오!!!']" label="신고사유" required>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-textarea label="상세내용" v-model="reportCont" auto-grow rows="1" row-height="15" />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="insertReport">작성</v-btn>
          <v-btn color="blue darken-1" text @click="rpdialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ['data', 'options', 'norData', 'interestCheck', 'reportCheck', 'onUser', 'rating', 'maptype'],
  data() {
    return {
      trans: {},
      rpdialog: false,
      select: '',
      reportCont: '',
      items: [{
          text: '허위매물'
        },
        {
          text: '나간매물'
        },
        {
          text: '기타'
        },
      ],
    }
  },
  filters: {
    datefmt(value) {
      return value.substring(0, 10);
    },
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
    },
  },
  methods: {
    async insertInterest() {
      if (this.interestCheck == 0) {
        await axios({
            url: `${this.serverLocation}/insertNorInterest`,
            method: 'POST',
            data: {
              num: this.norData.NORSALES_NUM,
            },
          })
          .then(res => {
            if (res.data === 1) {
              alert("등록이 완료되었습니다.");
              this.interestChecking();
            } else {
              console.log('데이터를 삭제하지 못함');
            }
          })
      } else {
        alert("이미 등록하셨습니다.");
      }
    },
    async insertReport() {
      await axios({
          url: `${this.serverLocation}/insertNorReport`,
          method: 'POST',
          data: {
            num: this.norData.NORSALES_NUM,
            rea: this.select,
            cont: this.reportCont,
          },
        })
        .then(res => {
          if (res.data === 1) {
            this.reportChecking();
            this.rpdialog = false;
          } else {
            console.log('데이터를 삽입하지 못함');
          }
        })
    },
    showReport() {
      if (this.reportCheck == 0) {

        this.rpdialog = true;
      } else {
        alert('이미 작성하셨습니다.');
      }
    },
    async reportChecking() {
      this.reportCheck = (await axios({
        url: `${this.serverLocation}/checkNorReport?num=${this.norData.NORSALES_NUM}`
      })).data;
    },
    async interestChecking() {
      this.interestCheck = (await axios({
        url: `${this.serverLocation}/checkNorInterest?num=${this.norData.NORSALES_NUM}`
      })).data;
    },
    showReview() {
      this.trans.norSalesNum = this.norData.NORSALES_NUM;
      this.trans.page = 'ReviewMain';
      
      this.$emit('receivedPage', this.trans);
    },
    showPopularList() {
      this.trans.norSalesNum = 0;
      this.trans.page = 'NorPopulSalesList';
      this.$emit('receivedPage', this.trans);
    },
    joinTest() {
      this.$store.dispatch('chatJoin', this.norData.AGENTID);
    },
  },
}
</script>

<style scoped>
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
    border-radius: 10px;
  }

  .juk-blue {
    background-color: rgb(21, 101, 250) !important;
  }

  .juk-blue--text {
    color: rgb(21, 101, 250) !important;
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