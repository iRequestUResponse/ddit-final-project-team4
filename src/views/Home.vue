<template>
  <v-app>
    <div class="slider-position">
      <HomeMenu />

      <v-carousel cycle hide-delimiter-background height="800">
        <v-carousel-item v-for="(slide,i) in slides" :key="i" :src="slide.src">
          <v-sheet color="#00000090" height="100%" tile>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div class="slider-text-position">
        <div class="display-2 white--text text-center">어떤 아파트, 어떤 동네에서</div><br>
        <div class="display-2 white--text text-center">살고 싶으신가요?<br><br></div>
        <!-- <div class="title white--text text-center mt-2 mb-4">이제 죽방과 시작해보세요</div> -->
        <div @keydown="getSearchList">
          <v-combobox
            dark
            outlined
            label="지도 검색"
            prepend-inner-icon="place"
            class="juk-mapsearch"
            v-model="searchKeyword"
            :items="searchList.keywordList"
            @change="search"
          />
        </div>
      </div>
    </div>
    <v-content>
      <section class="juk-devide-content">
        <v-layout column wrap class="my-12" align-center>
          <v-flex xs12 style="width: 90%;" class="my-8">
            <v-container grid-list-xl>
              <v-layout row wrap align-start>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-carousel class="carousel" cycle hide-delimiter-background :show-arrows="false" width="500"
                      height="500">
                      <v-carousel-item v-for="(slide,i) in bannerList" :key="i"
                        :src="`//192.168.0.121:9000/api/file/${slide.BANNER_PATH}`" :href="slide.BANNER_LINK">
                        <v-sheet color="#00000011" height="100%" tile>
                        </v-sheet>
                      </v-carousel-item>
                    </v-carousel>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <div class="d1">
                      <v-card-text class="text-center">
                        <v-btn icon to="/board">
                          <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                        </v-btn>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">News</div>
                      </v-card-title>
                    </div>
                    <div v-for="news in newsList" :key="news.originallink" class="board" id="newsboard">
                      <a :href="news.originallink"
                        class="listfont subtitle-1 blue-grey--text nonAtag">{{ news.title.substring(0,30) }}...</a>
                    </div>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <div class="d1">
                      <v-card-text class="text-center">
                        <v-btn icon to="/board/NoticeList">
                          <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                        </v-btn>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Notice</div>
                      </v-card-title>
                    </div>
                    <div class="content">
                      <div 
                        v-for="notice in noticeList"
                        :key="notice.NOTICE_SEQ"
                        class="board subtitle-1 blue-grey--text nonAtag"
                      >
                        <a :href="'board/notice/'+notice.NOTICE_SEQ"
                          class="listfont subtitle-1 blue-grey--text nonAtag"
                        >
                          {{ notice.NOTICE_TITLE }}
                        </a>
                      </div>
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
                  <div class="juk-title">
                    <v-icon size="50" icon color="teal accent-3" id="offertitle">home_work</v-icon> 우리집은 얼마나 할까?
                  </div>
                </v-card-title>
                <v-row class="mt-4 mb-12">
                  <div class="juk-subtitle text-center" id="offercont">▶ 별도의 비용 없이 손 쉬운 우리집 내놓기를 이용하여<br>시세를 알아보고 공인중개사와
                    정보를 공유할 수 있습니다.</div>
                </v-row>
                <v-row justify="center">
                  <v-btn id="offerbtn" width="200" height="60" class="headline" color="teal" outlined
                    @click="showModal">
                    우리집 내놓기
                  </v-btn>
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <section class="juk-deepback">
        <v-parallax src="@/assets/img/homeback.jpg" height="500">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-12 text-center">
              <!-- 카운트 나오는 부분 -->
              <!-- 회원수 -->
              <v-row class="pa-10 mr-5 mb-12">
                <v-col cols="3" class="mb-12">
                  <v-container class="mx-12">
                    <v-row justify="center" align="center">
                      <v-icon class="mr-2" size="50" icon color="rgb(241,253,89)" id="face">face </v-icon>일반 회원
                    </v-row>
                    <v-row justify="center" class="mt-10">
                      <ICountUp
                        :delay="delay"
                        :endVal="endVal"
                        :options="options"
                        @ready="onReady"
                        class="iCountUp"
                      />
                      <span class="iCountUp"> 명</span>
                      <br><br><br><br><br>
                    </v-row>
                  </v-container>
                </v-col>
              
              <!-- 공인중개사회원수 -->
               <v-col cols="3">
                  <v-container class="mx-12">
                    <v-row justify="center" align="center">
                      <v-icon class="mr-2" size="50" icon color="rgb(241,253,89)" id="face">contacts </v-icon>공인중개사 회원
                    </v-row>
                    <v-row justify="center" class="mt-10">
                      <ICountUp
                        :delay="delay1"
                        :endVal="endVal1"
                        :options="options"
                        @ready="onReady1"
                        class="iCountUp"
                      />
                      <span class="iCountUp"> 명</span>
                    </v-row>
                  </v-container>
                </v-col>

              <!-- 아파트 매물 개수 -->
               <v-col cols="3">
                  <v-container class="mx-12">
                    <v-row justify="center" align="center">
                      <v-icon class="mr-2" size="50" icon color="rgb(241,253,89)" id="face">apartment </v-icon>매물 수
                    </v-row>
                    <v-row justify="center" class="mt-10">
                      <ICountUp
                        :delay="delay2"
                        :endVal="endVal2"
                        :options="options"
                        @ready="onReady2"
                        class="iCountUp"
                      />
                      <span class="iCountUp"> 개</span>
                    </v-row>
                  </v-container>
                </v-col>

              <!-- 방문자수 -->
               <v-col cols="3">
                  <v-container class="mx-12">
                    <v-row justify="center" align="center">
                      <v-icon class="mr-2" size="50" icon color="rgb(241,253,89)" id="face">meeting_room </v-icon>방문자 수
                    </v-row>
                    <v-row justify="center" class="mt-10">
                      <ICountUp
                        :delay="delay3"
                        :endVal="endVal3"
                        :options="options"
                        @ready="onReady3"
                        class="iCountUp"
                      />
                      <span class="iCountUp"> 명</span>
                    </v-row>
                  </v-container>
                </v-col>
            </v-row>
            </div>
          </v-layout>
        </v-parallax>
      </section>

      <!-- 엠블럼 -->
      <section class="my-12">
        <v-container class="my-12">
          <v-row>
            <v-col v-for="(emblem, i) in emblemList" :key="i" cols="2">
              <v-card class="pa-4" elevation="7" :href="emblem.link">
                <v-img
                  :src="emblem.src"
                  height="140"
                  contain
                />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-content>


    <v-footer color="grey darken-4" height="50">
      <v-layout row wrap align-center style="margin: 0 10%;">
        <a href="#" class="footer-icons nonAtag">
          <v-icon class="grey--text">mdi-facebook</v-icon>
        </a>
        <a href="#" class="footer-icons nonAtag">
          <v-icon class="grey--text">mdi-twitter</v-icon>
        </a>
        <a href="#" class="footer-icons nonAtag">
          <v-icon class="grey--text">mdi-instagram</v-icon>
        </a>
        <a href="#" class="footer-icons nonAtag">
          <v-icon class="grey--text">mdi-youtube</v-icon>
        </a>
        <a href="#" class="footer-icons nonAtag">
          <v-icon class="grey--text">mdi-google-plus</v-icon>
        </a>
        <v-spacer />
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
    <modal id="modal" v-show="isModalVisible" @close="closeModal" />
  </v-app>
