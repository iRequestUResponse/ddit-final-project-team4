<template>
    <v-container>
        <div>매물관리 페이지</div>
        <a class="offset-md-1 juk-menu" @click="sendPage('AgentSalesRegister')">매물등록</a>
    </v-container>
</template>

<style>

</style>

<script>
export default {
  methods: {
    sendPage(e) {
      this.$emit('agtPage', e);
    }
  }
}
</script>