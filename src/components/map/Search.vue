<template>
  <div id="search">
    <v-app :class="{wrapper: true, 'open-filter': openFilter}">
      <v-container>
        <v-row>
          <v-col @keydown.stop="getSearchList">
            <v-combobox
              :label="`${filterType} 검색`"
              v-model="searchKeyword"
              :items="searchList.keywordList"
              @click="openFilter = true; searchList.keywordList = []"
              @change="selectKeyword"
            />
          </v-col>
        </v-row>
        <v-row v-if="openFilter">
          <v-container>
            <v-row>
              <v-btn
                @click="openFilter = false"
                v-text="'필터 닫기'"
                block
                text
                color="deep-purple accent-4"
              />
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="items.type"
                  v-model="filterType"
                />
              </v-col>
              <v-col>
                <v-select
                  :items="items.method"
                  v-model="filterMethod"
                />
              </v-col>
            </v-row>
            <v-row v-if="filterMethod === '월세'">
              <v-col>
                <v-range-slider
                  label="보증금"
                  v-model="filterDeposit"
                  min="50"
                  max="20000"
                />
              </v-col>
            </v-row>
            <v-row v-if="filterMethod === '월세'">
              <v-col>
                보증금 : {{ rangedDeposit }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-range-slider
                  :label="label"
                  v-model="filterPrice"
                  :min="minPrice"
                  :max="maxPrice"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                {{ label }} : {{ rangedPrice }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-range-slider
                  label="면적"
                  v-model="filterArea"
                  min="5"
                  max="150"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                면적 : {{ rangedArea }}
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openFilter: false,
      searchKeyword: '',
      filterType: '아파트',
      filterMethod: '매매',
      label: '가격대',
      minPrice: 1000,
      maxPrice: 2000000,
      filterPrice: [0, 2000000],
      filterDeposit: [50, 20000],
      filterArea: [5, 150],
      items: {
        type: ['아파트', '원룸/투룸'],
        method: ['매매', '전세'],
      },
      searchList: {
        keywordList: [],
        list: [],
        type: '',
      }
    };
  },
  watch: {
    filterType(nv) {
      if (nv === '아파트') {
        this.items.method = ['매매', '전세'];
        this.filterMethod = '매매';
      } else {
        this.items.method = ['전세', '월세'];
        this.filterMethod = '전세';
      }
    },
    filterMethod(nv) {
      if (nv === '매매') {
        this.label = '가격대';
        this.minPrice = 1000;
        this.maxPrice = 2000000;
        this.filterPrice = [1000, 2000000];
      } else if (nv === '전세') {
        this.label = '전세값';
        this.minPrice = 1000;
        this.maxPrice = 2000000;
        this.filterPrice = [0, 2000000];
      } else {
        this.label = '월세';
        this.minPrice = 0;
        this.maxPrice = 2000;
        this.filterPrice = [0, 2000];
      }
    }
  },
  computed: {
    rangedPrice() {
      let [min, max] = this.filterPrice.map(e => {
        let prefix = '';
        if (e > 10000) {
          prefix = Math.floor(e / 10000) + '억 ';
          e %= 10000;
        }
        return prefix + (e + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      });
      return `${min}만 ~ ${max}만 원`;
    },
    rangedArea() {
      let [min, max] = this.filterArea;
      return `${min} ~ ${max} 평`;
    },
    rangedDeposit() {
      let [min, max] = this.filterDeposit.map(e => {
        let prefix = '';
        if (e > 10000) {
          prefix = Math.floor(e / 10000) + '억 ';
          e %= 10000;
        }
        return prefix + (e + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      });
      return `${min}만 ~ ${max}만 원`;
    },
  },
  methods: {
    getSearchList(event) {
      if (event.code !== 'Enter') return;
      navigator.geolocation.getCurrentPosition(async res => {

        let result = (await axios({
          url: `${this.serverLocation}/searchAptList?lat=${res.coords.latitude}&lng=${res.coords.longitude}&query=${this.searchKeyword}`
        })).data;

        this.searchList.list = result.list;
        this.searchList.keywordList = result.areaList.map(e => e.AREA);
        this.searchList.keywordList = [...this.searchList.keywordList, ...result.nameList.map(e => e.ADDR + ' : ' + e.NAME)];
      });
    },
    async selectKeyword(keyword) {
      if (!this.searchList.keywordList.includes(keyword)) return;

      navigator.geolocation.getCurrentPosition(async res => {

        let result = (await axios({
          url: `${this.serverLocation}/searchApt/${this.searchKeyword}`
        })).data;

        console.log(result);
      });
    }
  }
}
</script>

<style scoped>
#search,
#search > .wrapper {
  background:rgba(255, 255, 255, 0.98);
}

#search > .wrapper {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 350px;
  height: 100px;
  /* background: #FFF; */
  transition: .4s ease;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}

#search > .wrapper.open-filter {
  height: 650px;
}
</style>