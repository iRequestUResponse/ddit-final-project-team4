<template>
    <v-container full-height class="pa-0">
        <v-row class="ma-0">
            <div>아파트</div>
            <v-col 
                v-for="apt in aptList"
                :key="apt.REVIEW_SEQ"
                cols="3"
            >
                <v-card outlined>
                    <!-- <v-img
                        :src="apt.PHOTO_PATH"
                        class="text-right pa-2"
                        height="200px"
                    >
                        <v-btn icon color="blue" @click="cancelInterest(apt.INTEREST_SEQ)">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-img> -->

                    <div>
                        <v-card-title>
                            <div>{{ apt.APT_NAME }}</div>
                        </v-card-title>
                        <v-card-text>
                            <div>{{ apt.APT_ADDR }}</div>
                            <div>{{ apt.COMPLETION_DATE.substring(0,4) }}년 완공</div>
                            <div>{{ apt.REVIEW_CONT.substring(0,18) }}...</div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ma-0">
            <div>원룸/투룸</div>
        </v-row>
    </v-container>
</template>

<script>
export default {
    beforeMount() {
        (async () => {
            this.aptList = (await axios({
                url: `${this.serverLocation}/mpAptReviewList`
            })).data;
        })();
    },
    data() {
        return {
            aptList: [],
        }
    },
    methods: {

    }
}
</script>

<style>

</style>