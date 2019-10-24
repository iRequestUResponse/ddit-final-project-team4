<template>
  <div>
    원룸 이름 : {{ info.apt_name }} <br>
    address : {{ info.address }} <br>
    info: {{ info }} <br>
    photoList: {{ photoList }} <br>
    selectedOptions: {{ selectedOptions }} <br>
    <component
      :is="view"
      @selectAddress="setAddress"
      @photo-add="photoAdd"
      @photo-remove="photoRemove"
      @build_type-changed="info.build_type = $event"
      @sales_type-changed="info.sales_type = $event"
      @price-changed="info.price = $event"
      @deposit-changed="info.deposit = $event"
      @area-changed="info.area = $event"
      @whole_floor-changed="info.whole_floor = $event"
      @relevant_floor-changed="info.relevant_floor = $event"
      @utility_cost-changed="info.utility_cost = $event"
      @availability_date-changed="info.availability_date = $event"
      @sales_title-changed="info.sales_title = $event"
      @sales_cont-changed="info.sales_cont = $event"
      @selectedOptions-changed="selectedOptions = $event"
    />
    <v-btn @click="prev" v-if="step > 0">이전</v-btn>
    <v-btn @click="next" v-if="step < views.length - 1">다음</v-btn>
    <v-btn v-if="step === views.length - 1" @click="submit">완료</v-btn>
  </div>
</template>

<script>
import Address from '@/components/agentpage/salesRegister/oneroom/Address';
import Photos from '@/components/agentpage/salesRegister/oneroom/Photos';
import Texts from '@/components/agentpage/salesRegister/oneroom/Texts';

export default {
  data() {
    return {
      views: [
        {
          name: 'Address',
          condition: () => {
            return true;
            // return this.info.address;
          }
        },
        {
          name: 'Photos',
          condition: () => {
            return true;
            // return this.photoList.length > 0;
          }
        },
        {
          name: 'Texts',
          condition: () => {
            // return true;
            return this.info.address
            && this.photoList.length > 0
            && this.info.sales_type
            && this.info.build_type
            && this.info.price
            && this.info.area
            && this.info.whole_floor
            && this.info.relevant_floor
            && this.info.utility_cost
            && this.info.availability_date
            && this.info.sales_title
            && this.info.sales_cont;
          }
        },
      ],
      step: 0,
      info: {
        // agentid: '', // session에서 가져오기
        build_type: '원룸',
        sales_type: '매매',
        price: '',
        deposit: '',
        area: '',
        structure: '',
        whole_floor: '',
        relevant_floor: '',
        utility_cost: '',
        availability_date: '',
        sales_title: '',
        sales_cont: '',
        sales_lng: '',
        sales_lat: '',
        // etc
        address: '',
      },
      photoList: [],
      selectedOptions: [],
    };
  },
  methods: {
    next() {
      if (this.step < this.views.length - 1 && this.views[this.step].condition()) {
        this.step = this.step + 1;
      }
    },
    prev() {
      if (this.step > 0) {
        this.step = this.step - 1;
      }
    },
    async submit() {
      if (this.views[this.views.length - 1].condition()) {
        let result = await axios.post(`${this.serverLocation}/normal/register`, { ...this.info, photoList: this.photoList, selectedOptions: this.selectedOptions });
        let [done, all] = result.data.split('/');
        if (done === all) {
          alert('등록이 완료되었습니다!');
          this.$router.push('/agentpage/AgentSalesManage');
        } else {
          alert('등록하지 못했습니다. 입력되지 않은 사항이 있는지 확인해주세요.');
        }
      }
    },
    setAddress(e) {
      console.log(e);
      this.info.address = e.address;
      this.info.sales_lng = e.lng;
      this.info.sales_lat = e.lat;
    },
    photoAdd(e) {
      this.photoList = [...this.photoList, e];
    },
    photoRemove(e) {
      this.photoList = this.photoList.filter(v => v !== e);
    },
  },
  computed: {
    view() {
      return this.views[this.step].name;
    }
  },
  components: {
    Address, Photos, Texts,
  },
}
</script>

<style>

</style>