<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <div>나의 내놓은 집</div>
                <v-card 
                    v-for="offerHouse in offerHouseList"
                    :key="offerHouse.OFFERHOUSE_SEQ"
                    class="my-4"
                    outlined 
                    tile
                    @click="viewEstimate(offerHouse.OFFERHOUSE_SEQ)"
                >
                    <v-img
                        :src="offerHouse.OFFERPHOTO_PATH"
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
            <v-col cols="5">
                <div>공인중개사</div>
                <v-card
                    v-for="estimate in estimateList"
                    :key="estimate.ESTIMATE_SEQ"
                    max-width="400px"
                    class="my-4"
                >
                    <v-card-text>
                        <div>{{ estimate.AGENTID }}</div>
                    </v-card-text>
                    <v-card-title>
                        <div>￦ {{ estimate.ESTIMATE_PRICE }}</div>
                    </v-card-title>
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

</style>