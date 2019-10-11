<template>
  <div>
    <HomeMenu />
    <div>
      <v-container>
        <v-row>
          <v-col @click="board = 'NewsList'">뉴스</v-col>
          <v-col @click="board = 'NoticeList'">공지사항</v-col>
        </v-row>
      </v-container>
      <component :is="board" />
    </div>
  </div>
</template>

<script>
import HomeMenu from '@/components/HomeMenu.vue';

export default {
  props: [
    'name',
  ],
  data() {
    return {
      board: this.$route.params.name || 'NewsList',
    }
  },
  components: {
    HomeMenu,
    NewsList: () => import('@/components/NewsList.vue'),
    NoticeList: () => import('@/components/NoticeList.vue'),
  }
}
</script>

<style>

</style>