<template>
  <div>
    <h1>매물등록</h1>
    <v-tabs>
      <v-tab @click="tab('Apartment')">아파트</v-tab>
      <v-tab @click="tab('Oneroom')">원룸/투룸</v-tab>
    </v-tabs>
    <component :is="component" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      component: 'Apartment'
    };
  },
  components: {
    Apartment: () => import('@/components/agentpage/salesRegister/Apartment'),
    Oneroom: () => import('@/components/agentpage/salesRegister/Oneroom'),
  },
  methods: {
    tab(cmp) {
      this.component = cmp;
    },
  }
}
</script>

<style scoped>

</style>