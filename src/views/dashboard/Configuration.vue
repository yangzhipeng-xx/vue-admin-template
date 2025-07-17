<template>
  <div class="config-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="150px"
    >
      <el-form-item label="轮播方式：">
        <el-select v-model="form.selectionMethod" placeholder="请选择轮播方式">
          <el-option
            v-for="item in screenConfig.method"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <template v-for="(item, index) in screenConfig.select_page">
        <el-form-item
          v-if="isAutoPlay"
          :key="item.id"
          :label="`第${index + 1}页轮播时间(S)：`"
        >
          <el-input
            v-model.number="form.times[index]"
            class="no-arrow-number-input"
            type="number"
            placeholder="请设置轮播时间"
            @input="handleInput($event)"
          />
        </el-form-item>
      </template>
      <el-form-item label="轮播图片：">
        <div class="img-container">
          <div style="width: 178px; margin-right: 18px">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :http-request="updateImageSecond"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="form.imageList[0]"
                :src="form.imageList[0]"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div style="text-align: center">页面二</div>
          </div>
          <div style="width: 178px">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :http-request="updateImageThird"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="form.imageList[1]"
                :src="form.imageList[1]"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div style="text-align: center">页面三</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="轮播页面选择：" prop="selectPage">
        <el-checkbox-group v-model="form.selectPage">
          <el-checkbox
            v-for="item in screenConfig.select_page"
            :key="item.id"
            :disabled="item.src_path === ''"
            :label="item.name"
            name="type"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="实验室介绍：">
        <el-input
          v-model="form.textarea"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="180"
          show-word-limit
          autosize
          class="textarea-input"
          @input="textareaChanged"
        />
      </el-form-item>
      <el-form-item label="每月测试量：">
        <el-input
          v-model="form.testCount"
          type="number"
          class="no-arrow-number-input"
          placeholder="请输入内容"
          @input="handleInputTestCount"
        />
      </el-form-item>
      <el-form-item label="实验室设备数：">
        <el-input
          v-model="form.deviceCount"
          type="number"
          class="no-arrow-number-input"
          placeholder="请输入内容"
          @input="handleInputDeviceCount"
        />
      </el-form-item>
      <el-form-item class="btn-container">
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getScreenConfig, saveScreenConfig, uploadImg } from '@/api/dashboard'
import { SCREEN_CONFIG } from '@/utils/constant'

export default {
  name: 'Configuration',
  data() {
    const validateType = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('请至少选择一个轮播页面'))
      } else {
        callback()
      }
    }
    return {
      form: {
        times: [],
        selectionMethod: '',
        selectPage: [],
        imageList: ['', ''],
        textarea: '',
        testCount: 0,
        deviceCount: 0
      },
      screenConfig: SCREEN_CONFIG,
      rules: {
        selectPage: [
          {
            required: true,
            validator: validateType,
            trigger: 'change'
          }
        ]
      },
      imageUrl2: '',
      imageUrl3: '',
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    isAutoPlay() {
      const method = this.screenConfig.method.find(
        (m) => m.id === this.form.selectionMethod
      )
      return method?.name === '自动轮播'
    }
  },
  async created() {
    if (window.location.host !== 'localhost:9528') {
      this.baseURL = window.location.origin
    }
    await this.getScreenConfig()
  },
  methods: {
    textareaChanged(val) {
      console.log(val, 'textareaChanged', val.includes('\n'))
    },
    async onCancel() {
      await this.getScreenConfig()
      this.imageUrl2 = ''
      this.imageUrl3 = ''
    },
    onSubmit(formName) {
      console.log('submit!', this.form.selectionMethod)
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.getSubmitData()
          await this.saveScreenConfig()
          await this.getScreenConfig()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async saveScreenConfig() {
      try {
        await saveScreenConfig(this.screenConfig)
        this.$message.success('保存成功')
      } catch (error) {
        throw new Error(error.message)
      }
    },
    getSubmitData() {
      this.screenConfig.method.forEach((item) => {
        item.is_select = item.id === this.form.selectionMethod
      })

      this.screenConfig.select_page.forEach((item, index) => {
        item.is_select = this.form.selectPage.includes(item.name)
        item.show_time = this.form.times[index]
      })
      this.screenConfig.introduce = this.form.textarea
      this.screenConfig.capacity = Number(this.form.testCount)
      this.screenConfig.is_laboratory = Number(this.form.deviceCount)
      console.log('提交数据', this.screenConfig)
    },
    updateImageThird({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      uploadImg(formData)
        .then((res) => {
          this.form.imageList[1] = this.baseURL + res.data.img_path
          console.log(this.form.imageList, '上传结果3')
          this.screenConfig.select_page[2].src_path = res.data.img_path
        })
        .catch((err) => {
          console.error('上传失败:', err)
        })
    },
    updateImageSecond({ file, onSuccess }) {
      const formData = new FormData()
      formData.append('file', file)
      uploadImg(formData)
        .then((res) => {
          this.form.imageList[0] = this.baseURL + res.data.img_path
          console.log(this.form.imageList, '上传结果2')
          this.screenConfig.select_page[1].src_path = res.data.img_path
          if (onSuccess) {
            onSuccess(res, { status: 'success' })
          }
        })
        .catch((err) => {
          console.error('上传失败:', err)
        })
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw)
      console.log(this.imageUrl2, 'this.imageUrl2')
    },
    handleAvatarSuccess3(res, file) {
      this.imageUrl3 = URL.createObjectURL(file.raw)
      console.log(this.imageUrl3, 'this.imageUrl3')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.includes('image/')
      if (!isJPG) {
        this.$message.error('只能上传图片格式!')
      }
      return isJPG
    },
    handleInputTestCount(value) {
      this.form.testCount = value < 0 ? 0 : value
      console.log(value, this.form.testCount)
    },
    handleInputDeviceCount(value) {
      this.form.deviceCount = value < 0 ? 0 : value
      console.log(value, this.form.deviceCount)
    },
    handleInput(value) {
      this.form.times = this.form.times.map((t) => (t < 0 ? 0 : t))
      console.log(value, this.form.times)
    },
    async getScreenConfig() {
      try {
        const res = await getScreenConfig()
        console.log(res.data, '数据')
        this.screenConfig = res.data
        this.form.selectionMethod = res.data.method.find(
          (item) => item.is_select
        ).id
        this.form.times = res.data.select_page.map((item) => item.show_time)
        this.form.selectPage = res.data.select_page
          .filter((item) => item.is_select)
          .map((item) => item.name)
        this.form.imageList = res.data.select_page.slice(1, 3).map((item) => {
          if (item.src_path) {
            return this.baseURL + item.src_path
          }
          return ''
        })
        this.form.textarea = res.data.introduce
        this.form.testCount = res.data.capacity
        this.form.deviceCount = res.data.is_laboratory
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.config-container {
  width: 500px;
  padding: 24px;

  // .btn-container {
  //   text-align: right;
  // }
  .el-form-item {
    margin-bottom: 12px;

    ::v-deep .el-form-item__label {
      line-height: 20px;
    }

    .textarea-input {
      ::v-deep .el-input__count {
        background-color: transparent;
      }
    }
  }

  .no-arrow-number-input {
    ::v-deep input[type="number"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .avatar-uploader {
    width: 192px;
    height: 108px;
  }

  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 192px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    width: 192px;
    height: 108px;
    display: block;
  }

  .img-container {
    display: flex;
  }

}

</style>
