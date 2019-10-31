<template>
  <div>
    <v-container>
      <v-row>
        <h2>기본정보</h2>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-select
            :items="['원룸', '투룸']"
            v-model="build_type"
            label="선택(원룸/투룸)"
            required
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            label="매물 제목"
            v-model="sales_title"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="availability_date"
                label="입주가능일"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="availability_date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="4">
          <v-menu
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="completion_date"
                label="완공일"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="completion_date" @input="menu3 = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-select
            :items="['매매', '전세', '월세']"
            v-model="sales_type"
            label="거래유형"
          />
        </v-col>
        <v-col v-if="sales_type != ''" cols="3">
          <v-text-field
            :label="typeLabel"
            v-model="price"
          />
        </v-col>
        <v-col v-if="sales_type === '월세'" cols="3">
          <v-text-field
            v-if="sales_type != ''"
            label="보증금"
            v-model="deposit"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-text-field
            label="평수"
            v-model="area"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-text-field
            label="해당 층"
            v-model="relevant_floor"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="전체 층"
            v-model="whole_floor"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-text-field
            label="관리비"
            v-model="utility_cost"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            label="상세내용"
            v-model="sales_cont"
            auto-grow
            rows="1"
            row-height="15"
          />
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <h2>옵션선택</h2>
      </v-row>

      <v-row>
        <v-col
          v-for="(option, i) in optionList"
          :key="i"
          cols="2"
        >
          <v-checkbox
            v-model="selectedOptions"
            :label="option.label"
            :value="option.value"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      menu2: false,
      menu3: false,
      // info
      build_type: '',
      sales_type: '',
      price: '',
      completion_date: '',
      deposit: '',
      area: '',
      whole_floor: '',
      relevant_floor: '',
      utility_cost: '',
      availability_date: '',
      sales_title: '',
      sales_cont: '',
      optionList: [
        { label: '주차장', value: 1 },
        { label: '엘리베이터', value: 2 },
        { label: '반려동물', value: 3 },
        { label: '전세대출', value: 4 },
        { label: '에어컨', value: 5 },
        { label: '냉장고', value: 6 },
        { label: '세탁기', value: 7 },
        { label: '가스레인지', value: 8 },
        { label: '전자레인지', value: 9 },
        { label: '책장', value: 10 },
        { label: '책상', value: 11 },
        { label: '옷장', value: 12 },
        { label: '침대', value: 13 },
        { label: '신발장', value: 14 },
        { label: '싱크대', value: 15 },
      ],
      selectedOptions: [],
    };
  },
  watch: {
    build_type(n) {
      this.$emit('build_type-changed', n);
    },
    sales_type(n) {
      this.$emit('sales_type-changed', n);
    },
    price(n) {
      this.$emit('price-changed', n);
    },
    completion_date(n) {
      this.$emit('completion_date-changed', n);
    },
    deposit(n) {
      this.$emit('deposit-changed', n);
    },
    area(n) {
      this.$emit('area-changed', n);
    },
    whole_floor(n) {
      this.$emit('whole_floor-changed', n);
    },
    relevant_floor(n) {
      this.$emit('relevant_floor-changed', n);
    },
    utility_cost(n) {
      this.$emit('utility_cost-changed', n);
    },
    availability_date(n) {
      this.$emit('availability_date-changed', n);
    },
    sales_title(n) {
      this.$emit('sales_title-changed', n);
    },
    sales_cont(n) {
      this.$emit('sales_cont-changed', n);
    },
    selectedOptions(n) {
      this.$emit('selectedOptions-changed', n);
    },
  },
  computed: {
    typeLabel() {
      return this.sales_type + '가';
    }
  },
}
</script>

<style>

</style>