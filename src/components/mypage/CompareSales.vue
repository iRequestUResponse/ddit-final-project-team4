<template>
    <v-container fluid style="height: 600px;">
        <v-row>
            <v-col cols="6">
                <v-select
                    :items="salesList"
                    item-text="SALES_TITLE"
                    v-model="firstSales"
                    label="매물선택"
                    required
                    return-object
                    :rules="[v => !!v || '매물을 선택해주세요!']"
                    @change="select1stSales"
                ></v-select>
                <div v-if="firstSwitch">
                    <v-img
                        :src="firstSales.PHOTO_PATH"
                    />
                    <div class="headline text-center pa-4">{{ firstSales.SALES_TITLE }}</div>
                </div>
            </v-col>
            <v-col cols="6">
                <v-select
                    :items="salesList"
                    item-text="SALES_TITLE"
                    v-model="secondSales"
                    label="매물선택"
                    required
                    return-object
                    :rules="[v => !!v || '매물을 선택해주세요!']"
                    @change="select2ndSales"
                ></v-select>
                <div v-if="secondSwitch">
                    <v-img
                        :src="secondSales.PHOTO_PATH"
                    />
                    <div class="headline text-center pa-4">{{ secondSales.SALES_TITLE }}</div>
                </div>
            </v-col>
        </v-row>
        <v-row v-if="firstSwitch && secondSwitch" class="px-8 mb-10">
            <v-col cols="12">
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
                        <div class="text-right pt-1">{{ firstSales.PYEONG }}평</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="title text-center">면적</div>
                    </v-col>
                    <v-col cols="4">
                        <div class="text-left pt-1">{{ secondSales.PYEONG }}평</div>
                    </v-col>
                </v-row>
            </v-col>
            <!-- <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th colspan="3" class="text-center">기본정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ firstSales.APT_NAME }}</td>
                            <td>아파트명</td>
                            <td>{{ secondSales.APT_NAME }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table> -->
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