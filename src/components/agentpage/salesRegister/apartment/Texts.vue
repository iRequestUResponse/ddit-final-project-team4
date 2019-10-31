<template>
  <div>
    <v-container>
      <v-row>
        <h2>기본정보</h2>
      </v-row>

      <!-- 매물 제목 -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="매물 제목"
            v-model="sales_title"
          />
        </v-col>
      </v-row>

      <!-- 입주가능일 -->
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
      </v-row>

      <!-- 거래유형 -->
      <v-row>
        <v-col cols="3">
          <v-select
            :items="['매매', '전세', '월세']"
            v-model="sales_type"
            label="거래유형"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-if="sales_type != ''"
            :label="typeLabel"
            v-model="price"
          />
        </v-col>
        <v-col 
          v-if="sales_type === '월세'"
          cols="3"
        >
          <v-text-field
            label="보증금"
            v-model="deposit"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-text-field
            label="평수"
            v-model="pyeong"
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
            label="동"
            v-model="dong"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="방향(예: 남향)"
            v-model="direction"
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
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      menu2: false,
      // info
      sales_type: '',
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
    };
  },
  watch: {
    sales_type(n) {
      this.$emit('sales_type-changed', n);
    },
    price(n) {
      this.$emit('price-changed', n);
    },
    deposit(n) {
      this.$emit('deposit-changed', n);
    },
    pyeong(n) {
      this.$emit('pyeong-changed', n);
    },
    whole_floor(n) {
      this.$emit('whole_floor-changed', n);
    },
    relevant_floor(n) {
      this.$emit('relevant_floor-changed', n);
    },
    dong(n) {
      this.$emit('dong-changed', n);
    },
    direction(n) {
      this.$emit('direction-changed', n);
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