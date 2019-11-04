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
        <div class="title">
            <v-icon large color="grey darken-4">apartment</v-icon>
            아파트
        </div>
    </v-row>
    <v-row v-if="this.salesList.length === 0" class="juk-empty_content" align="center">
        <v-col>
            <div class="title text-center">내용이 없습니다.</div>
        </v-col>
    </v-row>
    <v-row v-else class="mx-0 mb-10">
      <v-col 
        v-for="sales in salesList"
        :key="sales.APTSALES_NUM"
        cols="3"
      >
        <v-card outlined>
          <v-img
            :src="`${fileServer}/file/${sales.PHOTO_PATH}`"
            height="200px"
          />

            <div @click="viewAptSales(sales.APTSALES_NUM)">
              <v-card-title>
                <div>{{ sales.SALES_TITLE.substring(0,10) }}...</div>
              </v-card-title>
              <v-card-text>
                <div>{{ sales.PYEONG }}평 {{ sales.RELEVANT_FLOOR }}층/{{ sales.WHOLE_FLOOR }}층</div>
                <div>{{ sales.APT_NAME }} {{ sales.DONG }}</div>
                <div>{{ sales.SALES_CONT.substring(0,18) }}...</div>
              </v-card-text>
            </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <div class="title">
        <v-icon large color="grey darken-4">home_work</v-icon>
        원룸/투룸
      </div>
    </v-row>
    <v-row v-if="this.norSalesList.length === 0" class="juk-empty_content" align="center">
      <v-col>
        <div class="title text-center">내용이 없습니다.</div>
      </v-col>
    </v-row>
    <v-row v-else class="mx-0 mb-10">
      <v-col 
        v-for="norSales in norSalesList"
        :key="norSales.NORSALES_NUM"
        cols="3"
      >
        <v-card outlined>
          <v-img
            :src="`${fileServer}/file/${norSales.PHOTO_PATH}`"
            height="200px"
          />

          <div @click="viewNorSales(norSales.NORSALES_NUM)">
            <v-card-title>
              <div>{{ norSales.SALES_TITLE.substring(0,10) }}...</div>
            </v-card-title>
            <v-card-text>
              <div>{{ norSales.AREA }}평 {{ norSales.RELEVANT_FLOOR }}층/{{ norSales.WHOLE_FLOOR }}층</div>
              <div>{{ norSales.ADDRESS.substring(0,18) }}...</div>
              <div>{{ norSales.SALES_CONT.substring(0,18) }}...</div>
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
</style>