<template>
    <v-container fluid class="pa-0 ma-0" style="height: 100vh">
        <v-row class="pa-0 mx-0 pa-4 pt-6 titleRow">
            <v-col cols=12 class="text-center pa-0 ma-0">
                <div class="display-1 white--text">리 뷰</div>
            </v-col>
        </v-row>
        <v-row class="grey lighten-1 ma-0 py-8">
            <v-card class="grey darken-3 mx-auto" dark width="280">
                <div class="title mt-4 text-center grey--text">
                    추천점수
                </div>
                <div class="my-1 display-2 text-center">
                    {{ rating }} 점
                </div>
                <div class="text-center mb-4">
                    <v-rating v-model="rating" color="yellow darken-3" background-color="grey lighten-1"
                        empty-icon="$ratingFull" size="40" dense readonly half-increments hover></v-rating>
                </div>
                <v-btn v-show="this.onUser != ''" block color="juk-btncolor" @click="showinsert">
                    리뷰작성
                </v-btn>
                <v-dialog v-model="rvdialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">리뷰작성</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <div class="text-center">
                                            교통점수
                                        </div>
                                        <div class="text-center">
                                            <v-rating v-model="trafficRating" color="yellow darken-3"
                                                background-color="grey darken-1" empty-icon="$ratingFull"
                                                half-increments class="d-inline-flex" size="40" hover></v-rating>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <div class="text-center">
                                            환경점수
                                        </div>
                                        <div class="text-center">
                                            <v-rating v-model="surroundingsRating" color="yellow darken-3"
                                                background-color="grey darken-1" empty-icon="$ratingFull"
                                                half-increments class="d-inline-flex" size="40" hover></v-rating>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="12">
                                        <div class="text-center">
                                            거주점수
                                        </div>
                                        <div class="text-center">
                                            <v-rating v-model="residenceRating" color="yellow darken-3"
                                                background-color="grey darken-1" empty-icon="$ratingFull"
                                                half-increments class="d-inline-flex" size="40" hover></v-rating>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-textarea label="상세내용" v-model="reviewCont" auto-grow rows="1" row-height="15" />
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn v-if="mode === 'insert'" color="blue darken-1" text @click="insertReview">작성</v-btn>
                            <v-btn v-else color="blue darken-1" text @click="modifyReview">수정</v-btn>
                            <v-btn color="blue darken-1" text @click="rvdialog = false">취소</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-row>
        <v-container class="overflow-y-auto juk-commarea">
            <v-row v-if="this.reviewList.length === 0">
                <v-col class="mt-12 pt-12">
                    <div class="title text-center">리뷰가 없습니다.</div>
                </v-col>
            </v-row>
            <v-row v-for="cont in reviewList" :key="cont.REVIEW_SEQ" class="ma-0 pa-0">
                <v-col cols="12" class="grey lighten-2 pa-0">
                    <v-row class="pa-0 ma-0">
                        <v-col cols="8">
                            <div class="title">{{cont.USER_ADDR.substring(0,2)}}거주자</div>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col v-show="onUser == cont.USERID" cols="2">
                            <v-btn icon color="grey" @click="updateReview(cont)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col v-show="onUser == cont.USERID" cols="2">
                            <v-btn icon color="grey" @click="delteReview(cont.REVIEW_SEQ)">
                                <v-icon>clear</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <span>교통점수 : </span>
                    <v-rating background-color="grey darken-1" color="yellow darken-3" empty-icon="$ratingFull" dense
                        half-increments readonly size="16" :value="cont.TRAFFIC_SCORE" class="d-inline-flex"></v-rating>
                </v-col>
                <v-col cols="12">
                    <span>환경점수 : </span>
                    <v-rating background-color="grey darken-1" color="yellow darken-3" empty-icon="$ratingFull" dense
                        half-increments readonly size="16" :value="cont.SURROUNDINGS_SCORE" class="d-inline-flex">
                    </v-rating>
                </v-col>
                <v-col cols="12">
                    <span>거주점수 : </span>
                    <v-rating background-color="grey darken-1" color="yellow darken-3" empty-icon="$ratingFull" dense
                        half-increments readonly size="16" :value="cont.RESIDENCE_SCORE" class="d-inline-flex">
                    </v-rating>
                </v-col>
                <v-col cols="12">
                    <div>
                        {{ cont.REVIEW_CONT }}
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        props: ['aptNum', 'norNum', 'maptype'],
        beforeMount() {
            this.$root.$on('selectApt', event => {
                if (event != null) {
                    this.trans.aptSalesNum = 0;
                    this.trans.page = 'AptInfo';
                    this.$emit('receivedPage', this.trans);
                }
            });

            (async () => {
                axios
                    .get(`${this.serverLocation}/check`)
                    .then(res => {
                        if (res.data.user == undefined) {
                            this.onUser = ''
                        } else {
                            this.onUser = res.data.user.USERID
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

                this.getReviewList();
            })();
        },
        data() {
            return {
                rating: 0,
                reviewList: [],
                rvdialog: false,
                trafficRating: 0,
                surroundingsRating: 0,
                residenceRating: 0,
                reviewCont: '',
                reviewSeq: 0,
                mode: 'insert',
                trans: {},
                onUser: '',
            }
        },
        methods: {
            getReviewList() {
                if(this.maptype == 'apt'){
                    (async () => {
                        this.reviewList = (await axios({
                            url: `${this.serverLocation}/getAptReivewList?seq=${this.aptNum}`
                        })).data;
                    })();

                    (async () => {
                        this.rating = (await axios({
                            url: `${this.serverLocation}/getAptAvgScore?seq=${this.aptNum}`
                        })).data.SCORE;
                    })();
                }else if(this.maptype == 'room') {
                    (async () => {
                        this.reviewList = (await axios({
                            url: `${this.serverLocation}/getNorReivewList?num=${this.norNum}`
                        })).data;
                    })();

                    (async () => {
                        this.rating = (await axios({
                            url: `${this.serverLocation}/getNorAvgScore?num=${this.norNum}`
                        })).data.SCORE;
                    })();
                }else{
                    this.reviewList = [];
                    this.rating = 0;
                }
            },
            showinsert() {
                this.mode = 'insert';
                this.trafficRating = 0;
                this.surroundingsRating = 0;
                this.residenceRating = 0;
                this.reviewCont = '';
                this.rvdialog = true;
            },
            async insertReview() {
                if(this.maptype == 'apt'){
                    await axios({
                        url: `${this.serverLocation}/insertAptReview`,
                        method: 'POST',
                        data: {
                            seq: this.aptNum,
                            trarat: this.trafficRating,
                            surrat: this.surroundingsRating,
                            resrat: this.residenceRating,
                            cont: this.reviewCont,
                        },
                    })
                    .then(res => {
                        if (res.data === 1) {
                            this.rvdialog = false;
                            this.getReviewList();
                        } else {
                            console.log('데이터를 삽입하지 못함');
                        }
                    })
                }else if(this.maptype == 'room') {
                    await axios({
                        url: `${this.serverLocation}/insertNorReview`,
                        method: 'POST',
                        data: {
                            num: this.norNum,
                            trarat: this.trafficRating,
                            surrat: this.surroundingsRating,
                            resrat: this.residenceRating,
                            cont: this.reviewCont,
                        },
                    })
                    .then(res => {
                        if (res.data === 1) {
                            this.rvdialog = false;
                            this.getReviewList();
                        } else {
                            console.log('데이터를 삽입하지 못함');
                        }
                    })
                }else{
                    alert("작성 중 문제가 발생하였습니다. : maptype is null");
                }
            },
            async delteReview(revSeq) {
                await axios({
                        url: `${this.serverLocation}/deleteAptReview`,
                        method: 'POST',
                        data: {
                            seq: revSeq,
                        },
                    })
                    .then(res => {
                        if (res.data === 1) {
                            this.getReviewList();
                        } else {
                            console.log('데이터를 삽입하지 못함');
                        }
                    })
            },
            async updateReview(cont) {
                this.trafficRating = cont.TRAFFIC_SCORE;
                this.surroundingsRating = cont.SURROUNDINGS_SCORE;
                this.residenceRating = cont.RESIDENCE_SCORE;
                this.reviewCont = cont.REVIEW_CONT;
                this.mode = 'update';
                this.reviewSeq = cont.REVIEW_SEQ;
                this.rvdialog = true;
            },
            async modifyReview() {
                await axios({
                        url: `${this.serverLocation}/updateAptReview`,
                        method: 'POST',
                        data: {
                            seq: this.reviewSeq,
                            trarat: this.trafficRating,
                            surrat: this.surroundingsRating,
                            resrat: this.residenceRating,
                            cont: this.reviewCont,
                        },
                    })
                    .then(res => {
                        if (res.data === 1) {
                            this.rvdialog = false;
                            this.getReviewList();
                        } else {
                            console.log('데이터를 수정하지 못함');
                        }
                    })
            },
            showInfo() {
                this.trans.aptSalesNum = 0;
                this.trans.page = 'AptInfo';

                this.$emit('receivedPage', this.trans);
            }
        }
    }
</script>

<style>
    .titleRow {
        background: rgb(21, 101, 250);
        color: white;
    }

    .juk-btncolor {
        background-color: #1564f9 !important;
    }

    .juk-commarea {
        height: 66vh;
        padding: 0px;
        margin: 0px;
    }

    .bor {
        border: 1px solid black;
    }
</style>