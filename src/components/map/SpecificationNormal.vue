<template>
  <v-container id="specification" class="pa-0 ma-0 overflow-y-auto" style="height: 100vh">
    <v-row class="juk-map_toparea pa-0 ma-0 "> 
      
    </v-row>
    <component
      :is="mapPage"
      :norNum="norSalesNum"
      :norData="norSalesData"
      :interestCheck="interestCheck"
      :reportCheck="reportCheck"
      :rating="rating"
      :onUser="onUser"
      :maptype="maptype"
      :rankList="rankList"
      :ranklength="ranklength"
      :cnt="cnt"
      :selectdong="selectdong"
      
      @receivedPage="switchScreen"
    />
  </v-container>
</template>

<script>
import { async } from 'q';
export default {

  beforeMount() {

    // 지도위치에 따른 원룸,투룸 인기리스트(카운트를 통한)
    this.$root.$on('oneRankList', rankList => {
     
      this.rankList = rankList;
      this.ranklength = this.rankList.length;
      
    });

    this.$root.$on('selectdong', selectdong => {
      this.selectdong = selectdong;
    });

    this.$root.$on('selectNor', event => {
      console.log("asdasd", event.NORSALES_NUM)
      this.showNorInfo(event.NORSALES_NUM);
    });
  },
  data() {
    return {
      beforeSalesNum: 0,
      mapPage: 'NorPopulSalesList',
      norSalesNum: 0,
      norSalesData: {},
      interestCheck: 0,
      reportCheck: 0,
      rating: 0,
      onUser: undefined,
      maptype: 'room',
      rankList: [],
      ranklength: 0,
      cnt:0,
      selectdong: '',
    }
  },
  
  components: {
    ReviewMain: () => import('@/components/map/review/ReviewMain'),
    NorInfo: () => import('@/components/map/nor/NorInfo'),
    NorPopulSalesList: () => import('@/components/map/nor/NorPopulSalesList'),
  },
  
  methods: {
    switchScreen(convertPage) {
      console.log("NorSpecification : ", convertPage);
      if(convertPage.page == 'info'){
        showNorInfo(convertPage.norSalesNum);
      }else{
        this.beforeSalesNum = this.norSalesNum;
        this.norSalesNum = convertPage.norSalesNum;
        this.mapPage = convertPage.page;
      }
    },
    showNorInfo(num) {
      // 일반매물 정보 가져오기
      (async () => {
        let result = (await axios({
            url: `${this.serverLocation}/mpGetNorSalesDetail?num=${num}`
        })).data;

        let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e => new Date(e));
        result.COMPLETION_DATE = `${completeionDate.getFullYear()}`;
        result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;

        this.norSalesData = result;
      })();

      // 별점 가져오기
      (async () => {
        this.rating = (await axios({
          url: `${this.serverLocation}/getNorAvgScore?num=${num}`
        })).data.SCORE || 0;
      })();

      // 조회수 증가
      (async () => {
        await axios({
            url: `${this.serverLocation}/increaseViewCnt`,
            method: 'POST',
            data: {
              num: num,
            },
          })
          .then(res => {
            console.log('조회수 추가');
          })
          .catch(err => {
            console.log(err);
          })
      })();

      // 신고내역 체크
      (async () => {
        this.reportCheck = (await axios({
          url: `${this.serverLocation}/checkNorReport?num=${num}`
        })).data;
      })();

      // 관심목록 추가 체크
      (async () => {
        this.interestCheck = (await axios({
          url: `${this.serverLocation}/checkNorInterest?num=${num}`
        })).data;
      })();

      // 로그인 체크
      (async () => {
        await axios
          .get(`${this.serverLocation}/check`)
          .then(res => {
            if (res.data.user == undefined) {
              this.onUser = 'noUser';
            } else {
              this.onUser = res.data.user.USERID;
            }
          })
          .catch(err => {
            console.log(err);
          })
      })();

      this.mapPage = 'NorInfo';

    }
  },
}
</script>


<style scoped>
#specification {
  position: fixed;
  right: 0;
  width: 450px;
  background: #FFF;
  height: 100vh;
}

a.logo {
  color: #FFF;
  font-size: 18pt;
  font-weight: bold;
  text-decoration: none;
}

.juk-map_toparea {
  background-color: #1564f9;
}

.bor {
  border: 1px solid black;
}
</style>