<template>
  <v-app>
    <div class="slider-position">
      <HomeMenu />

      <v-carousel 
        cycle
        hide-delimiter-background
        height="800"
      >
        <v-carousel-item
          v-for="(slide,i) in slides"
          :key="i"
          :src="slide.src"
        >
          <v-sheet
            color="#00000088"
            height="100%"
            tile
          >
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div class="slider-text-position">
        <div class="display-2 white--text text-center">방을 검색해주세요</div>
        <div class="title white--text text-center mt-2 mb-4">죽방으로 원하는 방을 찾으세요</div>
        <v-text-field dark></v-text-field>
      </div>
    </div>
    <v-content>
      <section>
        <v-layout
          column
          wrap
          class="my-12"
          align-center
        >
          <v-flex xs12 style="width: 80%;">
            <v-container grid-list-xl>
              <v-layout row wrap align-start>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">News</div>
                    </v-card-title>
                    <div v-for="news in newsList" :key="news.originallink" class="d-flex justify-center">
                      <a :href="news.originallink" class="caption blue-grey--text nonAtag">{{ news.title.substring(0,30) }}...</a>
                    </div>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Notice</div>
                    </v-card-title>
                    <div class="content">
                      <div v-for="notice in noticeList" :key="notice.NOTICE_SEQ" class="d-flex caption blue-grey--text nonAtag justify-center">{{ notice.NOTICE_TITLE }}</div>
                    </div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
    </v-content>
<a class="offset-md-1 juk-menu" style="cursor: pointer" @click="showModal">우리집내놓기</a>
    <v-footer color="grey darken-4" height="50">
      <v-layout row wrap align-center style="margin: 0 10%;">
        <a href="#" class="footer-icons nonAtag"><v-icon class="grey--text">mdi-facebook</v-icon></a>
        <a href="#" class="footer-icons nonAtag"><v-icon class="grey--text">mdi-twitter</v-icon></a>
        <a href="#" class="footer-icons nonAtag"><v-icon class="grey--text">mdi-instagram</v-icon></a>
        <a href="#" class="footer-icons nonAtag"><v-icon class="grey--text">mdi-youtube</v-icon></a>
        <a href="#" class="footer-icons nonAtag"><v-icon class="grey--text">mdi-google-plus</v-icon></a>
        <v-spacer/>
        <a href="#" class="grey--text nonAtag">대덕인재개발원</a>
      </v-layout>
    </v-footer>
    <!-- <div class="wrapper">
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
    </div> -->
     <modal
      id="modal"
      v-show="isModalVisible"
      @close="closeModal"
    />
  </v-app>
</template>

<script>
import modal from '@/components/user/OfferHouseModal.vue';
import HomeMenu from '@/components/common/MainHomeMenu.vue';
import axios from 'axios';

export default {
  beforeMount() {
    (async () => {
      this.noticeList = (await axios({
        url: `${this.serverLocation}/noticeList`
      })).data;

      this.newsList = (await axios({
        url: `${this.serverLocation}/newsList?start=5`
      })).data;
    })();
  },
  components: {
    HomeMenu,
    modal,
  },
  data() {
    return {
      modalVisibility: false,
      isModalVisible: false,
      noticeList: [],
      newsList: [],
      slides: [
        {
          src: require('../assets/img/slider_01.png'),
        },
        {
          src: require('../assets/img/slider_02.jpg'),
        },
      ],
    }
  },
  methods:{
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    hideModal(event) {
      if (event.target === document.querySelector('#modal')) {
        this.isModalVisible = false;
      }
    },
  }
};
</script>

<style>
  .slider-position {
    position: relative;
  }

  .slider-text-position {
    width:60%;
    position: absolute;
    left:50%;
    top: 50%;
    transform:translate(-50%, -50%);
  }

  .nonAtag {
    text-decoration: none;
  }

  .footer-icons {
    margin: 0 12px;
  }

  .jukbor {
    border: 1px solid red;
  }
</style>