<template>
  <div>
    <component
      :is="view"
      @selectAddress="setAddress"
      @photo-add="photoAdd"
      @photo-remove="photoRemove"
      @sales_type-changed="info.sales_type = $event"
      @price-changed="info.price = $event"
      @deposit-changed="info.deposit = $event"
      @pyeong-changed="info.pyeong = $event"
      @whole_floor-changed="info.whole_floor = $event"
      @relevant_floor-changed="info.relevant_floor = $event"
      @dong-changed="info.dong = $event"
      @direction-changed="info.direction = $event"
      @utility_cost-changed="info.utility_cost = $event"
      @availability_date-changed="info.availability_date = $event"
      @sales_title-changed="info.sales_title = $event"
      @sales_cont-changed="info.sales_cont = $event"
    />
    <div class="d-flex justify-center my-12">
      <v-btn 
        @click="prev" 
        v-if="step > 0"
        width="100px"
        height="50px"
        color="grey darken-2"
        class="mr-4 title"
        outlined
        tile
      >
        이전
      </v-btn>
      <v-btn 
        @click="next" 
        v-if="step < views.length - 1"
        width="100px"
        height="50px"
        color="grey darken-2"
        class="title"
        outlined
        tile
      >
        다음
      </v-btn>
      <v-btn 
        v-if="step === views.length - 1" 
        @click="submit"
        width="100px"
        height="50px"
        color="grey darken-2"
        class="title"
        outlined
        tile
      >
        완료
      </v-btn>
    </div>
  </div>
</template>

<script>
import Address from '@/components/agentpage/salesRegister/apartment/Address';
import Photos from '@/components/agentpage/salesRegister/apartment/Photos';
import Texts from '@/components/agentpage/salesRegister/apartment/Texts';

export default {
  data() {
    return {
      views: [
        {
          name: 'Address',
          condition: () => {
            // return true;
            return this.info.apt_seq;
          }
        },
        {
          name: 'Photos',
          condition: () => {
            // return true;
            return this.photoList.length > 0;
          }
        },
        {
          name: 'Texts',
          condition: () => {
            // return true;
            return this.info.apt_seq
            && this.photoList.length > 0
            && this.info.sales_type
            && this.info.price
            && this.info.pyeong
            && this.info.whole_floor
            && this.info.relevant_floor
            && this.info.dong
            && this.info.direction
            && this.info.utility_cost
            && this.info.availability_date
            && this.info.sales_title
            && this.info.sales_cont;
          }
        },
      ],
      step: 0,
      info: {
        apt_seq: '',
        // apt_seq: 16622,
        // agentid: '', // session에서 가져오기
        sales_type: '매매',
        price: '',
        deposit: '',
        pyeong: '',
        whole_floor: '',
        relevant_floor: '',
        dong: '',
        direction: '',
        utility_cost: '',
        availability_date: '',
        sales_title: '',
        sales_cont: '',
        // price: '200000000',
        // deposit: '',
        // pyeong: '34',
        // whole_floor: '12',
        // relevant_floor: '4',
        // dong: '404',
        // direction: '남향',
        // utility_cost: '45000',
        // availability_date: '2022-12-14',
        // sales_title: '404 notfound!',
        // sales_cont: '요청 경로가 올바르지 않습니다 :(',
        // interest_cnt: '',
        // view_cnt: '',
        sales_lng: '',
        sales_lat: '',
        // sales_lng: '127.4517824445673',
        // sales_lat: '36.35413272187953',
        // etc
        apt_name: '',
        address: '',
        // apt_name: '평화',
        // address: '대전광역시 동구 가양동 비래서로62번길 5',
      },
      photoList: [],
      // photoList: ['agent/1571792278620test.png;test.png'],
    };
  },
  methods: {
    next() {
      if (this.step < this.views.length - 1 && this.views[this.step].condition()) {
        this.step = this.step + 1;
      } else {
        // 미입력 후 다음버튼 누를 때
        this.$swal('내용을 입력해주세요');
      }
    },
    prev() {
      if (this.step > 0) {
        this.step = this.step - 1;
      }
    },
    async submit() {
      if (this.views[this.views.length - 1].condition()) {
        let result = await axios.post(`${this.serverLocation}/apt/register`, { ...this.info, photoList: this.photoList });
        let [done, all] = result.data.split('/');
        if (done === all) {
          this.$swal('등록이 완료되었습니다!');
          this.$router.push('/agentpage');
          location.reload();
        } else {
          this.$swal('등록하지 못했습니다. 입력되지 않은 사항이 있는지 확인해주세요.');
        }
      }
    },
    setAddress(e) {
      this.info.apt_name = e.APT_NAME;
      this.info.apt_seq = e.APT_SEQ;
      this.info.address = e.APT_ADDR;
      this.info.sales_lng = e.APT_LNG;
      this.info.sales_lat = e.APT_LAT;
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
  .bor {
    border: 1px solid black;
  }
</style>