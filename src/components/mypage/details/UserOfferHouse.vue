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
                        height="300px"
                    />

                    <v-card-title>
                        <div> {{ offerHouse.OFFERHOUSE_ADDR }} </div>
                    </v-card-title>
                    <v-card-text>
                        <div> {{ offerHouse.OFFERHOUSE_ADDR2 }}</div>
                        <div> {{ offerHouse.OFFERHOUSE_AREA }}㎡ / {{ offerHouse.OFFERHOUSE_PYEONG }}평</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
            <v-col v-if="this.estimateList.length === 0" cols="5">
                <div class="title">
                    <v-icon large color="grey darken-4">mdi-script-text-outline</v-icon>
                    견적서
                </div>
                <v-row class="juk-empty_estimate" align="center">
                    <v-col>
                        <div class="title text-center">견적이 없습니다.</div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-else cols="5">
                <div class="title">
                    <v-icon large color="grey darken-4">mdi-script-text-outline</v-icon>
                    견적서
                </div>
                <v-card
                    v-for="(estimate, index) in estimateList"
                    :key="estimate.ESTIMATE_SEQ"
                    :class="[ index === 0 && estimateList.length>1 ? 'jukcard-background' : 'white']"
                    elevation="8"
                    max-width="512px"
                    height="288px"
                    class="my-8"
                >
                    <v-container class="fill-height pa-4">
                        <v-layout 
                            column 
                            class="ma-0 pa-4 jukcard-outline"
                            :class="[ index === 0 && estimateList.length>1 ? 'ma-0 pa-4 jukbestcard-outline' : 'ma-0 pa-4 jukcard-outline']"
                        >
                            <div :class="[ index === 0 && estimateList.length>1 ? 'title amber--text' : 'title']">{{ estimate.AGENT_NAME }}중개사</div>
                            <v-flex class="d-flex align-center justify-center">
                                <div :class="[ index === 0 && estimateList.length>1 ? 'display-2 amber--text' : 'display-2']">￦ {{ estimate.ESTIMATE_PRICE | comma }}</div>
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
        }
    },
    filters: {
        comma(value) {
            var num = new Number(value);

            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,");
        }
    },
    methods: {
        viewEstimate(estimateSeq) {
            axios({
                    url: `${this.serverLocation}/getMyEstimateList?seq=${estimateSeq}`
                })
            .then(res => {
                this.estimateList = res.data;
            });
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
</style>