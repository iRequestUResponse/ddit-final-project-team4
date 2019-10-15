<template>
  <div>
    <HomeMenu />

    <div class="wrapper">
      <section class="statistics">
        <div class="container">
          <div class="statistics--item">
            <img src="@/assets/img/jukdongsuk.png" alt="">
          </div>
          <div class="statistics--search">
            <input type="text">
            <button>찾아보기</button>
          </div>
        </div>
      </section>

      <section>
        <v-container>
          <v-row>
            <v-col>
              <div class="title">계약요령</div>
              <div class="content"></div>
            </v-col>
            <v-col>
              <div class="title">
                <span class="title">뉴스</span>
                <router-link to="/board/NewsList">더보기</router-link>
              </div>
              <div class="content">
                <div v-for="news in newsList" :key="news.originallink">
                  <a :href="news.originallink">{{ news.title }}</a>
                </div>
              </div>
            </v-col>
            <v-col>
              <div class="title">
                <span class="title">공지사항</span>
                <router-link to="/board/NoticeList">더보기</router-link>
              </div>
              <div class="content">
                <div v-for="notice in noticeList" :key="notice.NOTICE_SEQ">{{ notice.NOTICE_TITLE }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </div>
</template>

<script>
import HomeMenu from '@/components/common/HomeMenu.vue';
import axios from 'axios';

export default {
  beforeMount() {
    (async () => {
      this.noticeList = (await axios({
        url: `${this.$store.state.serverLocation}/noticeList`
      })).data;

      this.newsList = (await axios({
        url: `${this.$store.state.serverLocation}/newsList`
      })).data;
    })();
  },
  components: {
    HomeMenu,
  },
  data() {
    return {
      noticeList: [],
      newsList: [],
    }
  }
};
</script>
