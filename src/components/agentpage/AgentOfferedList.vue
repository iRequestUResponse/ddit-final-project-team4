<template>
    <v-container>
        <h1>내놓은방 조회</h1>

         <v-select
          :items="sidoList"
          item-text="SIDO"
          v-model="selected"
          label="Select"
          single-line
          auto
          hide-details
          @change="selectSido"
        ></v-select>

        <span>선택함: {{ selected }}</span>

        <v-row>
            <v-col
                v-for="offer in offerList"
                :key="offer.OFFERHOUSE_SEQ"
                cols="3"
            >
                <v-card outlined>
                    <v-img
                        :src="offer.OFFERPHOTO_PATH"
                        height="200px"
                    />

                    <v-card-title>
                        <div> {{ offer.OFFERHOUSE_ADDR }} {{ offer.OFFERHOUSE_ADDR2 }} </div>
                    </v-card-title>
                    <v-card-text>
                        <div> 평수 : {{ offer.OFFERHOUSE_PYEONG }}평 </div>
                        <div> 면적 : {{ offer.OFFERHOUSE_AREA }}㎡ </div>
                        <div> 내용 </div>
                        <!-- <div> {{ offer.OFFERHOUSE_CONT }} </div> 내용입력도 있으면 좋을듯-->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
    #app {
        background-color: white;
    }
</style>

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

            console.log(this.sidoList)
        })();
    },
    data() {
        return {
            offerList: [],
            trans: {},
            selected: '',
            sidoList: [],
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
                url: `${this.serverLocation}/changeViewHouseList`,
                method: 'POST',
                data: {
                    sido: this.selected + '%',
                },
            }).then(res => {
                this.offerList = res.data;
            })
        }
    }
}
</script>