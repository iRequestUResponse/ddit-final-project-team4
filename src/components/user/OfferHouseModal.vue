<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h2>우리집 내놓기</h2>
          <button type="button" class="btn-close" @click="close">
            <h2>x</h2>
          </button>
        </slot>
      </header>
        <v-row>
          <v-col>
            <p>손쉽게 우리집 아파트의 견적을 받아 볼 수 있습니다.</p>
            <p>별도의 비용 없이 중개사와 매물 정보가 공유하여</p>
            <p>구체적인 정보를 알 수 있습니다.</p>
            <p>사진을 등록하시면 좀 더 정확한 견적을 확인 할 수 있습니다.</p>
          </v-col>
        </v-row>
        <h3 id="h3id">사진</h3>
        <img class="offerimg" src="@/assets/img/offerHouse.png">
        <div id="app">
          {{ filename }}
          <file-pond
              name="test"
              ref="pond"
              label-idle="파일 업로드 해주세요!!!"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png"
              :server="server"
              :files="myFiles"
              @init="handleFilePondInit"
              @processfile="onload"
          />
        </div>
         
        <h3 id="h3id">우리집 아파트</h3>
        <v-row class="fieldrow">
          <v-col cols="12" lg="8">
            <v-text-field ref="addr" id="addr" v-model="addr" label="주소" outlined
              class="juk-mu_text-field">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="fieldrow">
          <v-col cols="12" lg="8">
            <v-text-field ref="addr2" v-model="addr2" label="아파트이름" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>설명입력</p>
          </v-col>
        </v-row>
         <v-row class="fieldrow">
          <v-col cols="12" lg="4">
            <v-text-field ref="floor" v-model="floor" label="층입력(예:1층)" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
          
          <v-col cols="12" lg="4">
            <v-text-field ref="hosu" v-model="hosu" label="호수입력(예:111호)" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col>
            <p>설명입력</p>
          </v-col>
        </v-row>
         <v-row class="fieldrow">
          <v-col cols="12" lg="4">
            <v-text-field ref="area" v-model="area" label="면적(숫자입력)" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
        ㎡
          <v-col cols="12" lg="4">
            <v-text-field ref="pyeong" v-model="pyeong" label="평(숫자입력)" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
        평  
        </v-row>

        <v-row class= "cbrow">
            <v-checkbox id="cb1" v-model="checked1"></v-checkbox><p class="ptag">개인정보 수집 및 이용 동의(필수)</p> 
        </v-row> 
        <v-row class= "cbrow">
            <v-checkbox id="cb2" v-model="checked2"></v-checkbox><p class="ptag">개인정보의 제3자 제공 동의(필수)</p>
        </v-row>
      <section class="modal-body">
        <slot name="body">

        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">

          <button type="button" class="btn-green" @click="insertOfferHouse">
            우리집 내놓기
          </button>
          <button type="button" class="btn-gray" @click="close">
            취소하기
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
 
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
 
// Import FilePond plugins
// Please note that you need to install these plugins separately
 
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
  name: 'modal',
  beforeMount() {
    (async () => {
      let result = await axios({
        url: `${this.serverLocation}/check`
      });

      this.addr = result.data.user.USER_ADDR;

     })();
    },
  data() {
    return {
      result: {},
      addr: '',
      addr2: '',
      myFiles: [],  //미리 가져오는값
      server: {
          url: `http://192.168.0.121:9000/api/file/user`,
          revert: {
            onload: (e) => {
              console.log('revert', JSON.parse(e));
              this.revertFile(JSON.parse(e));
            }
          }
      },
      filename: '',
      checked1: false,
      checked2: false,
      floor: '',
      hosu: '',
      area: '',
      pyeong: '',
      fileList: [],
    }
  },
  methods: {
    revertFile(target) {
      this.fileList = this.fileList.filter(e => e !== target.targetList[0].filename);
    },
    close() {
      this.$emit('close');
    },
    handleFilePondInit: function() {
    // console.log('FilePond has initialized');

    // FilePond instance methods are available on `this.$refs.pond`
    // console.log(this.$refs.pond);
    },
    onload(error, result) {
      let info = JSON.parse(result.serverId);
      console.log(info);
      
      this.filename = info.files[0].filename
      this.fileList = [...this.fileList, this.filename];
    },
    insertOfferHouse() {
      if(this.checked1 === true && this.checked2 === true){
        axios({
          url: `${this.serverLocation}/insertOfferHouse`,
          method: 'POST',
          data: {
            hosu: this.hosu,
            floor: this.floor,
            area: this.area,
            pyeong: this.pyeong,
            addr: this.addr + ' ' + this.addr2,
            addr2: this.floor + ' ' + this.hosu,
            filename: this.filename,
            fileList: this.fileList,
          },
        })
        .then(res => {
          if (res.data === 1) {
            alert("우리집 내놓기 등록이 정상적으로 완료되었습니다.")
            this.$router.replace('/');
            this.$emit('close');
          }else if(res.data === 0){
            alert("서버에 등록 실패!!!")
          }
        })
      }else{
        alert('필수항목에 동의 해주세요!!!')
      }
    }
  },
  components:{
    FilePond
  }
};
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 80%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    margin-top: -30px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
  .btn-gray {
    color: white;
    background: darkgrey;
    border: 1px solid darkgrey;
    border-radius: 2px;
    width: 70%;
    height: 50px;
    margin: auto;
    margin-top: 10px;
    margin-left: 10px;
  }
  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    width: 70%;
    height: 50px;
    margin: auto;
    margin-top: 10px;
  }
  .offerimg {
    width: 50%;
  }
  .modal {
    padding: 30px;
  }
  #h3id {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .fieldrow {
    margin: -10px;
  }
  p {
    color: darkgray;
  }
  .cbrow {
    margin-top: 0px;
    margin-left: 1px;
  }
  .ptag {
    font-weight: bold;
    margin-top: 22px;
  }
  
</style>