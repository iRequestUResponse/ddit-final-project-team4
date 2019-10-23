<template>
  <v-container class="my-10">
        <v-row v-if="this.noticeList.length === 0" class="juk-empty_content" align="center">
            <v-col>
                <div class="title text-center">내용이 없습니다.</div>
            </v-col>
        </v-row>
        <v-simple-table v-else class="juk-uri_table">
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">제목</th>
                    <th class="text-center">날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="notice in noticeList" :key="notice.originallink">
                    <td class="text-center">{{ notice.NOTICE_TITLE }}</td>
                    <td class="text-center">{{ notice.NOTICE_DATE.substring(0,10) }}</td>
                </tr>
            </tbody>
        </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
  beforeMount() {
    (async () => {
      this.noticeList = (await axios({
        url: `${this.serverLocation}/noticeList`
      })).data;
    })();
  },
  components: {
  },
  data() {
    return {
      noticeList: [],
    }
  },
  methods: {
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