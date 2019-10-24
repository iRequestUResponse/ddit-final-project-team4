<template>
  <div>
    <file-pond
      name="test"
      ref="pond"
      label-idle="파일을 업로드 해주세요"
      allow-multiple="true"
      max-file="2"
      accepted-file-types="image/jpeg, image/jpg, image/png"
      :server="server"
      :files="files"
      @processfile="onload"
      imagePreviewHeight="280px"
  />
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond';
 
import 'filepond/dist/filepond.min.css';
 
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      // filename: '',
      files: [],
      server: {
        url: `//192.168.0.121:9000/api/file/agent`,
        revert: {
          onload: (e) => {
            let info = JSON.parse(e);
            let path = `${info.path}/${info.targetList[0].filename};${info.targetList[0].originalname}`;
            this.$emit('photo-remove', path);
          },
        }
      },
    };
  },
  components: {
    FilePond: vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview),
  },
  methods: {
    onload(error, result) {
      let info = JSON.parse(result.serverId);
      // console.log(info);
      // this.filename = info.files[0].filename

      let path = `${info.path}/${info.files[0].filename};${info.files[0].originalname}`;
      // this.files.push(path);
      this.$emit('photo-add', path);
    },
  }
}
</script>

<style scoped>
.filepond--panel-root {
  background-color: transparent;
  border: 2px solid #4a6bff;
}
@media (min-width: 50em) {
  .filepond--item {
    width: calc(30% - .5em);
    margin-left: 50px;
  }
}
</style>