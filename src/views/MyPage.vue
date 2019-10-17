<template>
  <v-app>
    <HomeMenu />
    <v-container fluid class="white">
      <v-layout column>
        <v-flex>
          <v-row 
            align="center"
            justify="center"
            style="height: 300px;"
          >
            <p class="juk_mypage-title">마이페이지</p>
          </v-row>
          <v-row>
            <v-col align="center" @click="ConvertMyPage('SalesInterest')">
              <div>관심목록</div>
            </v-col>
            <v-col align="center" @click="ConvertMyPage('ModifyUser')">
              <div>개인정보수정</div>
            </v-col>
            <v-col align="center" @click="ConvertMyPage('DetailsInquiry')">
              <div>내역조회</div>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex>
          <component 
            :is="mypage"
            :aptNum="aptSalesNum"
            @receivedPage="viewSalesInterest"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style>
  .juk_mypage-title {
    font-size: 32pt;
  }
</style>

<script>
import HomeMenu from '@/components/common/HomeMenu';

export default {
  beforeMount() {
    window.addEventListener('popstate', e => {
      this.mypage = this.$route.params.mypagemenu;
    })
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
  },
  methods: {
    ConvertMyPage(page) {
      if (this.mypage !== page) {
        this.$router.push(`/mypage/${page}`);
      }
      this.mypage = page;
    },
    viewSalesInterest(convertPage) {
      this.aptSalesNum = convertPage.aptSalesNum;
      this.mypage = convertPage.page;
    }
  },
}
</script>