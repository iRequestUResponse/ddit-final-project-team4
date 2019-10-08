<template>
  <div>
    <HomeMenu />

    <div class="wrapper">
      <section class="statistics">
        <div class="container">
          <div class="statistics--item">
            <img src="@/assets/img/jukdongsuk.png" alt="">
          </div>
          <div class="statistics--search">
            <input type="text">
            <button>찾아보기</button>
          </div>
        </div>
      </section>

      <section>
        <v-container>
          <v-row>
            <v-col>
              <div class="title">계약요령</div>
              <div class="content"></div>
            </v-col>
            <v-col>
              <div class="title">뉴스</div>
              <div class="content"></div>
            </v-col>
            <v-col>
              <div class="title">공지사항</div>
              <div class="content"></div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </div>
</template>

<script>
import HomeMenu from '@/components/HomeMenu.vue';

export default {
  components: {
    HomeMenu,
  },
};
</script>
