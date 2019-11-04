<template>
  <v-container class="juk-contpadding">
    <v-row class="juk-maindivide py-1 pl-4">
      <v-col>{{ notice.NOTICE_TITLE }}</v-col>
    </v-row>
    <v-row class="juk-bottomdivide py-1">
      <v-col cols="3" class="pl-7">작성자 : {{ notice.ADMINID }}</v-col>
      <v-spacer/>
      <v-col cols="3">
        <div class="text-right pr-8">
          작성일 : {{ notice.NOTICE_DATE | datefmt }}
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-8 px-8">
      <v-card min-height="500" flat tile>
        <div class="sub-title px-2" v-html="noticeCont(notice.NOTICE_CONT)"></div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    mounted() {
      let notice_seq = this.$route.params.seq;
      (async () => {
        let notice = (await axios.get(`${this.serverLocation}/notice/${notice_seq}`)).data;
        this.notice = notice;
      })();
    },
    data: () => ({
      notice: {},
    }),
    filters: {
      datefmt(value) {
        return value.substring(0, 10);
      },
    },
    methods: {
      noticeCont(v) {
        return v.replace(/src="/g, 'src="http://192.168.0.136:8081');
      }
    }
  }
</script>

<style scoped>
  div.bor {
    border: 1px solid black;
  }

  .juk-leftdevide {
    border-right: 1px solid #aeaeae;
  }

  .juk-maindivide {
    border-top: 2px solid #424242;
    border-bottom: 1px solid #AEAEAE;
  }

  .juk-bottomdivide {
    border-bottom: 1px solid #AEAEAE;
  }

  .juk-contpadding {
    padding: 0px 170px;
  }
</style>