</template>

<script>
import modal from '@/components/user/OfferHouseModal.vue';
import HomeMenu from '@/components/common/MainHomeMenu.vue';
import axios from 'axios';
import ICountUp from 'vue-countup-v2';

export default {
  name: 'home',
  beforeMount() {
    let isFired = false;

    document.onscroll = () => {
      if (document.scrollingElement.scrollHeight - document.scrollingElement.scrollTop < 1400 && !isFired) {
        isFired = true;
        this.countupList.forEach(e => {
          e.reset();
          e.start();
        })
      }
    };

    (async () => {
      this.userCnt = (await axios({
          url: `${this.serverLocation}/getUserTotals`
      })).data * 1000;
      
      this.endVal = this.userCnt;

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

  data() {
    return {
      userType: undefined,
      modalVisibility: false,
      isModalVisible: false,
      noticeList: [],
      newsList: [],
      bannerList: [],
      num: 3000,
      slides: [{
          src: require('../assets/img/slider_02.jpg'),
        },
        {
          src: require('../assets/img/slider_03.jpg'),
        },
        {
          src: require('../assets/img/slider_01.png'),
        },
      ],
      emblemList: [
        {
          src: require('../assets/logo.png'),
          link: 'https://kr.vuejs.org/',
        },
        {
          src: require('../assets/img/vuetify.png'),
          link: 'https://vuetifyjs.com/ko/',
        },
        {
          src: require('../assets/img/nodejs.png'),
          link: 'https://nodejs.org/ko/',
        },
        {
          src: require('../assets/img/vscode.png'),
          link: 'https://code.visualstudio.com/',
        },
        {
          src: require('../assets/img/photoshop.png'),
          link: 'https://www.adobe.com/kr/products/photoshop.html',
        },
        {
          src: require('../assets/img/illustrator.png'),
          link: 'https://www.adobe.com/kr/products/illustrator.html',
        },
        {
          src: require('../assets/img/sqldeveloper.png'),
          link: 'https://www.oracle.com/kr/database/technologies/appdev/sql-developer.html',
        },
        {
          src: require('../assets/img/oracledb.png'),
          link: 'https://www.oracle.com/kr/index.html',
        },
        {
          src: require('../assets/img/chartjs.png'),
          link: 'https://www.chartjs.org/',
        },
        {
          src: require('../assets/img/socketio.jpg'),
          link: 'https://socket.io/',
        },
        {
          src: require('../assets/img/kakaomap.png'),
          link: 'http://apis.map.kakao.com/',
        },
        {
          src: require('../assets/img/naverapi.png'),
          link: 'https://developers.naver.com/main/',
        },
      ],
      searchKeyword: '',
      searchList: {
        keywordList: [],
        list: [],
      },
      delay: 2000,
      endVal: 0,
      delay1: 0,
      endVal1: 1205,
      delat2: 2000,
      endVal2: 1024,
      delat3: 2000,
      endVal3: 511231,

      // endVal: 120500,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },

      countupList: [],
    }
  },

  methods:{
    showModal() {
      if (this.userType === 'user') {
        this.isModalVisible = true;
      } else if (this.userType == undefined) {
        this.$swal({
          type: 'info',
          title: '로그인이 필요합니다',
          text: ' ',
          confirmButtonText: '로그인 하기',
        })
        .then((result) => {
          this.$router.replace('/login/user');
        })

      } else if (this.userType === 'agent') {
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
    onReady(instance, CountUp){
      const that = this;
      this.countupList = [...this.countupList, instance];
      instance.update(that.endVal);
    },
    onReady1(instance, CountUp){
      const that = this;
      this.countupList = [...this.countupList, instance];
      instance.update(that.endVal1);
    },
    onReady2(instance, CountUp){
      const that = this;
      this.countupList = [...this.countupList, instance];
      instance.update(that.endVal2);
    },
    onReady3(instance, CountUp){
      const that = this;
      this.countupList = [...this.countupList, instance];
      instance.update(that.endVal3);
    },
    getSearchList(event) {
      if (event.code !== 'Enter') return;

      navigator.geolocation.getCurrentPosition(async position => {
        let result = (await axios({
          url: `${this.serverLocation}/searchAptList?lat=${position.coords.latitude}&lng=${position.coords.longitude}&query=${this.searchKeyword}`
        })).data;
  
        this.searchList.list = result.list;
        this.searchList.keywordList = [...result.areaList.map(e => e.AREA), ...result.nameList.map(e => e.ADDR + ' : ' + e.NAME)];
      }, async failure => {
        let center = this.$parent.$children.find(e => e.$el.classList.contains('map_wrap')).map.getCenter();
  
        let result = (await axios({
          url: `${this.serverLocation}/searchAptList?lat=${center.Ha}&lng=${center.Ga}&query=${this.searchKeyword}`
        })).data;
  
        this.searchList.list = result.list;
        this.searchList.keywordList = [...result.areaList.map(e => e.AREA), ...result.nameList.map(e => e.ADDR + ' : ' + e.NAME)];
      });
    },
    async search(keyword) {
      if (!this.searchList.keywordList.includes(keyword) || !keyword) return;

      this.$router.push(`/map/apart/${keyword}`);
    },
  },

  components: {
    HomeMenu,
    modal,
    ICountUp,
  },
};
</script>


<style scoped>

  .iCountUp {
    font-size: 3.0em;
    margin: 0;
    color: rgb(250,194,0);
  }
  .slider-position {
    position: relative;
  }

  .slider-text-position {
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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

  #offercont {
    margin-left: 30px;
  }

  .board {
    margin-top: 7px;
    margin-left: 140px;
  }

  .caption {
    font-size: 1.2em;
  }

  #newsboard {
    margin-left: 80px;
  }

  .d1 {
    margin-left: 50px;
    margin-bottom: 35px;
  }

  .carousel {
    margin-top: 48px;
    margin-left: -30px;
  }

</style>