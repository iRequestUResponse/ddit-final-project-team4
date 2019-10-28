<template>
    <v-container fluid class="pa-0 ma-0 bor" style="height: 100vh">
        <v-row>
            <div class="pa-0 mx-auto my-2">리뷰페이지</div>
        </v-row>
        <v-row class="grey lighten-1 ma-0 py-8">
            <v-card
                class="grey darken-3 mx-auto"
                dark=""
                width="280"
            >
                <div class="title mt-4 text-center grey--text">
                    추천점수
                </div>
                <div class="my-1 display-2 text-center">
                    {{ rating }} 점
                </div>
                <div class="text-center mb-4">
                    <v-rating
                        v-model="rating"
                        color="yellow darken-3"
                        background-color="grey lighten-1"
                        empty-icon="$ratingFull"
                        size="40"
                        dense
                        readonly
                        half-increments
                        hover
                    ></v-rating>
                </div>
            </v-card>
        </v-row>
        <v-row class="mx-0 my-2 pa-0">
            <v-btn 
                block 
                color="primary"
                @click="insertReview(aptSeq)"
            >
                리뷰작성
            </v-btn>
        </v-row>
        <v-container class="overflow-y-auto juk-commarea">
            <v-row class="ma-0 pa-0">
                <div class="box">
                    가나다
                </div>
                <div class="box">
                    가나다
                </div>
                <div class="box">
                    가나다
                </div>
                <div class="box">
                    가나다
                </div>
                <div class="box">
                    가나다
                </div>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    beforeMount() {
        (async () => {
            this.reviewList = (await axios({
                url: `${this.serverLocation}/getAptReivewList?seq=${this.aptSeq}`
            })).data;

            console.log(this.reviewList);
        })();
    },
    data() {
        return {
            rating: 3.25,
            aptSeq: 6794,
            reviewList: [],
        }
    },
    methods: {
        insertReview(aptSeq) {
            alert("리뷰 작성");
        }
    }
}
</script>

<style>
    .whitebor {
        border: 1px solid white;
        height: fit-content;
    }

    .box {
        width: 100%;
        height: 200px;
        background: yellow;
    }

    .juk-commarea {
        height: 50vh;
        padding: 0px;
        margin: 0px;
    }
</style>