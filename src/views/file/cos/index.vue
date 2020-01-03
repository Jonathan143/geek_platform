<template>
  <d2-container>
    <template #header>
      <el-select v-model="bucket"
        filterable
        placeholder="请选择">
        <el-option v-for="item in bucketList"
          :key="item.Location"
          :label="item.Name"
          :value="item.Location">
        </el-option>
      </el-select>
    </template>

    <el-upload class="upload-demo"
      drag
      :auto-upload="false"
      :headers="headers"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :on-change="onUploadChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </d2-container>
</template>

<script>
import { reFetchBucketList, reFetchCosCredential } from '@/api/file'
export default {
  components: {},
  props: {},
  data() {
    return {
      bucketList: [
        {
          Name: 'img-1256555015',
          Location: 'ap-guangzhou',
          CreationDate: '2018-12-05T10:46:10Z'
        },
        {
          Name: 'yun-1256555015',
          Location: 'ap-chengdu',
          CreationDate: '2018-10-09T10:06:38Z'
        }
      ],
      bucket: '',
      a: {
        expiredTime: 1578043902,
        expiration: '2020-01-03T09:31:42Z',
        credentials: {
          sessionToken:
            '12mffOT3VF81e9X8Si5m3V6PI7TYFptD38fa8c999f85f92ca3738d8fd5bfb10dzdzUbUr6FGLDiDFy7zRyRXkE6PKYptzkduKVT25bz-LF65h_xOuSTOAYhKnPT8mQFo-rMQOI1vW3Xhx70BrFlVBRpqce6URItKTaAZ88c0hQBa6eRW8Iqbnzf2vmDyjPkstylRXdzDlfOGyuUL76bTewLVVCuaeS3I9nIQ6JR_MvJt4Kq2li-glBgtZi6SC68aDULfmRA5v0sE1XfJBZOhU7yhLzitfF-PmEqNnTgwSUPfNhTwwxoWOVprMABwD-v5PVncl1awGsklnYoKF65sZakpHx5bCTSw_VArF0yx3RZoRds_Hw0-D3prixCWBU7kvXOfiPgWTRBKak6Kic6wHzUQGwq6MlUtahN7LaHzpjfQ0QbsNgtvLQYqq1W_cCAt1wL051X61C3UWXgduwKBugnHbY2V0mc2ivlm2I-V6HXUPE627HFmX5JbZGKmS-je7-Igc7ps2Q3cIA4JzuHA',
          tmpSecretId:
            'AKIDZrW9byJs3joVh88XzmZo_NkiDZP8fDwSBTgy-wJ-RPmy0K4C65mqm_viSrmrBEEU',
          tmpSecretKey: 'Oh80vmdgNpGcfZ5ACHKraS2cHzFwvk00ASpO6noxJOI='
        },
        requestId: '2d36167e-20af-484b-be72-606366623078',
        startTime: 1578042102
      }
    }
  },
  computed: {
    headers() {
      const { credentials } = this.a
      if (credentials) {
        const { tmpSecretId, tmpSecretKey, sessionToken } = credentials
        const signature = window.CosAuth({
          SecretId: tmpSecretId,
          SecretKey: tmpSecretKey,
          Method: 'POST',
          Pathname: '/'
        })
        return {
          signature,
          'x-cos-security-token': sessionToken
        }
      }
      return {}
    }
  },
  methods: {
    onUploadChange(file) {
      console.log(file)
    }
  },
  mounted() {
    this.bucket = this.bucketList[0].Location
  }
}
</script>

<style lang="scss" scoped>
</style>
