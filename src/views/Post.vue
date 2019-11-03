<template>
  <v-app>
    <HomeMenu />
    <v-container 
      fluid 
      class="pa-0 white "
      fill-height
    >
      <v-layout column>
        <div class="pa-0">
          <v-row 
            align="center"
            justify="center"
            style="height: 300px;"
            class="ma-0 "
          >
            <p class="display-2 black--text">공지사항</p>
          </v-row>
        </div>
        <NoticeDetail />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import HomeMenu from '@/components/common/HomeMenu.vue';

export default {
  beforeMount() {
    console.log(this.$route.params.seq);
  },
  data() {
    return {
      board: this.$route.params.name || 'NewsList',
    };
  },
  computed: {
    noticeSeq() {
      return this.$route.params.seq;
    }
  },
  components: {
    HomeMenu,
    NoticeDetail: () => import('@/components/board/notice/NoticeDetail.vue'),
  }
}
</script>

<style>
  .bottom-border {
    border-bottom: 1px solid #aeaeae;
  }
</style>