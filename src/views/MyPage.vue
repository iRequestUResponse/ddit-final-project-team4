<template>
  <v-app>
    <HomeMenu />
    <v-container 
      fluid 
      class="pa-00 white "
      fill-height
    >
      <v-layout column>
        <div class="pa-0">
          <v-row 
            align="center"
            justify="center"
            style="height: 200px;"
            class="ma-0 "
          >
            <v-icon size="50" icon color="rgb(18,98,249)" id="offertitle">face</v-icon>&nbsp;&nbsp;
            <h1 id="myh1">마이페이지</h1>
          </v-row>
          <v-row class="ma-0" justify="center">
            <v-col class="pa-0 mb-10" cols="10">
              <v-tabs
                color="rgb(18,98,249)"
                background-color="transparent"
                height="76"
                slider-size="4"
                grow
              >
                <v-tab class="headline bottom-border" @click="ConvertMyPage('SalesInterest')">관심목록</v-tab>
                <v-tab class="headline bottom-border" @click="ConvertMyPage('DetailsInquiry')">내역조회</v-tab>
                <v-tab class="headline bottom-border" @click="ConvertMyPage('ModifyUser')">개인정보수정</v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </div>
        <div class="px-0">
          <v-row class="pa-0 ma-0" justify="center">
            <v-col class="pa-0" cols="10">
              <component 
                :is="mypage"
                :aptNum="aptSalesNum" 
                @receivedPage="switchScreen"
              />
            </v-col>
          </v-row>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import HomeMenu from '@/components/common/HomeMenu';

export default {
  beforeMount() {
    window.addEventListener('popstate', e => {
      this.mypage = this.$route.params.mypagemenu;
    });
  },
  data() {
    return {
      mypage: this.$route.params.mypagemenu || 'SalesInterest',
      aptSalesNum: 0,
    }
  },
  components: {
    HomeMenu,
    SalesInterest: () => import('@/components/mypage/SalesInterest'),
    ModifyUser: () => import('@/components/mypage/ModifyUser'),
    DetailsInquiry: () => import('@/components/mypage/DetailsInquiry'),
    SalesDetail: () => import('@/components/mypage/SalesDetail'),
    CompareSales: () => import('@/components/mypage/CompareSales'),
    SalesNorDetail: () => import('@/components/mypage/SalesNorDetail'),
    CompareNorSales: () => import('@/components/mypage/CompareNorSales'),
  },
  methods: {
    ConvertMyPage(page) {
      if (this.mypage !== page) {
        this.$router.push(`/mypage/${page}`);
      }
      this.mypage = page;
    },
    switchScreen(convertPage) {
      this.aptSalesNum = convertPage.aptSalesNum;
      this.mypage = convertPage.page;
    }
  },
}
</script>

<style>
  .bottom-border {
    border-bottom: 1px solid #aeaeae;
  }
  #myh1{
    margin-right: 40px;
  }
</style>