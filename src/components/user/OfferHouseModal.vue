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
          <v-col id = "ptag1">
            <p>손쉽게 우리집 아파트의 견적을 받아 볼 수 있습니다.</p>
            <p>별도의 비용 없이 중개사와 매물 정보가 공유하여</p>
            <p>구체적인 정보를 알 수 있습니다.</p>
            <p>사진을 등록하시면 좀 더 정확한 견적을 확인 할 수 있습니다.</p>
          </v-col>
        </v-row>

        <img class="offerimg" src="@/assets/img/offerhouse_02.png">
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
              type="file"
              data-max-files="10"
          />
        </div>
         
        <h3 id="h3id">우리집 아파트</h3>
        <v-row class="fieldrow">
          <v-col cols="12" lg="8">
            <v-text-field ref="addr" id="addr" v-model="addr" label="주소" outlined disabled
              class="juk-mu_text-field">
            </v-text-field>
            </v-col>
            <v-col>
               <button type="button" id="addressbtn" class="btn-green" @click="doc_del_rendar">주소 검색</button>
            </v-col>
        </v-row>
        <v-row class="fieldrow">
          <v-col cols="12" lg="8">
            <v-text-field ref="addr2" v-model="addr2" label="아파트이름" outlined class="juk-mu_text-field" disabled>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>설명입력</p>
          </v-col>
        </v-row>
         <v-row class="fieldrow">
          <!-- 동입력 -->
          <v-col cols="12" lg="4">
            <v-text-field ref="hosu" v-model="dong" label="동입력(예:11동)" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
          <!-- 호입력 -->
          <v-col cols="12" lg="4">
            <v-text-field ref="hosu" v-model="hosu" label="호수입력(예:111호)" outlined class="juk-mu_text-field">
            </v-text-field>
          </v-col>
          <!-- 층입력 -->
          <v-col cols="12" lg="4">
            <v-text-field ref="floor" v-model="floor" label="층입력(예:1층)" outlined class="juk-mu_text-field">
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
    <div class="row">
      <modals-container
        @receiveJibun="receivedJibun"
        @receivebuilding="receivedBuilding"
      />
    </div>
  </div>

</template>

<script>
import DelPopup from './AddrModal.vue'
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

      window.addEventListener('FilePond:removefile', event => {
            this.filename = '';
      });
     })();
    },
  data() {
    return {
      result: {},
      addr: '',
      addr2: '',
      myFiles: [],  //미리 가져오는값
      server: {
          url: `${this.fileServer}/file/user`,
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
      dong: '',
      area: '',
      pyeong: '',
      fileList: [],
      uploadnum: 0,
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

    },
    onload(error, result) {

        let info = JSON.parse(result.serverId);
        console.log(info);
        
        this.filename = info.files[0].filename
        
        this.fileList = [...this.fileList, this.filename];
    },
    insertOfferHouse() {
      if(this.fileList.length > 10){
        alert("첨부파일 10개이상 금지!!!")
        return;
      }
      if(this.checked1 === true && this.checked2 === true){
        axios({
          url: `${this.serverLocation}/insertOfferHouse`,
          method: 'POST',
          data: {
            hosu: this.hosu,
            floor: this.floor,
            area: this.area,
            pyeong: this.pyeong,
            dong: this.dong,
            addr: this.addr,
            addr2: this.addr2 + ' ' + this.dong + ' ' + this.hosu + ' ' + this.floor + ' ',
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
          }else if(res.data === 2){
            alert("파일은 10개까지 등록 할 수 있습니다.")
            return;
          }
        })
      }else{
        alert('필수항목에 동의 해주세요!!!')
      }
    },
    doc_del_rendar(){
      this.$modal.show(
        DelPopup,{
        hot_table : 'data',
        modal : this.$modal },
        {
          name: 'dynamic-modal',
          width : '35%',
          height: '600px',
          scrollable: true,
        })
      },
      receivedJibun(jibun) {
        this.addr = jibun;
      },
      receivedBuilding(e) {
        this.addr2 = e;
      },
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
    height: 90%;
    margin-left: 400px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: rgba(121, 193, 202);
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
    color: rgba(121, 193, 202);
    background: transparent;
  }
  .greenbtn {
    background: rgba(121, 193, 202);
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
    background: rgba(121, 193, 202);
    border: 1px solid rgba(121, 193, 202);
    border-radius: 2px;
    width: 70%;
    height: 50px;
    margin: auto;
    margin-top: 10px;
  }
  .offerimg {
    width: 80%;
    margin-left: 60px;
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
  #addressbtn{
    margin-top: 2px;
  }
  #ptag1{
    margin-top: 20px;
    margin-left: 20px;
  }
  .filepond--panel-root {
    background-color: transparent;
    border: 2px solid #4a6bff;
  }
  @media (min-width: 50em) {
    .filepond--item {
      width: calc(48% - .5em);
      margin-left: 15px;
    }
  }
  #subimg{
    width: 20%;
  }
  #fileinput{
    width: 50%;
    margin-left: 400px;
  }

  
  
</style>