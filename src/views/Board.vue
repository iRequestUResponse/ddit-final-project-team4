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
            <p class="display-2 black--text">게시판</p>
          </v-row>
          <v-row class="ma-0" justify="center">
            <v-col class="pa-0 mb-10" cols="10">
              <v-tabs
                v-model="board"
                color="black"
                background-color="transparent"
                height="76"
                slider-size="4"
                grow
              >
                <v-tab href="#NewsList" class="headline bottom-border" @click="ConvertBoard('NewsList')">뉴스</v-tab>
                <v-tab href="#NoticeList"  class="headline bottom-border" @click="ConvertBoard('NoticeList')">공지사항</v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </div>
        <div class="px-0">
          <v-row class="pa-0 ma-0" justify="center">
            <v-col class="pa-0" cols="10">
              <component 
                :is="board"
              />
            </v-col>
          </v-row>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import HomeMenu from '@/components/common/HomeMenu.vue';

export default {
  props: [
    'name',
  ],
  beforeMount() {
    console.log(this.$route.params.name);
  },
  data() {
    return {
      board: this.$route.params.name || 'NewsList',
    }
  },
  components: {
    HomeMenu,
    NewsList: () => import('@/components/board/NewsList.vue'),
    NoticeList: () => import('@/components/board/NoticeList.vue'),
  },
  methods: {
    ConvertBoard(page) {
      if (this.board !== page) {
        this.$router.push(`/board/${page}`);
      }
      this.board = page;
    },
  }
}
</script>

<style>
  .bottom-border {
    border-bottom: 1px solid #aeaeae;
  }
</style>