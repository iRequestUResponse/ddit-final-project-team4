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
                        :src="`//192.168.0.121:9000/api/file/${firstSales.PHOTO_PATH}`"
                        width="100%"
                    />
                    <div class="headline text-center pa-4">{{ firstSales.SALES_TITLE }}</div>
                    <div :class="[ firstSales.PRICE<secondSales.PRICE ? 'red--text display-1 text-center pr-12' : 'display-1 text-center pr-12']">
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
                        :src="`//192.168.0.121:9000/api/file/${secondSales.PHOTO_PATH}`"
                        width="100%"
                    />
                    <div class="headline text-center pa-4">{{ secondSales.SALES_TITLE }}</div>
                    <div :class="[ firstSales.PRICE>secondSales.PRICE ? 'red--text display-1 text-center pr-12' : 'display-1 text-center pr-12']">
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
                        <div class="text-right pt-1">{{ firstSales.STRUCTURE }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">구조</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.STRUCTURE }}</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div 
                            :class="[ firstSales.AREA>secondSales.AREA ? 'red--text text-right pt-1 text_bold' : 'text-right pt-1']"
                        >
                            {{ firstSales.AREA }}㎡
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">면적</div>
                    </v-col>
                    <v-col cols="4">
                        <div 
                            :class="[ firstSales.AREA<secondSales.AREA ? 'red--text text-left pt-1 text_bold' : 'text-left pt-1']"
                        >
                            {{ secondSales.AREA }}㎡
                        </div>
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
                        <div 
                            :class="[ firstSales.UTILITY_COST<secondSales.UTILITY_COST ? 'red--text text-right pt-1 text_bold' : 'text-right pt-1']"
                        >
                            {{ firstSales.UTILITY_COST | comm }}원
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">관리비</div>
                    </v-col>
                    <v-col cols="4">
                        <div 
                            :class="[ firstSales.UTILITY_COST>secondSales.UTILITY_COST ? 'red--text text-left pt-1 text_bold' : 'text-left pt-1']"
                        >
                            {{ secondSales.UTILITY_COST | comm }}원
                        </div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.COMPLETION_DATE.substring(0,10) }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">완공날짜</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.COMPLETION_DATE.substring(0,10) }}</div>
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
                <v-row class="bottom-subbor">
                    <v-col cols="4">
                        <div class="text-right pt-1">{{ firstSales.ADDRESS }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">주소</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.ADDRESS }}</div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="my-8" cols="12">
                <v-row class="bottom-bor">
                    <v-col cols="12">
                        <div class="headline text-center">옵션정보</div>
                    </v-col>
                </v-row>
                <v-row class="bottom-subbor" v-for="option in defaultOptions" :key="option">
                    <v-col cols="4">
                        <div :class="[ firstSales.optionlist.find(e => +e.OPTION_CODE === option) ? 'red--text text-right pt-1 text_bold' : 'text-right pt-1']">
                            {{ firstSales.optionlist.find(e => +e.OPTION_CODE === option) ? '유' : '무' }}
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">{{ optionMapping[option] }}</div>
                    </v-col>
                    <v-col cols="4">
                        <div :class="[ secondSales.optionlist.find(e => +e.OPTION_CODE === option) ? 'red--text text-left pt-1 text_bold' : 'text-left pt-1']">
                            {{ secondSales.optionlist.find(e => +e.OPTION_CODE === option) ? '유' : '무' }}
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <div
                            :class="[ firstSales.optionlist.length>secondSales.optionlist.length ? 'red--text text-right pt-1 text_bold' : 'text-right pt-1']"
                            v-for="foption in filteredOptionList(firstSales.optionlist)" 
                            :key="foption.OPTION_SEQ"
                        >
                            {{ options[foption.OPTION_CODE] }}
                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">옵션</div>
                    </v-col>
                    <v-col cols="4">
                        <div 
                            :class="[ firstSales.optionlist.length<secondSales.optionlist.length ? 'red--text text-left pt-1' : 'text-left pt-1']" 
                            v-for="soption in filteredOptionList(secondSales.optionlist)" 
                            :key="soption.OPTION_SEQ"
                        >
                            {{ options[soption.OPTION_CODE] }}
                        </div>
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
                url: `${this.serverLocation}/mpCompareNorSalesInterList`
            })).data;

            this.options = this.optionMapping;
        })();
    },
    data() {
        return {
            options: {},
            salesList: [],
            firstSales: {},
            secondSales: {},
            firstSwitch: false,
            secondSwitch: false,
            defaultOptions: [1, 2, 3, 4]
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
        },
    },
    methods: {
        select1stSales() {
            this.firstSwitch = true;
        },
        select2ndSales() {
            this.secondSwitch = true;
        },
        filteredOptionList(arr) {
            return arr.filter(e => !this.defaultOptions.includes(+e.OPTION_CODE));
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

    .text_bold {
        font-weight: bold;
    }
</style>