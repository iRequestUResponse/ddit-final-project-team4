<template>
  <div>
    <router-link class="logo" to="/">죽방</router-link>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="ID"
              v-model="id"
            />
            <v-text-field
              type="password"
              label="비밀번호"
              counter
              v-model="pw"
            />
          </v-col>
        </v-row>
        <v-btn color="primary" @click="login">로그인</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  beforeMount() {
    (async () => {
      if (await this.loginCheck()) this.$router.push('/');
    })();
  },
  data() {
    return {
      id: '',
      pw: '',
    }
  },
  methods: {
    login() {
      axios({
        url: `${this.$store.state.serverLocation}/login`,
        method: 'POST',
        data: {
          id: this.id,
          pw: this.pw,
        },
      })
      .then(res => {
        if (res.data.length === 1) {
          this.$router.push('/');
        }
      })
    }
  }
}
</script>

<style>
a.logo {
    color: #1564f9;
    font-size: 24pt;
    font-weight: bold;
    text-decoration: none;
}
</style>