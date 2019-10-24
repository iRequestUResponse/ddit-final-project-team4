<template>
  <div class="container">
    <v-row>
      <v-col>
        <span class = "input-group-addon">
          <h2>주소검색</h2>
        </span>
      </v-col>
      <v-col id="imgff">
        <div class="flex-grow-1"></div>
        <img src="@/assets/img/iconX.png" @click="del_data">
      </v-col>
    </v-row>
    <hr>
    <vue-daum-postcode @complete="getAddress" />
    <input type="text" v-model="del_password" class="form-control col-md-2">

  </div>
</template>
<script>
import Vue from 'vue'
import VueDaumPostcode from "vue-daum-postcode"

Vue.use(VueDaumPostcode)

export default {
  data:function(){
      return {
        del_password:'',
      }
  },props : [
    'hot_table',
  ],methods : {
    del_data(){
        this.$emit('close')
    },
    getAddress(event) {
      console.log(event);

      this.addr = event.jibunAddress;
      console.log("보냈습니다!!!");
      if (!event.jibunAddress) {
          this.addr = event.autoJibunAddress;
      }
      this.$emit('receiveJibun', this.addr);
      this.$emit('receivebuilding', event.buildingName);

      this.$emit('close')
    },
  }
}
</script>

<style scoped>
  img {
    width: 30px;
    cursor: pointer;
  }
  #imgff {
    margin-right: -500px;
  }
  hr {
    margin-bottom: 50px;
  }
  .dynamic-modal{
    margin-left: 200px;
  }
</style>