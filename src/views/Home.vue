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
            color="#00000090"
            height="100%"
            tile
          >
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div class="slider-text-position">
        <div class="display-2 white--text text-center">어떤 아파트, 어떤 동네에서</div><br>
        <div class="display-2 white--text text-center">살고 싶으신가요?<br><br></div>
        <!-- <div class="title white--text text-center mt-2 mb-4">이제 죽방과 시작해보세요</div> -->
        <div>
          <v-text-field
            dark
            outlined
            label="지도 검색"
            prepend-inner-icon="place"
            class="juk-mapsearch"
          ></v-text-field>
        </div>
      </div>
    </div>
    <v-content>
      <section class="juk-devide-content">
        <v-layout
          column
          wrap
          class="my-12"
          align-center
        > 
          <v-flex xs12 style="width: 80%;" class="my-8">
            <v-container grid-list-xl>
              <v-layout row wrap align-start>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-carousel class="carousel"
                      cycle
                      hide-delimiter-background
                      :show-arrows="false"
                      width="500"
                      height="500"
                    >
                      <v-carousel-item
                        v-for="(slide,i) in bannerList"
                        :key="i"
                        :src="`//192.168.0.121:9000/api/file/${slide.BANNER_PATH}`"
                        :href="slide.BANNER_LINK"
                      >
                        <v-sheet
                          color="#00000011"
                          height="100%"
                          tile
                        >
                        </v-sheet>
                      </v-carousel-item>
                    </v-carousel>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <div class="d1">
                      <v-card-text class="text-center">
                        <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">News</div>
                      </v-card-title>
                    </div>
                    <div v-for="news in newsList" :key="news.originallink" class="board" id="newsboard">
                      <a :href="news.originallink" class="listfont subtitle-1 blue-grey--text nonAtag">{{ news.title.substring(0,30) }}...</a>
                    </div>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <div class="d1">
                      <v-card-text class="text-center">
                        <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Notice</div>
                      </v-card-title>
                    </div>
                    <div class="content">
                      <div v-for="notice in noticeList" :key="notice.NOTICE_SEQ" class="board subtitle-1 blue-grey--text nonAtag">{{ notice.NOTICE_TITLE }}</div>
                    </div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-container grid-list-xl class="my-12">
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4 class="my-12">
              <v-card flat class="transparent">
                <v-img src="@/assets/img/offerhouse_01.jpg"></v-img>
              </v-card>
            </v-flex>

            <v-flex xs12 sm4 offset-sm1 align-self-center>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="juk-title"><v-icon size="50" icon color="teal accent-3" id="offertitle">home_work</v-icon> 우리집은 얼마나 할까?</div>
                </v-card-title>
                <v-row class="mt-4 mb-12">
                  <div class="juk-subtitle text-center" id="offercont">▶ 별도의 비용 없이 손 쉬운 우리집 내놓기를 이용하여<br>시세를 알아보고 공인중개사와 정보를 공유할 수 있습니다.</div>
                </v-row>
                <v-row justify="center">
                  <v-btn 
                    id="offerbtn"
                    width="200"
                    height="60"
                    class="headline"
                    color="teal"
                    outlined
                    @click="showModal"
                  >
                    우리집 내놓기
                  </v-btn>
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <section class="juk-deepback">
       
        <v-parallax src="@/assets/img/aggregation_back.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-4 text-center">Web development has never been easier</div>
            <em>Kick-start your application today</em>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section class="my-12">
        <v-container class="my-12">
          <v-row no-gutters>
            <template v-for="n in 8">
              <v-col :key="n">
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  Column {{n}}
                </v-card>
              </v-col>
              <v-responsive
                v-if="n === 2"
                :key="`width-${n}`"
                width="100%"
              ></v-responsive>
            </template>
          </v-row>
        </v-container>
      </section>
    </v-content>
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
        url: `${this.serverLocation}/newsList?start=1`
      })).data;

      this.bannerList = (await axios({
        url: `${this.serverLocation}/bannerList`
      })).data;

      this.userType = (await axios({
        url: `${this.serverLocation}/check`
      })).data.user.type;
    })();
  },
  components: {
    HomeMenu,
    modal,
  },
  data() {
    return {
      userType: undefined,
      modalVisibility: false,
      isModalVisible: false,
      noticeList: [],
      newsList: [],
      bannerList: [],
      slides: [
        {
          src: require('../assets/img/slider_02.jpg'),
        },
        {
          src: require('../assets/img/slider_03.jpg'),
        },
        {
          src: require('../assets/img/slider_01.png'),
        },
      ],
    }
  },
  methods:{
    showModal() {
      if(this.userType === 'user'){
        this.isModalVisible = true;
      }else if(this.userType == undefined){
        this.$swal({
          type: 'info',
          title: '로그인이 필요합니다',
          text: ' ',
          confirmButtonText: '로그인 하기',
        })
        .then((result) => {
          this.$router.replace('/login/user');
        })

      }else if(this.userType === 'agent'){
        this.$swal('일반 회원만 가능한 서비스입니다.', ' ', 'info');
      }
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

<style scoped>
  .slider-position {
    position: relative;
  }

  .slider-text-position {
    width:40%;
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

  .juk-mapsearch {
    font-size: 20pt;
  }

  .juk-devide-content {
    border-bottom: 1px solid #AEAEAE;
  }

  .juk-title {
    font-size: 28pt;
  }

  .juk-subtitle {
    font-size: 16pt;
  }

  .jukbor {
    border: 1px solid red;
  }

  .juk-deepback {
    background-color: #E0E0E0 !important;
  }
  #offertitle {
    margin-left: -10px;
  }

  #offercont{
    margin-left: 30px;
  }

  .board {
    margin-top: 7px;
    margin-left: 140px;
  }
  .caption {
    font-size: 1.2em;
  }
  #newsboard{
    margin-left: 80px;
  }
  .d1 {
    margin-left: 50px;
    margin-bottom: 35px;
  }
  .carousel {
    margin-left: -30px
  }
</style>