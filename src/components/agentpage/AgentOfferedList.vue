<template>
    <v-container>
        <h1>내놓은방 조회</h1>
        <v-row justify="center">
            <v-col cols="12" lg="2" id="sbcol">
                <v-select
                label="선택1"
                :items="sidoList"
                item-text="SIDO"
                v-model="selected"
                single-line
                auto
                hide-details
                @change="selectSido"
                ></v-select>
            </v-col>
            <v-col cols="12" lg="2">
                <v-select
                :items="gugunList"
                item-text="GUGUN"
                v-model="selected1"
                label="선택2"
                single-line
                auto
                hide-details
                :disabled="btndis"
                @change="selectGugun"
                ></v-select>
            </v-col>
            <v-col>
                <img id="reset" src="@/assets/img/reset.png" text @click="reset">
            </v-col>
        </v-row>
        <span>시도선택함: {{ selected }}</span>
        <span>구군선택함: {{ selected1 }}</span>
        
            <v-row>
                <v-col
                    v-for="offer in offerList"
                    :key="offer.OFFERHOUSE_SEQ"
                    cols="3"
                    @click="viewOffer(offer.OFFERHOUSE_SEQ)"
                >
                    <v-card outlined>
                        <v-img
                            :src="`${fileServer}/file/${offer.OFFERPHOTO_PATH}`"
                            height="200px"
                        />

                        <div @click="viewOffer(offer.OFFERHOUSE_SEQ)">
                            <v-card-title>
                                <div> {{ offer.OFFERHOUSE_ADDR }} {{ offer.OFFERHOUSE_ADDR2 }} </div>
                            </v-card-title>
                            <v-card-text>
                                <div> 평수 : {{ offer.OFFERHOUSE_PYEONG }}평 </div>
                                <div> 면적 : {{ offer.OFFERHOUSE_AREA }}㎡ </div>
                                <div> 내용 </div>
                                <!-- <div> {{ offer.OFFERHOUSE_CONT }} </div> 내용입력도 있으면 좋을듯-->
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
       
    </v-container>
</template>


<script>


export default {
    beforeMount() {
        (async () => {
            this.offerList = (await axios({
                url: `${this.serverLocation}/getOfferList`
            })).data;

            this.sidoList = (await axios({
                url: `${this.serverLocation}/getAddrSido`
            })).data;

            console.log(this.offerList);
        })();
    },
    data() {
        return {
            offerList: [],
            trans: {},
            selected: '',
            selected1: '',
            sidoList: [],
            gugunList: [],
            btndis: true,
        }
    },
    methods: {
        // viewSales(aptSalesNum) {
        //     this.trans.aptSalesNum = aptSalesNum;
        //     this.trans.page = 'SalesDetail';
            
        //     this.$emit('receivedPage', this.trans);
        // }
        selectSido() {
            axios({
                url: `${this.serverLocation}/selectHouseSido`,
                method: 'POST',
                data: {
                    sido: this.selected + '%',
                },
            }).then(res => {
                this.offerList = res.data;
                axios({
                    url: `${this.serverLocation}/getAddrGugun`,
                    method: 'POST',
                    data: {
                        sido: this.selected + '%',
                    },
                }).then(res => {
                    this.gugunList = res.data;
                    this.btndis = false;
                })
            })
            
        },
        selectGugun() {
            axios({
                url: `${this.serverLocation}/selectHouseGugun`,
                method: 'POST',
                data: {
                    sido: this.selected + '%',
                    gugun: '%' + this.selected1 + '%',
                },
            }).then(res => {
                this.offerList = res.data;
            })
        },
        reset() {
            this.offerList = (
                axios({
                url: `${this.serverLocation}/getOfferList`
                })
                .then(res => {
                    this.offerList = res.data;
                    this.selected = "";
                    this.selected1 = "";
                    this.btndis = true;
                })
            ).data;
        },
        viewOffer(offerhouse_seq){
           
            this.trans.offerhouse_seq = offerhouse_seq;
            this.trans.page = 'OfferDetail';
            
            this.$emit('receivedPage', this.trans);
        }
    }
}
</script>

<style scoped>
    #sbcol{
        margin-right: 50px;
    }
    #reset{
        width: 38px;
        cursor: pointer;
        margin-top: 15px;
    }
</style>