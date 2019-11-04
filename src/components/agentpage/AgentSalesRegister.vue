<template>
  <div class="pa-0">
    <v-row 
      align="center"
      justify="center"
      style="height: 240px;"
      class="ma-0"
    >
      <p class="display-2 black--text mt-12">매물등록</p>
    </v-row>
    <v-row class="ma-0" justify="center">
      <v-col class="pa-0 mb-10" cols="10">
        <v-tabs
          color="black"
          background-color="transparent"
          height="76"
          slider-size="4"
          grow
        >
          <v-tab class="headline bottom-border" @click="tab('Apartment')">아파트</v-tab>
          <v-tab class="headline bottom-border" @click="tab('Oneroom')">원룸/투룸</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row 
      justify="center"
      style="min-height: 800px;"
    >
      <v-col cols="10">
        <component :is="component" />
      </v-col>
    </v-row>
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
  .bottom-border {
    border-bottom: 1px solid #aeaeae;
  }

  .bor {
    border: 1px solid black;
  }
</style>