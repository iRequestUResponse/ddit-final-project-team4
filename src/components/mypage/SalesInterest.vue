<template>
    <v-container>
        <v-row>
            <v-col 
                v-for="sales in salesItemList"
                :key="sales.APTSALES_NUM"
                cols="3"
                @click="viewSales(sales.APTSALES_NUM)"
            >
                <v-card outlined>
                    <v-img
                        :src="sales.PHOTO_PATH"
                        height="200px"
                    />

                    <v-card-title>
                        <div>{{ sales.SALES_TITLE }}</div>
                    </v-card-title>
                    <v-card-text>
                        <div>{{ sales.PYEONG }}평 {{ sales.RELEVANT_FLOOR }}층/{{ sales.WHOLE_FLOOR }}층</div>
                        <div>{{ sales.APT_NAME }} {{ sales.DONG }}</div>
                        <div>{{ sales.SALES_CONT }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
    #app {
        background-color: white;
    }
</style>

<script>
export default {
    beforeMount() {
        (async () => {
            this.salesList = (await axios({
                url: `${this.serverLocation}/mpSalesInterList`
            })).data;
        })();
    },
    data() {
        return {
            salesList: [],
            trans: {},
        }
    },
    computed: {
        salesItemList() {
            return this.salesList.filter(e => e.BLACK_STATUS === 'N');
        },
    },
    methods: {
        viewSales(aptSalesNum) {
            this.trans.aptSalesNum = aptSalesNum;
            this.trans.page = 'SalesDetail';
            
            this.$emit('receivedPage', this.trans);
        }
    }
}
</script>