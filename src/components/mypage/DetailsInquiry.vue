<template>
    <v-container>
        <v-row>
            <v-col cols="6" sm="4" md="2">
                <v-select 
                    v-model="select" 
                    :items="items" 
                    item-text="name"
                    item-value="view"
                    :rules="[v => !!v || '선택하시오!!!']"
                    label="선택"
                    required></v-select>
            </v-col>
        </v-row>
        <v-row>
            <component :is="select" />
        </v-row>
     </v-container>
</template>

<script>
export default {
    data() {
        return {
            select: 'UserOfferHouse',
            items: [
                { name: '우리집 내놓기', view: 'UserOfferHouse'},
                { name: '리뷰내역', view: 'UserReviewInquiry'},
                { name: '신고내역', view: 'UserReportInquiry'},
            ],
            dtinquiry: "UserOfferHouse"
        }
    },
    components: {
        UserOfferHouse: () => import('@/components/mypage/details/UserOfferHouse'),
        UserReviewInquiry: () => import('@/components/mypage/details/UserReviewInquiry'),
        UserReportInquiry: () => import('@/components/mypage/details/UserReportInquiry')
    }
}
</script>

<style>

</style>