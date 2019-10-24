<template>
    <v-app>
        <AgentMenu @agtPage="receivedPage"/>
        <v-container fluid class="white">
        <v-layout column>
            <v-flex>
                <component :is="agentpage" @agtPage="receivedPage"/>
            </v-flex>
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
        }
    },
    components: {
        AgentMenu,
        AgentSalesManage: () => import('@/components/agentpage/AgentSalesManage'),
        AgentOfferedList: () => import('@/components/agentpage/AgentOfferedList'),
        AgentModify: () => import('@/components/agentpage/AgentModify'),
        AgentSalesRegister: () => import('@/components/agentpage/AgentSalesRegister'),
    },
    methods:{
        receivedPage(page){
            this.$router.push(`/agentpage/${page}`);
            this.agentpage = page;
        }
    }
}
</script>