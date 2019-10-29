<template>
  <v-container id="specification" class="pa-0 ma-0 overflow-y-auto" style="height: 100vh">
    <v-row class="juk-map_toparea pa-0 ma-0 "> 
      <router-link class="logo pa-4" to="/">죽방</router-link>
    </v-row>
    <component
      :is="mapPage"
      :aptNum="aptSalesNum"
      @receivedPage="switchScreen"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      mapPage: 'AptInfo',
      aptSalesNum: 0,
    }
  },
  
  components: {
    ReviewMain: () => import('@/components/map/review/ReviewMain'),
    AptInfo: () => import('@/components/map/apt/AptInfo'),
    AptSalesList: () => import('@/components/map/apt/AptSalesList'),
    AptSalesDetail: () => import('@/components/map/apt/AptSalesDetail'),
  },

  methods: {
    switchScreen(convertPage) {
      this.aptSalesNum = convertPage.aptSalesNum;
      this.mapPage = convertPage.page;
    }
  }
}
</script>

<style scoped>
#specification {
  position: fixed;
  right: 0;
  width: 500px;
  background: #FFF;
  height: 100vh;
}

a.logo {
  color: #FFF;
  font-size: 24pt;
  font-weight: bold;
  text-decoration: none;
}

.juk-map_toparea {
  background-color: #1564f9;
}

.bor {
  border: 1px solid black;
}
</style>