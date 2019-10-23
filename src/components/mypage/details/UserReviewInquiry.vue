<template>
    <v-container class="pa-0">
        <v-row>
            <div class="title">
                <v-icon large color="grey darken-4">apartment</v-icon>
                아파트
            </div>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="this.aptList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">내용이 없습니다.</div>
            </v-col>
        </v-row>
        <v-row v-else class="ma-0">
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
        <v-row class="mt-10">
            <div class="title">
                <v-icon large color="grey darken-4">home_work</v-icon>
                원룸/투룸
            </div>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="this.norList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">내용이 없습니다.</div>
            </v-col>
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
            norList: [],
        }
    },
    methods: {

    }
}
</script>

<style>
    .juk-empty_content {
        height: 384px;
    }
</style>