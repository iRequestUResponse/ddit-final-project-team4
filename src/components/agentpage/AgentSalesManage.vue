<template>
  <v-container>
    <v-row 
      align="center"
      justify="center"
      style="height: 260px;"
      class="ma-0 "
    >
      <p class="display-2 black--text">매물관리</p>
    </v-row>

    <v-row>
        <div>
        <v-row>
          <v-col cols="1">
            <v-icon large color="grey darken-4">apartment</v-icon>
          </v-col>
          <v-col cols="9" class="ml-6">
            <h2> 아파트&nbsp;&nbsp;&nbsp; </h2>
          </v-col>
        </v-row>
      </div>
    </v-row>
    <v-row v-if="this.salesList.length === 0" class="juk-empty_content" align="center">
        <v-col>
            <div class="title text-center" style="cursor:pointer"><h3 @click="sendPage('AgentSalesRegister')">등록된 아파트가 없습니다. <br> 지금 바로 등록하기!!! </h3></div>
        </v-col>
    </v-row>
    <v-row v-else class="mx-0 mb-10">
      <v-col 
        v-for="sales in salesList"
        :key="sales.APTSALES_NUM"
        cols="3"
        class="text-right pa-2"
      >
        <v-card outlined>
           <v-btn id="deletebtn" icon color="pink accent-1" @click="deleteY(sales.APTSALES_NUM)">
             <v-icon id="deleteicon" size="50">cancel_presentation</v-icon>
           </v-btn>
          <v-img
            :src="`${fileServer}/file/${sales.PHOTO_PATH}`"
            height="200px"
          />

            <div @click="viewAptSales(sales.APTSALES_NUM)">
              <v-card-title>
                <div>{{ sales.SALES_TITLE.substring(0,18) }}</div>
              </v-card-title>
              <v-card-text>
                <div>{{ sales.PYEONG }}평 {{ sales.RELEVANT_FLOOR }}층/{{ sales.WHOLE_FLOOR }}층</div>
                <div>{{ sales.APT_NAME }} {{ sales.DONG }}</div>
                <div>{{ sales.SALES_CONT.substring(0,30) }}</div>
              </v-card-text>
            </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <div>
        <v-row>
          <v-col cols="1">
            <v-icon large color="grey darken-4">home_work</v-icon>
          </v-col>
          <v-col cols="9" class="ml-6">
            <h2>원룸/투룸</h2>
          </v-col>
        </v-row>
      </div>
    </v-row>
    <v-row v-if="this.norSalesList.length === 0" class="juk-empty_content" align="center">
      <v-col>
        <div class="title text-center" style="cursor:pointer"><h3 @click="sendPage('AgentSalesRegister')">등록된 원룸/투룸이 없습니다. <br> 지금 바로 등록하기!!! </h3></div>
      </v-col>
    </v-row>
    <v-row v-else class="mx-0 mb-10">
      <v-col 
        v-for="norSales in norSalesList"
        :key="norSales.NORSALES_NUM"
        cols="3"
        class="text-right pa-2"
      >
        <v-card outlined>
        <v-btn id="deletebtn1" icon color="pink accent-1" @click="deleteY1(norSales.NORSALES_NUM)">
             <v-icon id="deleteicon" size="50">cancel_presentation</v-icon>
           </v-btn>
          <v-img
            :src="`${fileServer}/file/${norSales.PHOTO_PATH}`"
            height="200px"
          />

          <div @click="viewNorSales(norSales.NORSALES_NUM)">
            <v-card-title>
              <div>{{ norSales.SALES_TITLE.substring(0,20) }}</div>
            </v-card-title>
            <v-card-text>
              <div>{{ norSales.AREA }}평 {{ norSales.RELEVANT_FLOOR }}층/{{ norSales.WHOLE_FLOOR }}층</div>
              <div>{{ norSales.ADDRESS.substring(0,30) }}</div>
              <div>{{ norSales.SALES_CONT.substring(0,30) }}</div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 매물등록 버튼 -->
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      fixed
      width="80px"
      height="80px"
      color="juk-color"
      class="juk-btn_position "
      @click="sendPage('AgentSalesRegister')"
    >
      <v-icon x-large>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  beforeMount() {
    (async () => {
      this.salesList = (await axios({
        url: `${this.serverLocation}/getAgentAptSalesList`
      })).data;
      
      this.norSalesList = (await axios({
        url: `${this.serverLocation}/getAgentNorSalesList`
      })).data;
    })();
  },
  data() {
    return {
      salesList: [],
      norSalesList: [],
      trans: {},
    }
  },
  methods: {
    sendPage(e) {
      this.$emit('agtPage', e);
    },
    viewAptSales(aptSalesNum) {
      this.trans.offerhouse_seq = aptSalesNum;
      this.trans.page = 'AgentAptSalesDetail';
      
      this.$emit('receivedPage', this.trans);
    },
    viewNorSales(SalesNum) {
      this.trans.offerhouse_seq = SalesNum;
      this.trans.page = 'AgentNorSalesDetail';
      
      this.$emit('receivedPage', this.trans);
    },
    deleteY(seq){

      this.$swal({

        title: '삭제하시겠습니까?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',

      }).then((result) => {
        if (result.value) {
          axios({
            url: `${this.serverLocation}/deleteSales?seq=${seq}`,
          })
          .then(res => {
            console.log(res.data);

            if (res.data) {
              (async () => {
                this.salesList = (await axios({
                  url: `${this.serverLocation}/getAgentAptSalesList`
                })).data;
              })();

              this.$swal(
                '삭제성공!',
                '삭제가 완료되었습니다.',
                'success'
              )
            } else {
              this.$swal('삭제할 수 없습니다.', ' ', 'error');
            }
          })
        }
      })
    },
    
    deleteY1(seq){

      this.$swal({

        title: '삭제하시겠습니까?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',

      }).then((result) => {
        if (result.value) {
          axios({
            url: `${this.serverLocation}/deleteone?seq=${seq}`,
          })
          .then(res => {
            console.log(res.data)
            if (res.data) {
              (async () => {
                this.norSalesList = (await axios({
                  url: `${this.serverLocation}/getAgentNorSalesList`
                })).data;
              })();

              this.$swal(
                '삭제성공!',
                '삭제가 완료되었습니다.',
                'success'
              )
            } else {
              this.$swal('삭제할 수 없습니다.', ' ', 'error');
            }
          })
        }
      })
    },

  }

}
</script>

<style>
  .juk-empty_content {
    height: 384px;
  }

  .juk-color {
    background-color: #1564f9 !important;
  }

  .juk-btn_position {
    bottom: 50px !important;
    right: 50px !important;
  }
  #deletebtn, #deletebtn1{
    border-radius: 30px;
    width: 50px;
  }
</style>