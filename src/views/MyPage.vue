<template>
  <v-app>
    <HomeMenu />
    <v-container fluid class="white">
      <v-layout column>
        <v-flex>
          <v-row>
            <v-col align="center" @click="mypage = 'SalesInterest'">
              <div>관심목록</div>
            </v-col>
            <v-col align="center" @click="mypage = 'ModifyUser'">
              <div>개인정보수정</div>
            </v-col>
            <v-col align="center" @click="mypage = 'DetailsInquiry'">
              <div>내역조회</div>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex>
          <component :is="mypage" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style>

</style>

<script>
import HomeMenu from '@/components/common/HomeMenu';

export default {
  data() {
    return {
      mypage: 'SalesInterest',
    }
  },
  components: {
    HomeMenu,
    SalesInterest: () => import('@/components/mypage/SalesInterest'),
    ModifyUser: () => import('@/components/mypage/ModifyUser'),
    DetailsInquiry: () => import('@/components/mypage/DetailsInquiry')
  }
}
</script>