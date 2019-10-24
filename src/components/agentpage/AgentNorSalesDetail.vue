<template>
    <v-container class="px-auto bor">
        <v-row 
            align="center"
            justify="center"
            style="height: 300px;"
            class="ma-0 "
        >
            <p class="display-2 black--text">매물관리</p>
        </v-row>
        <v-row>
            <v-col cols="2">{{ norsale.SALES_TITLE }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">{{ norsale.SALES_TYPE }}/{{ norsale.PRICE }}/{{ norsale.DEPOSIT }}</v-col>
            <v-col cols="2">{{ norsale.AREA }}평</v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">{{ norsale.AGENTID }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">{{ norsale.STRUCTURE }}</v-col>
            <v-col cols="2">{{ norsale.UTILITY_COST }}원</v-col>
        </v-row>
        <v-row>
            <v-col>{{ norsale.SALES_TITLE }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4">해당층/전체층 : {{ norsale.RELEVANT_FLOOR }}층/{{ norsale.WHOLE_FLOOR }}층</v-col>
            <v-col cols="4">준공년도 : {{ norsale.COMPLETION_DATE }}</v-col>
            <v-col cols="4">입주가능일 : {{ norsale.AVAILABILITY_DATE }}</v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="photo in norsale.photolist" :key="photo.PHOTO_SEQ" cols="12">
                <v-img 
                    :src="`//192.168.0.121:9000/api/file/${photo.PHOTO_PATH}`" 
                    width="512px"
                ></v-img>
                
            </v-col>
            <v-col cols="12">
                <v-content>{{ norsale.SALES_CONT }}</v-content>
            </v-col>
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
            result.COMPLETION_DATE = `${completeionDate.getFullYear()}.${completeionDate.getMonth() + 1}.${completeionDate.getDate()}`;
            result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;

            this.norsale = result;
        })();
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
</style>