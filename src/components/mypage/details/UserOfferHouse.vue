<template>
    <v-container>
        <v-row v-if="this.offerHouseList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">내역이 없습니다.</div>
            </v-col>
        </v-row>
        
        <v-row v-else>
            <v-col cols="3">
                <v-card 
                    v-for="offerHouse in offerHouseList"
                    :key="offerHouse.OFFERHOUSE_SEQ"
                    class="ma-4"
                    outlined 
                    tile
                    @click="viewEstimate(offerHouse.OFFERHOUSE_SEQ)"
                >
                    <v-img
                        :src="`//192.168.0.121:9000/api/file/${offerHouse.OFFERPHOTO_PATH}`"
                        class="text-right pa-2"
                        height="300px"
                    >
                        <v-btn id="deletebtn" icon color="pink accent-1" @click="deleteY(offerHouse.OFFERHOUSE_SEQ)">
                            <v-icon id ="deleteicon" size="50">cancel_presentation</v-icon>
                        </v-btn>
                    </v-img>
                  
                    <v-card-title>
                        <div> {{ offerHouse.OFFERHOUSE_ADDR }} </div>
                    </v-card-title>
                    <v-card-text>
                        <div> {{ offerHouse.OFFERHOUSE_ADDR2 }}</div>
                        <div> {{ offerHouse.OFFERHOUSE_AREA }}㎡ / {{ offerHouse.OFFERHOUSE_PYEONG }}평 {{ offerHouse.OFFERHOUSE_DELETE }}</div>
                    </v-card-text>
                </v-card>
               
            </v-col>
            <v-spacer></v-spacer>
            
            <v-col v-if="this.estimateList.length === 0" cols="5">
                <div class="title">
                    <v-row>
                      <v-col cols="1">
                    <v-icon large color="rgb(18,98,249)" size="60">home_work</v-icon>
                      </v-col>
                      <v-col>
                    <h3 class="grayh3">우리집 견적은?</h3>
                      </v-col>
                    </v-row>
                </div>
                <v-row class="juk-empty_estimate" align="center">
                    <v-col>
                        <div class="title text-center">등록한 견적 내역이 없습니다.</div>
                        <div class="title text-center">조금만 기다려주세요.</div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-else cols="5">
                <div class="title">
                     <v-row>
                      <v-col cols="1">
                    <v-icon large color="rgb(18,98,249)" size="60">home_work</v-icon>
                      </v-col>
                      <v-col>
                    <h3 class="grayh3">우리집 견적은?</h3>
                      </v-col>
                    </v-row>
                </div>
                <v-card
                    v-for="(estimate, index) in estimateList"
                    :key="estimate.ESTIMATE_SEQ"
                    :class="[ index === 0 && estimateList.length>1 ? 'jukcard-background' : 'white']"
                    elevation="8"
                    max-width="480px"
                    height="240px"
                    class="my-6"
                >
                    <v-container class="fill-height pa-4">
                        <v-layout 
                            column 
                            class="ma-0 pa-4 jukcard-outline"
                            :class="[ index === 0 && estimateList.length>1 ? 'ma-0 pa-4 jukbestcard-outline' : 'ma-0 pa-4 jukcard-outline']"
                        >
                            <div :class="[ index === 0 && estimateList.length>1 ? 'title amber--text' : 'title']">{{ estimate.AGENT_NAME }}</div>
                            <v-flex class="d-flex align-center justify-center">
                                <div :class="[ index === 0 && estimateList.length>1 ? 'display-2 amber--text' : 'display-2']">
                                  ￦ {{ estimate.ESTIMATE_PRICE | comma }}</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    beforeMount() {
        (async () => {
            this.offerHouseList = (await axios({
                url: `${this.serverLocation}/getMyOfferHouseList`
            })).data;
        })();
    },
    data() {
        return {
            offerHouseList: {},
            estimateList: {},
            offerHouseNo: 0,
        }
    },
    filters: {
        comma(value) {
            var num = new Number(value);
            if(value >= 100000000) return value/100000000 + '억원'
            else return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,");
        }
    },
    methods: {
        viewEstimate(estimateSeq) {
          this.offerHouseNo = estimateSeq;
          axios({
                  url: `${this.serverLocation}/getMyEstimateList?seq=${estimateSeq}`
              })
          .then(res => {
              this.estimateList = res.data;
          });
        },
        deleteY(seq){
          this.$swal({

            title: '삭제하시겠습니까?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',

          }).then((result) => {
            if (result.value) {
              axios({
                url: `${this.serverLocation}/deleteOfferHouse?offerHouseNo=${seq}`,
              })
              .then(res => {
                console.log(res.data);
                if (res.data) {
                    (async () => {
                        this.offerHouseList = (await axios({
                            url: `${this.serverLocation}/getMyOfferHouseList`
                        })).data;
                    })();
                    this.$swal(
                      '삭제성공!',
                      '삭제가 완료되었습니다.',
                      'success'
                    )
                } else {
                  this.$swal('삭제할 수 없습니다.', ' ', 'error');
                }
              })
            }
          })
           
        }
    }
}
</script>

<style>
    .juk-empty_content {
        height: 384px;
    }

    .juk-empty_estimate {
        height: 192px;
    }

    .jukcard-outline {
        border: 4px solid #1564f9;
        border-radius: 20px;
    }

    .jukcard-background {
        background-color: #2e2e2e !important;
    }

    .jukbestcard-outline {
        border: 4px solid #EDB72F;
        border-radius: 20px;
    }
    #deletebtn{
      border-radius: 30px;
      width: 50px;
    }
    .grayh3 {
      color: gray;
    }
    
</style>