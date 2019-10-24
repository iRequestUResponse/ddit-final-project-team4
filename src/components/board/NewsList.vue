<template>
  <v-container class="my-10">
        <v-row v-if="this.newsList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">내용이 없습니다.</div>
            </v-col>
        </v-row>
        <v-simple-table v-else class="juk-uri_table">
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">번호</th>
                    <th class="text-center">제목</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(news, index) in newsList" :key="news.originallink">
                    <td class="text-center">{{ index+1 }}</td>
                    <td class="text-center"><a :href="news.originallink">{{ news.title }}</a></td>
                </tr>
            </tbody>
        </template>
        </v-simple-table>
        <v-row justify="end" class="pa-4">
          <v-btn 
            color="grey darken-3"
            outlined
            tile
            @click="getList"
          >
            더보기
          </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
  beforeMount() {
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
        url: `${this.serverLocation}/newsList?start=${this.currentPage}`
      })).data];
      this.currentPage += 10;
    }
  }
}
</script>

<style>
  td > a {
    color: black !important;
    text-decoration: none;
  }

  .juk-uri_table {
    border-top: 2px solid #737373;
    border-bottom: 2px solid #d6d6d6;
  }
</style>