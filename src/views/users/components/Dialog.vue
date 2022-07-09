<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="title" width="40%">
      <!-- biaodan -->
      <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps, defineEmits } from 'vue'
import { addUser } from '@/api/users.js'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits('closeDialog')

const dialogVisible = ref(false)

const formRef = ref(null)

const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

const rules = ref({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },

    {
      type: 'email',
      message: '请输入邮箱',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [{ required: true, message: 'Please input mobile', trigger: 'blur' }]
})

const clean = () => {
  form.value = ref({
    username: '',
    password: '',
    email: '',
    mobile: ''
  })
}

const addUserFn = async () => {
  await addUser(form.value)
  handleClose()
  ElMessage({
    message: i18n.global.t('message.updeteSuccess'),
    type: 'success'
  })
  emit('closeDialog')
  clean()
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      addUserFn()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const openDialog = () => {
  dialogVisible.value = true
}

const handleClose = () => {
  dialogVisible.value = false
}

defineExpose({ openDialog })
</script>

<style lang="scss" scoped></style>
