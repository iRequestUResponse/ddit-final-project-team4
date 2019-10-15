<template>
  <div>
    <HomeMenu />
    <div>
      <v-container>
        <v-row>
          <v-col @click="mypage = 'SalesInterest'">관심목록</v-col>
          <v-col @click="mypage = 'ModifyUser'">개인정보수정</v-col>
          <v-col @click="mypage = 'DetailsInquiry'">내역조회</v-col>
        </v-row>
      </v-container>
      <component :is="mypage" />
    </div>
  </div>
</template>

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
    SalesInterest: () => import('@/components/SalesInterest'),
    ModifyUser: () => import('@/components/ModifyUser'),
    DetailsInquiry: () => import('@/components/DetailsInquiry')
  }
}
</script>

<style>

</style>