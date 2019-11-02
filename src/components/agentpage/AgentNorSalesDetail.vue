<template>
    <v-container class="px-auto">
        <v-row 
            align="center"
            justify="center"
            style="height: 300px;"
            class="ma-0 "
        >
            <p class="display-2 black--text">매물관리</p>
        </v-row>
        <v-row class="pl-4 my-4">
            <v-col cols="12" md="4">
                <div class="juk-leftdevide">
                    <div class="grey--text">
                        거래유형 / 금액
                    </div>
                    <div class="display-1">
                        {{ norsale.SALES_TYPE }} {{ norsale | comma }}
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="2">
                <div class="juk-leftdevide">
                    <div class="grey--text">
                        면적
                    </div>
                    <div class="display-1">
                        {{ norsale.AREA }}평
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="2">
                <div class="juk-leftdevide">
                    <div class="grey--text">
                        방형태
                    </div>
                    <div class="display-1 jukBtnColor-font">
                        {{ norsale.BUILD_TYPE }}
                    </div>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="2" class="d-flex align-center title">
                <v-icon>
                    person
                </v-icon>
                <div class="pl-2">
                    {{ norsale.AGENT_NAME }}
                </div>
                <div class="pl-2 jukBtnColor-font">
                    {{ norsale.AGENT_PHONE }}
                </div>
            </v-col>
        </v-row>
        <v-row class="juk-maindivide py-1">
            <v-col>{{ norsale.SALES_TITLE }}</v-col>
        </v-row>
        <v-row class="juk-bottomdivide py-1">
            <v-col>주소 : {{ norsale.ADDRESS }}</v-col>
        </v-row>
        <v-row class="juk-bottomdivide py-1">
            <v-col cols="3">해당층/전체층 : {{ norsale.RELEVANT_FLOOR }}층/{{ norsale.WHOLE_FLOOR }}층</v-col>
            <v-col cols="3">구조 : {{ norsale.STRUCTURE }}</v-col>
            <v-col cols="3">준공년도 : {{ norsale.COMPLETION_DATE }}년</v-col>
            <v-col cols="3">입주가능일 : {{ norsale.AVAILABILITY_DATE }}</v-col>
        </v-row>
        <v-row class="juk-bottomdivide py-4">
            <v-col cols="12">
                <div class="headline text-center">옵션</div>
            </v-col>
            <v-col v-for="option in norsale.optionlist" :key="option.OPTION_SEQ" cols="2" class="text-center">
                <v-icon>{{ optionIconMapping[option.OPTION_CODE]}}</v-icon>
                {{ optionMapping[option.OPTION_CODE] }}
            </v-col>
        </v-row>
        <v-row justify="center" class="px-12">
            <v-col cols="12" sm="12" md="8">
                <v-container>
                    <v-row>
                        <v-col
                            v-for="photo in norsale.photolist"
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
                    {{ norsale.SALES_CONT }}
                </div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['offerNum'],
    beforeMount() {
        (async () => {
            let result = (await axios({
                url: `${this.serverLocation}/mpGetNorSalesDetail?num=${this.offerNum}`
            })).data;

            let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e => new Date(e));
            result.COMPLETION_DATE = `${completeionDate.getFullYear()}`;
            result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;

            this.norsale = result;
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
            norsale: {},
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

    .jukBtnColor {
        background-color: #1669F7 !important;
    }

    .jukBtnColor-font {
        color: #1669F7 !important;
    }
</style>