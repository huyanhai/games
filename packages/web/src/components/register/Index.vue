<template>
  <NModal v-model:show="showModal" :mask-closable="false">
    <NCard class="m-register">
      <NSpin :show="loading">
        <NForm
          ref="formRef"
          :label-width="80"
          label-placement="left"
          :rules="rules"
          :model="formData"
        >
          <NFormItem :label="$t('home.phone_no')" path="phone">
            <NInputGroup>
              <NInput
                v-model:value="formData.phone"
                :placeholder="$t('home.phone_no')"
              />
              <NButton
                type="primary"
                style="min-width: 60px"
                :disabled="countActive"
                @click="getCode"
              >
                <NCountdown
                  ref="countDownRef"
                  :active="countActive"
                  :duration="60000"
                  :render="
                    ({ seconds }) => {
                      if (!countActive) return $t('home.send');
                      return seconds > 0 ? `${seconds}s` : $t('home.send');
                    }
                  "
                  @finish="() => (countActive = false)"
                />
              </NButton>
            </NInputGroup>
          </NFormItem>
          <NFormItem :label="$t('home.msg_code')" path="code">
            <NInput
              v-model:value="formData.code"
              maxlength="6"
              :placeholder="$t('home.enter_code')"
            />
          </NFormItem>
          <NFormItem :label="$t('home.email')" path="email">
            <NInput
              v-model:value="formData.email"
              :placeholder="$t('home.enter_email')"
            />
          </NFormItem>
          <NFormItem label=" ">
            <NSpace>
              <NButton type="primary" @click="registerHandler">{{
                $t('home.register')
              }}</NButton>
              <NButton @click="closeHandler">{{ $t('home.cancel') }}</NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </NSpin>
    </NCard>
  </NModal>
</template>
<script lang="ts" setup>
import { useRegisterStore, useBaseStore } from '@/store/index';
import { sendVerifyCode, registerMeta } from '@/api';
import { reactive } from 'vue';
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NSpace,
  NButton,
  NCountdown,
  useMessage,
  NSpin,
  type FormInst,
  type CountdownInst
} from 'naive-ui';
import { computed, ref } from 'vue';
import { checkPhone, checkEmail } from '@game-web/base';
import { useWallet } from '@game-web/base';
import { useI18n } from 'vue-i18n';
const { address } = useWallet();
const { t } = useI18n();

const registerStore = useRegisterStore();
const baseStore = useBaseStore();
const message = useMessage();
const loading = ref(false);

const countDownRef = ref<CountdownInst>();
const formRef = ref<FormInst>();

const showModal = computed(() => registerStore.getRegister);

const formData = reactive({
  phone: '',
  email: '',
  code: ''
});

// 倒计时
const countActive = ref(false);

const rules = {
  phone: [
    {
      required: true,
      trigger: ['input'],
      validator: (rule: any, value: any) => {
        if (!value) {
          return new Error(t('home.enter_phone'));
        }
        if (!checkPhone(value)) {
          return new Error(t('home.enter_phone_tips'));
        }
      }
    }
  ],
  email: [
    {
      required: false,
      trigger: ['input'],
      validator: (rule: any, value: any) => {
        if (!value) {
          return true;
        }
        if (!checkEmail(value)) {
          return new Error(t('home.email_error'));
        }
      }
    }
  ],
  code: [
    {
      required: true,
      message: t('home.enter_code'),
      trigger: ['input', 'blur']
    }
  ]
};

// 获取验证码
const getCode = async () => {
  if (!checkPhone(formData.phone)) {
    return message.error(t('home.enter_phone_tips'));
  }
  loading.value = true;

  sendVerifyCode({
    phone: formData.phone
  })
    .then((res: any) => {
      if (res?.success) {
        countActive.value = true;
      } else {
        message.error(res.message || t('home.send_error'));
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const register = () => {
  loading.value = true;
  registerMeta({
    ...formData,
    wallet_addr: address.value as string,
    name: 'xxx'
  })
    .then((res: any) => {
      if (res?.success) {
        getUserInfo();
        closeHandler();
      } else {
        message.error(t('home.register_fail'));
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

// 关闭弹窗
const closeHandler = () => {
  countActive.value = false;
  countDownRef.value?.reset();
  formData.code = '';
  formData.phone = '';
  formData.email = '';
  formRef.value?.restoreValidation();
  registerStore.setRegister(false);
};

// 注册
const registerHandler = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors: unknown) => {
    if (!errors) {
      register();
    }
  });
};

// 获取用户信息
const getUserInfo = async () => {
  baseStore.fetchUserInfo(address.value!);
};
</script>

<style lang="scss" scoped>
.m-register {
  width: 50%;
  padding-top: 30px;
  @include for_breakpoint('max', 800px) {
    width: 90%;
  }
}
</style>
