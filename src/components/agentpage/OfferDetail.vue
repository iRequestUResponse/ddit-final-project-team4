<template>
    <v-container class="px-10 py-0 mt-12">
      <div class="display-1 grey--text">
        <v-icon size="50" icon color="rgb(21,101,250)" id="offertitle" style="margin-top:-5px;">house</v-icon>
          내놓은방 상세보기 
      </div>
      <div class="bor pa-7 ma-4">
        <v-row>
            <v-col cols="9">
                <div class="grey--text">
                    <h3>아파트명</h3>
                </div>
                <div class="display-1 mt-3">
                    <h3>{{ offer.OFFERHOUSE_ADDR2 }} </h3>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-row class="mr-5 mt-8">
                <h2 class="grey--text">회원에게 가격을 제시해주세요</h2>
                <v-text-field
                  type="number"
                  v-model="price"
                  label="가격을 입력해주세요"
                  outlined
                  class="juk-mu_text-field mt-6"
                >
                </v-text-field>
                <img id="estimateSubmit" src="@/assets/img/money.png" class="mt-6" text @click="estimateSubmit">
              </v-row>
              <v-spacer></v-spacer>
              <div>
                <h2 id="divh2">{{ price | comma }}</h2>
              </div>
            </v-col>
            <br><br><br><br><br><br><br><br>
        </v-row>
        <v-row class="pl-0 my-4">
            <v-col cols="12" md="4">
                <div class="juk-leftdevide">
                    <div class="grey--text">
                        <h3>주소</h3>
                    </div>
                    <div class="display-1">
                        {{ offer.OFFERHOUSE_ADDR }}
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="3">
                <div class="juk-leftdevide">
                    
                    <div class="display-1 mt-2">
                        <v-col><a :href="`http://local.daum.net/map/index.jsp?q=${ offer.OFFERHOUSE_ADDR }`" target="_blank">
                         <v-icon size="50" icon color="rgb(21,101,250)" id="offertitle" style="margin-top:-5px;">search</v-icon>
                        위치확인</a></v-col>
                    </div>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2" class="d-flex align-center title mr-12">
                <v-icon size="50">
                    person
                </v-icon>
                <div class="pl-2">
                    {{ offer.USERID }}
                </div>
            </v-col>
        </v-row>
        <!-- <v-row class="juk-maindivide py-1">
            <v-col>{{ aptsale.SALES_TITLE }}</v-col>
        </v-row> -->
        <v-row class="juk-bottomdivide py-1">
            <v-col cols="3"><h2>면적 : {{ offer.OFFERHOUSE_AREA }} ㎡</h2></v-col>
            <v-col cols="3"><h2>평수 : {{ offer.OFFERHOUSE_PYEONG }}평</h2></v-col>
        </v-row>
        <v-row class="px-12">
            <v-col cols="12" sm="12" md="8">
                <v-container>
                    <v-row>
                      <v-col v-for="photo in offer.photolist" :key="photo.OFFERHOUSE_SEQ" cols="12">
                         <v-img :src="`${fileServer}/file/${photo.OFFERPHOTO_PATH}`" width="512px"></v-img>
                      </v-col>
                      <v-col cols="12">
                          <v-content></v-content>
                      </v-col>
                        <!-- <v-col
                            v-for="photo in aptsale.photolist"
                            :key="photo.PHOTO_SEQ"
                            class="d-flex child-flex"
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <v-card flat tile class="d-flex">
                            <v-img
                                :src="`${fileServer}/file/${photo.PHOTO_PATH}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                            >
                                <template v-slot:placeholder>
                                <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                                </template>
                            </v-img>
                            </v-card>
                        </v-col> -->
                        <br><br><br><br><br><br><br><br>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
      </div>
    </v-container>
</template>

<script>
export default {
    props: ['offerNum'],
    beforeMount() {
        (async () => {
            let result = (await axios({
                url: `${this.serverLocation}/getOfferDetails?offerNum=${this.offerNum}`
            })).data;
            
            // let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e => new Date(e));
            // result.COMPLETION_DATE = `${completeionDate.getFullYear()}.${completeionDate.getMonth() + 1}.${completeionDate.getDate()}`;
            // result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;
            
        this.offer = result;
        })();
    },
    data() {
        return {
            offer: {},
            price: '',
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
        estimateSubmit(){
          axios({
            url: `${this.serverLocation}/insertEstimate`,
            method: 'POST',
            data: {
                offerNum: this.offerNum,
                price: this.price,
            },
          })
          .then(res => {
              if (res.data === 1) {
                  this.$swal({
                    title: '견적입력 성공',
                    text: '견적이 회원님에게 전달됩니다.',
                    type: 'success',
                    confirmButtonColor: '#d33',
                    confirmButtonText: '확인',
                    timer: 1500
                  }).then((result) => {
                    this.$router.push('/agentpage/AgentOfferedList');
                    location.reload();
                  })
              } else {
                  this.$swal('견적입력 실패', '견적이 회원님에게 전달되다가 말았습니다.', 'error');
              }
          })
        } 
    }
}

</script>

<style scoped>
    div.bor {
        border: 1px solid black;
        margin-top: 20px;
        padding-left: 40px;
        padding-top: 30px;
    }
    #app {
        margin: 10px;
    }
    H1 {
        margin-left: 35px;
    }
    #estimateSubmit{
        width: 50px;
        height: 50px;
        cursor: pointer;
        margin-left: 20px;
    }
    a {
      text-decoration: none;
    }
    
    .juk-leftdevide {
        border-right: 1px solid #aeaeae;
    }

    .juk-maindivide {
        border-top: 2px solid #424242;
        border-bottom: 1px solid #AEAEAE;
    }

    .juk-bottomdivide {
        border-bottom: 1px solid #AEAEAE;
    }
    
</style>