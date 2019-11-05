<template>
    <v-container class="pa-0" style="height: 600px;">
        <v-row>
            <div class="title">
                <v-icon large color="grey darken-4">apartment</v-icon>
                아파트
            </div>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-6"
                color="rgb(18,98,249)"
                outlined
                tile
                @click="comparisonOfsales"
            >
                비교하기
            </v-btn>
        </v-row>
        <v-row v-if="this.salesList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">관심 목록이 없습니다</div>
            </v-col>
        </v-row>
        <v-row v-else class="mx-0 mb-10">
            <v-col 
                v-for="sales in salesList"
                :key="sales.APTSALES_NUM"
                cols="3"
            >
                <v-card outlined>
                    <v-img
                        :src="`${fileServer}/file/${sales.PHOTO_PATH}`"
                        class="text-right pa-2"
                        height="200px"
                    >
                        <v-btn icon color="blue" @click="cancelInterest(sales.INTEREST_SEQ)">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-img>

                    <div @click="viewSales(sales.APTSALES_NUM)">
                        <v-card-title>
                            <div>{{ sales.SALES_TITLE.substring(0,10) }}...</div>
                        </v-card-title>
                        <v-card-text>
                            <div>{{ sales.PYEONG }}평 {{ sales.RELEVANT_FLOOR }}층/{{ sales.WHOLE_FLOOR }}층</div>
                            <div>{{ sales.APT_NAME }} {{ sales.DONG }}</div>
                            <div>{{ sales.SALES_CONT.substring(0,18) }}...</div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row class="mt-10">
            <div class="title">
                <v-icon large color="grey darken-4">home_work</v-icon>
                원룸/투룸
            </div>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-10"
                color="rgb(18,98,249)"
                outlined
                tile
                @click="comparisonOfnorsales"
            >
                비교하기
            </v-btn>
        </v-row>
        <v-row v-if="this.norSalesList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">관심 목록이 없습니다</div>
            </v-col>
        </v-row>
        <v-row v-else class="mx-0 mb-10">
            <v-col 
                v-for="norSales in norSalesList"
                :key="norSales.NORSALES_NUM"
                cols="3"
            >
                <v-card outlined>
                    <v-img
                        :src="`${fileServer}/file/${norSales.PHOTO_PATH}`"
                        class="text-right pa-2"
                        height="200px"
                    >
                        <v-btn icon color="blue" @click="cancelNorInterest(norSales.INTEREST_SEQ)">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-img>

                    <div @click="viewNorSales(norSales.NORSALES_NUM)">
                        <v-card-title>
                            <div>{{ norSales.SALES_TITLE.substring(0,10) }}...</div>
                        </v-card-title>
                        <v-card-text>
                            <div>{{ norSales.AREA }}평 {{ norSales.RELEVANT_FLOOR }}층/{{ norSales.WHOLE_FLOOR }}층</div>
                            <div>{{ norSales.ADDRESS.substring(0,18) }}...</div>
                            <div>{{ norSales.SALES_CONT.substring(0,18) }}...</div>
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
            this.salesList = (await axios({
                url: `${this.serverLocation}/mpSalesInterList`
            })).data;
            
            this.norSalesList = (await axios({
                url: `${this.serverLocation}/mpNorSalesInterList`
            })).data;
        })();
    },
    data() {
        return {
            salesList: [],
            norSalesList: [],
            trans: {},
        }
    },
    methods: {
        viewSales(aptSalesNum) {
            this.trans.aptSalesNum = aptSalesNum;
            this.trans.page = 'SalesDetail';
            
            this.$emit('receivedPage', this.trans);
        },
        comparisonOfsales() {
            if(this.salesList.length === 0) {
                this.$swal('목록이 없습니다.', ' ', 'info');
                return;
            }else if(this.salesList.length === 1) {
                this.$swal('비교할 대상이 없습니다.', ' ', 'info');
                return;
            }else{
                this.trans.aptSalesNum = undefined;
                this.trans.page = 'CompareSales';

                this.$emit('receivedPage', this.trans);
            }
        },
        cancelInterest(interestSeq) {
            axios({
                url: `${this.serverLocation}/cancelInterest`,
                method: 'POST',
                data: {
                    seq: interestSeq,
                },
            })
            .then(res => {
                if (res.data === 1) {
                    (async () => {
                        this.salesList = (await axios({
                            url: `${this.serverLocation}/mpSalesInterList`
                        })).data;
                    })();
                }else{
                    console.log('데이터를 삭제하지 못함');
                }
            })
        },
        viewNorSales(SalesNum) {
            this.trans.aptSalesNum = SalesNum;
            this.trans.page = 'SalesNorDetail';
            
            this.$emit('receivedPage', this.trans);
        },
        comparisonOfnorsales() {
            if(this.norSalesList.length === 0) {
                this.$swal('목록이 없습니다.', ' ', 'info');
                return;
            }else if(this.norSalesList.length === 1) {
                this.$swal('비교할 대상이 없습니다.', ' ', 'info');
                return;
            }else{
                this.trans.aptSalesNum = undefined;
                this.trans.page = 'CompareNorSales';

                this.$emit('receivedPage', this.trans);
            }
        },
        cancelNorInterest(interestSeq) {
            axios({
                url: `${this.serverLocation}/cancelInterest`,
                method: 'POST',
                data: {
                    seq: interestSeq,
                },
            })
            .then(res => {
                if (res.data === 1) {
                    (async () => {
                        this.norSalesList = (await axios({
                            url: `${this.serverLocation}/mpNorSalesInterList`
                        })).data;
                    })();
                }else{
                    console.log('데이터를 삭제하지 못함');
                }
            })
        },
    }
}
</script>

<style>
    #app {
        background-color: white;
    }

    div.bor {
        border: 1px solid black;
    }

    .juk-empty_content {
        height: 384px;
    }
</style>