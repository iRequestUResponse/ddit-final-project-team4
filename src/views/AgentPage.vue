<template>
    <v-app>
        <AgentMenu @agtPage="receivedPage"/>
        <v-container fluid class="white">
        <v-layout column>
            <v-flex>
                <component :is="agentpage"/>
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
    data() {
        return {
            agentpage: 'AgentSalesManage',
        }
    },
    components: {
        AgentMenu,
        AgentSalesManage: () => import('@/components/agentpage/AgentSalesManage'),
        AgentOfferedList: () => import('@/components/agentpage/AgentOfferedList'),
        AgentModify: () => import('@/components/agentpage/AgentModify'),
    },
    methods:{
        receivedPage(page){
            this.agentpage = page;
        }
    }
}
</script>