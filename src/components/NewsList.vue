<template>
  <div>
    <div v-for="news in newsList" :key="news.originallink">
      <a :href="news.originallink">{{ news.title }}</a>
    </div>
    <button @click="getList">더보기</button>
  </div>
</template>

<script>
export default {
  beforeMount() {
    // (async () => {
    //   this.newsList = [...this.newsList, ...(await axios({
    //     url: `${this.$store.state.serverLocation}/newsList?start=${this.currerntPage}`
    //   })).data];
    // })();
    this.getList();
  },
  components: {
  },
  data() {
    return {
      newsList: [],
      currentPage: 1,
    }
  },
  methods: {
    async getList() {
      this.newsList = [...this.newsList, ...(await axios({
        url: `${this.$store.state.serverLocation}/newsList?start=${this.currentPage}`
      })).data];
      this.currentPage += 10;
    }
  }
}
</script>

<style>

</style>