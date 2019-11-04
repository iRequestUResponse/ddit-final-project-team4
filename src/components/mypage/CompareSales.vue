<template>
    <v-container fluid style="height: 600px;">
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="4">
                <v-select
                    :items="salesList"
                    item-text="SALES_TITLE"
                    item-value="APTSALES_NUM"
                    v-model="firstSales"
                    label="매물선택"
                    required
                    return-object
                    :rules="[v => !!v || '매물을 선택해주세요!']"
                    @change="select1stSales"
                ></v-select>
              
                <div v-if="firstSwitch">
                    <img
                        :src="`${fileServer}/file/${firstSales.PHOTO_PATH}`"
                        width="100%"
                    />
                    <div class="headline text-center pa-4">{{ firstSales.SALES_TITLE }}</div>
                    <div :class="[ firstSales.PRICE<secondSales.PRICE ? 'blue--text display-1 text-center pr-12' : 'red--text display-1 text-center pr-12']">
                        ￦ {{ firstSales | comma }}
                    </div>
                    <!-- <div class="display-1 text-right pr-12">￦ {{ firstSales.PRICE | comma }}</div>
                    <div v-if="firstSales.DEPOSIT" class="subtitle-1 text-right pr-12">보증금 : {{ firstSales.DEPOSIT || comma }}</div> -->
                </div>
            </v-col>
            <v-spacer class="mx-12"></v-spacer>
            <v-col cols="4">
                <v-select
                    :items="salesList"
                    item-text="SALES_TITLE"
                    item-value="APTSALES_NUM"
                    v-model="secondSales"
                    label="매물선택"
                    required
                    return-object
                    :rules="[v => !!v || '매물을 선택해주세요!']"
                    @change="select2ndSales"
                ></v-select>
                <div v-if="secondSwitch">
                    <img
                        :src="`${fileServer}/file/${secondSales.PHOTO_PATH}`"
                        width="100%"
                    />
                    <div class="headline text-center pa-4">{{ secondSales.SALES_TITLE }}</div>
                    <div :class="[ firstSales.PRICE>secondSales.PRICE ? 'blue--text display-1 text-center pr-12' : 'red--text display-1 text-center pr-12']">
                        ￦ {{ secondSales | comma }}
                    </div>
                    <!-- <div class="display-1 text-right pr-12">￦ {{ secondSales.PRICE | comma }}</div> -->
                    <!-- <div v-if="secondSales.DEPOSIT" class="subtitle-1 text-right pr-12">보증금 : {{ secondSales | comma }}</div> -->
                </div>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="firstSwitch && secondSwitch" class="px-8 mt-8 mb-10">
            <v-col class="mt-8" cols="12">
                <v-row class="bottom-bor">
                    <v-col cols="12">
                        <div class="headline text-center">기본정보</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.APT_NAME }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">아파트명</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.APT_NAME }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.COMPLETION_DATE.substring(0,4) }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">완공년도</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.COMPLETION_DATE.substring(0,4) }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.APT_ADDR }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">주소</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.APT_ADDR }}</div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="my-8" cols="12">
                <v-row class="bottom-bor">
                    <v-col cols="12">
                        <div class="headline text-center">매물정보</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.SALES_TYPE }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">거래유형</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.SALES_TYPE }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.PYEONG }}평</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">면적</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.PYEONG }}평</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.DIRECTION }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">방향</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.DIRECTION }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.UTILITY_COST | comm }}원</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">관리비</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.UTILITY_COST | comm }}원</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.DONG }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">동</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.DONG }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.RELEVANT_FLOOR }}/{{ firstSales.WHOLE_FLOOR }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">(현재/전체)층</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.RELEVANT_FLOOR }}/{{ secondSales.WHOLE_FLOOR }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.AVAILABILITY_DATE.substring(0,10) }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">입주가능일</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.AVAILABILITY_DATE.substring(0,10) }}</div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>    
</template>

<script>
export default {
    beforeMount() {
        (async () => {
            this.salesList = (await axios({
                url: `${this.serverLocation}/mpSalesInterList`
            })).data;
            console.log(this.salesList);
        })();
    },
    data() {
        return {
            salesList: [],
            firstSales: {},
            secondSales: {},
            firstSwitch: false,
            secondSwitch: false,
        }
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
        },
        comm(value) {
            var num = new Number(value);

            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\,\d+)?$)/g, "$1,");
        }
    },
    methods: {
        select1stSales() {
            this.firstSwitch = true;
        },
        select2ndSales() {
            this.secondSwitch = true;
        }
    }
}
</script>

<style>
    .bottom-bor {
        border-bottom: 2px solid black;
    }

    .bottom-subbor {
        border-bottom: 1px solid #aeaeae;
    }
</style>