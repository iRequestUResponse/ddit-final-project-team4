<template>
    <v-app>
        <AgentMenu @agtPage="receivedPage"/>
        <v-container fluid class="white">
        <v-layout column>
            <div class="px-0">
                <v-row class="pa-0 ma-0" justify="center">
                    <v-col class="pa-0" cols="10">
                        <component :is="agentpage" :offerNum="offerhouse_seq" @agtPage="receivedPage" @receivedPage="switchScreen" />
                    </v-col>
                </v-row>
            </div>
        </v-layout>
        </v-container>
    </v-app>
</template>

<style>

</style>

<script>
import AgentMenu from '@/components/agentpage/AgentMenu';

export default {
    beforeMount() {
        window.addEventListener('popstate', () => {
            this.agentpage = this.$route.params.name;
        });
    },
    data() {
        return {
            agentpage: this.$route.params.name || 'AgentSalesManage',
            offerhouse_seq: 0,
        }
    },
    components: {
        AgentMenu,
        AgentSalesManage: () => import('@/components/agentpage/AgentSalesManage'),
        AgentOfferedList: () => import('@/components/agentpage/AgentOfferedList'),
        AgentModify: () => import('@/components/agentpage/AgentModify'),
        AgentSalesRegister: () => import('@/components/agentpage/AgentSalesRegister'),
        OfferDetail: () => import('@/components/agentpage/OfferDetail'),
    },
    methods:{
        receivedPage(page){
            this.$router.push(`/agentpage/${page}`);
            this.agentpage = page;
        },
        switchScreen(convertPage) {
            this.offerhouse_seq = convertPage.offerhouse_seq;
            console.log(convertPage)
            this.agentpage = convertPage.page;
        }
    }
}
</script>