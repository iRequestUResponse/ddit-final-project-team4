<template>
  <div>
    {{ notice }}
  </div>
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
}
</script>

<style>

</style>