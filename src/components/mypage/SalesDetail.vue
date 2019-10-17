<template>
    <v-container class="px-auto bor">
        <v-row>
            <v-col cols="2">{{ aptsale.APT_NAME }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">{{ aptsale.SALES_TYPE }}/{{ aptsale.PRICE }}/{{ aptsale.DEPOSIT }}</v-col>
            <v-col cols="2">{{ aptsale.PYEONG }}평</v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">{{ aptsale.AGENTID }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">{{ aptsale.DONG }}</v-col>
            <v-col cols="2">{{ aptsale.DIRECTION }}</v-col>
        </v-row>
        <v-row>
            <v-col>{{ aptsale.SALES_TITLE }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4">해당층/전체층 : {{ aptsale.RELEVANT_FLOOR }}층/{{ aptsale.WHOLE_FLOOR }}층</v-col>
            <v-col cols="4">준공년도 : {{ aptsale.COMPLETION_DATE }}</v-col>
            <v-col cols="4">입주가능일 : {{ aptsale.AVAILABILITY_DATE }}</v-col>
        </v-row>
        <v-row justify="center">
            <v-col v-for="photo in aptsale.photolist" :key="photo.PHOTO_SEQ" cols="12">
                <v-img :src="photo.PHOTO_PATH" width="512px"></v-img>
            </v-col>
            <v-col cols="12">
                <v-content>{{ aptsale.SALES_CONT }}</v-content>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['aptNum'],
    beforeMount() {
        (async () => {
            let result = (await axios({
                url: `${this.$store.state.serverLocation}/mpGetAptSalesDetail?aptNum=${this.aptNum}`
            })).data;

            let [completeionDate, availability_date] = [result.COMPLETION_DATE, result.AVAILABILITY_DATE].map(e => new Date(e));
            result.COMPLETION_DATE = `${completeionDate.getFullYear()}.${completeionDate.getMonth() + 1}.${completeionDate.getDate()}`;
            result.AVAILABILITY_DATE = `${availability_date.getFullYear()}.${availability_date.getMonth() + 1}.${availability_date.getDate()}`;

            this.aptsale = result;
            console.log(this.aptsale);
        })();
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
</style>