<template>
    <v-container full-height class="pa-0">
        <v-row>
            <div class="title">
                <v-icon large color="grey darken-4">apartment</v-icon>
                아파트
            </div>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-6"
                @click="comparisonOfsales"
            >
                비교하기
            </v-btn>
        </v-row>
        <v-row class="ma-0">
            <v-col 
                v-for="sales in salesItemList"
                :key="sales.APTSALES_NUM"
                cols="3"
                @click="viewSales(sales.APTSALES_NUM)"
            >
                <v-card outlined>
                    <v-img
                        :src="sales.PHOTO_PATH"
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
        <div class="title mt-8">
            <v-icon large color="grey darken-4">home_work</v-icon>
            원룸/투룸
        </div>
        <v-row>
              
        </v-row>
    </v-container>
</template>

<style>
    #app {
        background-color: white;
    }

    div.bor {
        border: 1px solid black;
    }
</style>

<script>
export default {
    beforeMount() {
        (async () => {
            this.salesList = (await axios({
                url: `${this.serverLocation}/mpSalesInterList`
            })).data;
        })();
    },
    data() {
        return {
            salesList: [],
            trans: {},
        }
    },
    computed: {
        salesItemList() {
            return this.salesList.filter(e => e.BLACK_STATUS === 'N');
        },
    },
    methods: {
        viewSales(aptSalesNum) {
            this.trans.aptSalesNum = aptSalesNum;
            this.trans.page = 'SalesDetail';
            
            this.$emit('receivedPage', this.trans);
        },
        comparisonOfsales() {
            this.trans.aptSalesNum = undefined;
            this.trans.page = 'CompareSales';

            this.$emit('receivedPage', this.trans);
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
    }
}
</script>