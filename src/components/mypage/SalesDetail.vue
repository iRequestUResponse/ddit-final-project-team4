<template>
    <v-container class="px-10 py-0 mt-12">
        <v-row>
            <v-col cols="12">
                <div class="grey--text">
                    아파트명
                </div>
                <div class="display-2">
                    {{ aptsale.APT_NAME }}
                </div>
            </v-col>
        </v-row>
        <v-row class="pl-4 my-4">
            <v-col cols="12" md="4">
                <div class="juk-leftdevide">
                    <div class="grey--text">
                        거래유형 / 금액
                    </div>
                    <div class="display-1">
                        {{ aptsale.SALES_TYPE }} {{ aptsale | comma }}
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="2">
                <div class="juk-leftdevide">
                    <div class="grey--text">
                        면적
                    </div>
                    <div class="display-1">
                        {{ aptsale.PYEONG }}평
                    </div>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2" class="d-flex align-center title">
                <v-icon>
                    person
                </v-icon>
                <div class="pl-2">
                    {{ aptsale.AGENTID }}
                </div>
            </v-col>
        </v-row>
        <v-row class="juk-maindivide py-1">
            <v-col>{{ aptsale.SALES_TITLE }}</v-col>
        </v-row>
        <v-row class="juk-bottomdivide py-1">
            <v-col cols="3">해당층/전체층 : {{ aptsale.RELEVANT_FLOOR }}층/{{ aptsale.WHOLE_FLOOR }}층</v-col>
            <v-col cols="3">방향 : {{ aptsale.DIRECTION }}</v-col>
            <v-col cols="3">준공년도 : {{ aptsale.COMPLETION_DATE.substring(0,4) }}년</v-col>
            <v-col cols="3">입주가능일 : {{ aptsale.AVAILABILITY_DATE }}</v-col>
        </v-row>
        <v-row class="px-12">
            <v-col cols="12" sm="12" md="8">
                <v-container>
                    <v-row>
                        <v-col
                            v-for="photo in aptsale.photolist"
                            :key="photo.PHOTO_SEQ"
                            class="d-flex child-flex"
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <v-card flat tile class="d-flex">
                            <v-img
                                :src="`//192.168.0.121:9000/api/file/${photo.PHOTO_PATH}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                            >
                                <template v-slot:placeholder>
                                <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                                </template>
                            </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-row class="mt-8 px-8">
            <v-card min-height="500" flat tile>
                <div class="display-1">
                    {{ aptsale.SALES_CONT }}
                </div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['aptNum'],
    beforeMount() {
        (async () => {
            let result = (await axios({
                url: `${this.serverLocation}/mpGetAptSalesDetail?aptNum=${this.aptNum}`
            })).data;

            let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e => new Date(e));
            result.COMPLETION_DATE = `${completeionDate.getFullYear()}.${completeionDate.getMonth() + 1}.${completeionDate.getDate()}`;
            result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;

            this.aptsale = result;
            console.log(this.aptsale);
        })();
    },
    filters: {
        comma(sales) {
            let price = sales.PRICE;

            let result = '';
            if (price > 100000000) {
                result += `${Math.floor(price / 100000000)}억 `;
                price %= 100000000;
            }
            if (price > 10000) {
                result += `${Math.floor(price / 10000)}만 `
                price %= 10000;
            }
            if (price > 0) {
                result += `${price} `
            }
            result += '원';

            return `${result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${sales.DEPOSIT ? '/월' : ''}`;

            // var num = new Number(sales);

            // if(num == 0){
            //     return '';   
            // }else{
            //     return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,");
            // }
        },
    },
    data() {
        return {
            aptsale: {},
        }
    },
}
</script>

<style>
    div.bor {
        border: 1px solid black;
    }

    .juk-leftdevide {
        border-right: 1px solid #aeaeae;
    }

    .juk-maindivide {
        border-top: 2px solid #424242;
        border-bottom: 1px solid #AEAEAE;
    }

    .juk-bottomdivide {
        border-bottom: 1px solid #AEAEAE;
    }
</style>