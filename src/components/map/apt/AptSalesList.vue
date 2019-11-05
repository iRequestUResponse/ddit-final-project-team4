<template>
  <v-container fluid class="pa-0 ma-0 overflow-y-auto" style="height: 100vh">
    <v-row class="pa-0 mx-0 pa-4 pt-6 titleRow">
      <v-col cols=12 class="text-center pa-0 ma-0">
        <div class="display-1 white--text">매물리스트</div>
      </v-col>
    </v-row>
    <v-row v-if="this.salesList.length === 0">
      <v-col class="mt-12 pt-12">
        <div class="title text-center">매물이 없습니다.</div>
      </v-col>
    </v-row>
    <v-row v-else class="mx-0">
      <v-col cols="12" v-for="sales in salesList" :key="sales.APTSALES_NUM">
        <v-card outlined @click="viewSales(sales.APTSALES_NUM)">
          <v-img :src="`${fileServer}/file/${sales.PHOTO_PATH}`" height="200px" />

          <div>
            <v-card-title>
              <div>{{ sales.SALES_TITLE }}</div>
            </v-card-title>
            <v-card-text>
              <div>{{ sales.PYEONG }}평 {{ sales.RELEVANT_FLOOR }}층/{{ sales.WHOLE_FLOOR }}층</div>
              <div>{{ sales.APT_NAME }} {{ sales.DONG }}</div>
              <div>{{ sales.SALES_CONT.substring(0,24) }}...</div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: ['aptNum'],
    beforeMount() {
      this.$root.$on('selectApt', event => {
        if (event != null) {
          this.trans.aptSalesNum = 0;
          this.trans.page = 'AptInfo';
          this.$emit('receivedPage', this.trans);
        }
      });

      (async () => {
        this.salesList = (await axios({
          url: `${this.serverLocation}/getMapAptSalesList?seq=${this.aptNum}`
        })).data;
      })();
    },
    data() {
      return {
        trans: {},
        salesList: [],
      }
    },
    methods: {
      viewSales(aptSalesNum) {
        this.trans.aptSalesNum = aptSalesNum;
        this.trans.page = 'AptSalesDetail';

        this.$emit('receivedPage', this.trans);
      },
    }
  }
</script>

<style>
  .titleRow {
    background: rgb(21, 101, 250);
    color: white;
  }
</style>