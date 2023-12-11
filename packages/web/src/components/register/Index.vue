<template>
  <NModal v-model:show="showModal" :mask-closable="false">
    <NCard class="m-register">
      <NSpin :show="loading">
        <NForm ref="formRef" :label-width="80" label-placement="left" :rules="rules" :model="formData">
          <NFormItem :label="$t('home.country')" path="country">
            <NSelect v-model:value="formData.country" :options="country" />
          </NFormItem>
          <NFormItem :label="$t('home.country')" path="country1" v-if="!formData.country">
            <NInputGroup>
              <NInputGroupLabel style="width: 50px">+</NInputGroupLabel>
              <NInput v-model:value="formData.country1" :placeholder="$t('home.enter_country')" />
            </NInputGroup>
          </NFormItem>
          <NFormItem :label="$t('home.phone_no')" path="phone">
            <NInputGroup>
              <NInput v-model:value="formData.phone" :placeholder="$t('home.phone_no')" />
              <NButton type="primary" style="min-width: 60px" :disabled="countActive" @click="getCode">
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
            <NInput v-model:value="formData.code" maxlength="6" :placeholder="$t('home.enter_code')" />
          </NFormItem>
          <NFormItem :label="$t('home.email')" path="email">
            <NInput v-model:value="formData.email" :placeholder="$t('home.enter_email')" />
          </NFormItem>
          <NFormItem label=" ">
            <NSpace>
              <NButton type="primary" @click="registerHandler">{{ $t("home.register") }}</NButton>
              <NButton @click="closeHandler">{{ $t("home.cancel") }}</NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </NSpin>
    </NCard>
  </NModal>
</template>
<script lang="ts" setup>
import { useRegisterStore, useBaseStore } from "@/store/index";
import { sendVerifyCode, registerMeta, inviteRegisterMeta } from "@/api";
import { reactive } from "vue";
import { NSelect, NModal, NCard, NForm, NInputGroupLabel, NFormItem, NInput, NInputGroup, NSpace, NButton, NCountdown, useMessage, NSpin, type FormInst, type CountdownInst } from "naive-ui";
import { computed, ref } from "vue";
import { checkPhone, checkEmail } from "@game-web/base";
import { useWallet } from "@game-web/base";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
const { address } = useWallet();
const { t } = useI18n();

const registerStore = useRegisterStore();
const baseStore = useBaseStore();
const message = useMessage();
const route = useRoute();
const loading = ref(false);

const countDownRef = ref<CountdownInst>();
const formRef = ref<FormInst>();

const showModal = computed(() => registerStore.getRegister);

const country = computed(() => {
  return [
    { label: `${t("home.custom")}`, value: "" },
    { label: `+1 ${t("country.US")}`, value: "+1" },
    { label: `+7 ${t("country.RU")}`, value: "+7" },
    { label: `+20 ${t("country.EG")}`, value: "+20" },
    { label: `+27 ${t("country.ZA")}`, value: "+27" },
    { label: `+30 ${t("country.GR")}`, value: "+30" },
    { label: `+31 ${t("country.NL")}`, value: "+31" },
    { label: `+32 ${t("country.BE")}`, value: "+32" },
    { label: `+33 ${t("country.FR")}`, value: "+33" },
    { label: `+34 ${t("country.ES")}`, value: "+34" },
    { label: `+36 ${t("country.HU")}`, value: "+36" },
    { label: `+39 ${t("country.IT")}`, value: "+39" },
    { label: `+40 ${t("country.RO")}`, value: "+40" },
    { label: `+41 ${t("country.CH")}`, value: "+41" },
    { label: `+43 ${t("country.AT")}`, value: "+43" },
    { label: `+44 ${t("country.GB")}`, value: "+44" },
    { label: `+45 ${t("country.DK")}`, value: "+45" },
    { label: `+46 ${t("country.SE")}`, value: "+46" },
    { label: `+47 ${t("country.NO")}`, value: "+47" },
    { label: `+48 ${t("country.PL")}`, value: "+48" },
    { label: `+49 ${t("country.DE")}`, value: "+49" },
    { label: `+51 ${t("country.PE")}`, value: "+51" },
    { label: `+52 ${t("country.MX")}`, value: "+52" },
    { label: `+53 ${t("country.CU")}`, value: "+53" },
    { label: `+54 ${t("country.AR")}`, value: "+54" },
    { label: `+55 ${t("country.BR")}`, value: "+55" },
    { label: `+56 ${t("country.CL")}`, value: "+56" },
    { label: `+57 ${t("country.CO")}`, value: "+57" },
    { label: `+58 ${t("country.VE")}`, value: "+58" },
    { label: `+60 ${t("country.MY")}`, value: "+60" },
    { label: `+61 ${t("country.AU")}`, value: "+61" },
    { label: `+62 ${t("country.ID")}`, value: "+62" },
    { label: `+63 ${t("country.PH")}`, value: "+63" },
    { label: `+64 ${t("country.NZ")}`, value: "+64" },
    { label: `+65 ${t("country.SG")}`, value: "+65" },
    { label: `+66 ${t("country.TH")}`, value: "+66" },
    { label: `+81 ${t("country.JP")}`, value: "+81" },
    { label: `+82 ${t("country.KR")}`, value: "+82" },
    { label: `+84 ${t("country.VN")}`, value: "+84" },
    { label: `+86 ${t("country.CN")}`, value: "+86" },
    { label: `+90 ${t("country.TR")}`, value: "+90" },
    { label: `+91 ${t("country.IN")}`, value: "+91" },
    { label: `+92 ${t("country.PK")}`, value: "+92" },
    { label: `+93 ${t("country.AF")}`, value: "+93" },
    { label: `+94 ${t("country.LK")}`, value: "+94" },
    { label: `+95 ${t("country.MM")}`, value: "+95" },
    { label: `+98 ${t("country.IR")}`, value: "+98" },
    { label: `+211 ${t("country.SS")}`, value: "+211" },
    { label: `+212 ${t("country.MA")}`, value: "+212" },
    { label: `+216 ${t("country.TN")}`, value: "+216" },
    { label: `+218 ${t("country.LY")}`, value: "+218" },
    { label: `+220 ${t("country.GM")}`, value: "+220" },
    { label: `+224 ${t("country.GN")}`, value: "+224" },
    { label: `+225 ${t("country.CI")}`, value: "+225" },
    { label: `+226 ${t("country.BF")}`, value: "+226" },
    { label: `+227 ${t("country.NE")}`, value: "+227" },
    { label: `+228 ${t("country.TG")}`, value: "+228" },
    { label: `+230 ${t("country.MU")}`, value: "+230" },
    { label: `+233 ${t("country.GH")}`, value: "+233" },
    { label: `+234 ${t("country.NG")}`, value: "+234" },
    { label: `+235 ${t("country.TD")}`, value: "+235" },
    { label: `+236 ${t("country.CF")}`, value: "+236" },
    { label: `+237 ${t("country.CM")}`, value: "+237" },
    { label: `+240 ${t("country.GQ")}`, value: "+240" },
    { label: `+241 ${t("country.GA")}`, value: "+241" },
    { label: `+242 ${t("country.CG")}`, value: "+242" },
    { label: `+243 ${t("country.CD")}`, value: "+243" },
    { label: `+244 ${t("country.AO")}`, value: "+244" },
    { label: `+245 ${t("country.GW")}`, value: "+245" },
    { label: `+249 ${t("country.SD")}`, value: "+249" },
    { label: `+250 ${t("country.RW")}`, value: "+250" },
    { label: `+251 ${t("country.ET")}`, value: "+251" },
    { label: `+252 ${t("country.SO")}`, value: "+252" },
    { label: `+253 ${t("country.DJ")}`, value: "+253" },
    { label: `+254 ${t("country.KE")}`, value: "+254" },
    { label: `+255 ${t("country.TZ")}`, value: "+255" },
    { label: `+256 ${t("country.UG")}`, value: "+256" },
    { label: `+257 ${t("country.BI")}`, value: "+257" },
    { label: `+260 ${t("country.ZM")}`, value: "+260" },
    { label: `+262 ${t("country.RE")}`, value: "+262" },
    { label: `+268 ${t("country.SZ")}`, value: "+268" },
    { label: `+269 ${t("country.KM")}`, value: "+269" },
    { label: `+291 ${t("country.ER")}`, value: "+291" },
    { label: `+297 ${t("country.AW")}`, value: "+297" },
    { label: `+298 ${t("country.FO")}`, value: "+298" },
    { label: `+299 ${t("country.GL")}`, value: "+299" },
    { label: `+350 ${t("country.GI")}`, value: "+350" },
    { label: `+351 ${t("country.PT")}`, value: "+351" },
    { label: `+352 ${t("country.LU")}`, value: "+352" },
    { label: `+353 ${t("country.IE")}`, value: "+353" },
    { label: `+354 ${t("country.IS")}`, value: "+354" },
    { label: `+357 ${t("country.CY")}`, value: "+357" },
    { label: `+358 ${t("country.FI")}`, value: "+358" },
    { label: `+359 ${t("country.BG")}`, value: "+359" },
    { label: `+370 ${t("country.LT")}`, value: "+370" },
    { label: `+371 ${t("country.LV")}`, value: "+371" },
    { label: `+372 ${t("country.EE")}`, value: "+372" },
    { label: `+374 ${t("country.AM")}`, value: "+374" },
    { label: `+375 ${t("country.BY")}`, value: "+375" },
    { label: `+376 ${t("country.AD")}`, value: "+376" },
    { label: `+377 ${t("country.MC")}`, value: "+377" },
    { label: `+379 ${t("country.VA")}`, value: "+379" },
    { label: `+380 ${t("country.UA")}`, value: "+380" },
    { label: `+381 ${t("country.RS")}`, value: "+381" },
    { label: `+382 ${t("country.ME")}`, value: "+382" },
    { label: `+385 ${t("country.HR")}`, value: "+385" },
    { label: `+386 ${t("country.SI")}`, value: "+386" },
    { label: `+420 ${t("country.CZ")}`, value: "+420" },
    { label: `+421 ${t("country.SK")}`, value: "+421" },
    { label: `+503 ${t("country.SV")}`, value: "+503" },
    { label: `+504 ${t("country.HN")}`, value: "+504" },
    { label: `+505 ${t("country.NI")}`, value: "+505" },
    { label: `+506 ${t("country.CR")}`, value: "+506" },
    { label: `+507 ${t("country.PA")}`, value: "+507" },
    { label: `+509 ${t("country.HT")}`, value: "+509" },
    { label: `+591 ${t("country.BO")}`, value: "+591" },
    { label: `+592 ${t("country.GY")}`, value: "+592" },
    { label: `+593 ${t("country.EC")}`, value: "+593" },
    { label: `+595 ${t("country.PY")}`, value: "+595" },
    { label: `+597 ${t("country.SR")}`, value: "+597" },
    { label: `+598 ${t("country.UY")}`, value: "+598" },
    { label: `+599 ${t("country.CW")}`, value: "+599" },
    { label: `+670 ${t("country.TL")}`, value: "+670" },
    { label: `+673 ${t("country.BN")}`, value: "+673" },
    { label: `+675 ${t("country.PG")}`, value: "+675" },
    { label: `+676 ${t("country.TO")}`, value: "+676" },
    { label: `+677 ${t("country.SB")}`, value: "+677" },
    { label: `+678 ${t("country.VU")}`, value: "+678" },
    { label: `+679 ${t("country.FJ")}`, value: "+679" },
    { label: `+680 ${t("country.PW")}`, value: "+680" },
    { label: `+682 ${t("country.CK")}`, value: "+682" },
    { label: `+690 ${t("country.TK")}`, value: "+690" },
    { label: `+850 ${t("country.KP")}`, value: "+850" },
    { label: `+852 ${t("country.HK")}`, value: "+852" },
    { label: `+853 ${t("country.MO")}`, value: "+853" },
    { label: `+855 ${t("country.KH")}`, value: "+855" },
    { label: `+856 ${t("country.LA")}`, value: "+856" },
    { label: `+880 ${t("country.BD")}`, value: "+880" },
    { label: `+886 ${t("country.TW")}`, value: "+886" },
    { label: `+960 ${t("country.MV")}`, value: "+960" },
    { label: `+962 ${t("country.JO")}`, value: "+962" },
    { label: `+963 ${t("country.SY")}`, value: "+963" },
    { label: `+964 ${t("country.IQ")}`, value: "+964" },
    { label: `+966 ${t("country.SA")}`, value: "+966" },
    { label: `+967 ${t("country.YE")}`, value: "+967" },
    { label: `+968 ${t("country.OM")}`, value: "+968" },
    { label: `+970 ${t("country.PS")}`, value: "+970" },
    { label: `+971 ${t("country.AE")}`, value: "+971" },
    { label: `+972 ${t("country.IL")}`, value: "+972" },
    { label: `+973 ${t("country.BH")}`, value: "+973" },
    { label: `+974 ${t("country.QA")}`, value: "+974" },
    { label: `+975 ${t("country.BT")}`, value: "+975" },
    { label: `+976 ${t("country.MN")}`, value: "+976" },
    { label: `+977 ${t("country.NP")}`, value: "+977" },
    { label: `+993 ${t("country.TM")}`, value: "+993" },
    { label: `+994 ${t("country.AZ")}`, value: "+994" },
    { label: `+995 ${t("country.GE")}`, value: "+995" },
    { label: `+998 ${t("country.UZ")}`, value: "+998" },
  ];
});

const formData = reactive({
  country: "+86",
  country1: "",
  phone: "",
  email: "",
  code: "",
});

// 倒计时
const countActive = ref(false);

const rules = {
  country1: [
    {
      required: true,
      trigger: ["input"],
      validator: (rule: any, value: any) => {
        if (!value) {
          return new Error(t("home.enter_country"));
        }
      },
    },
  ],
  phone: [
    {
      required: true,
      trigger: ["input"],
      validator: (rule: any, value: any) => {
        if (!value) {
          return new Error(t("home.enter_phone"));
        }
        // if (!checkPhone(value)) {
        //   return new Error(t("home.enter_phone_tips"));
        // }
      },
    },
  ],
  email: [
    {
      required: false,
      trigger: ["input"],
      validator: (rule: any, value: any) => {
        if (!value) {
          return true;
        }
        if (!checkEmail(value)) {
          return new Error(t("home.email_error"));
        }
      },
    },
  ],
  code: [
    {
      required: true,
      message: t("home.enter_code"),
      trigger: ["input", "blur"],
    },
  ],
};

// 获取验证码
const getCode = async () => {
  if (!checkPhone(`${formData.country}${formData.phone}`)) {
    return message.error(t("home.enter_phone_tips"));
  }
  loading.value = true;

  sendVerifyCode({
    phone: `${formData.country}${formData.phone}`,
  })
    .then((res: any) => {
      if (res?.success) {
        countActive.value = true;
      } else {
        message.error(res.message || t("home.send_error"));
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const register = () => {
  loading.value = true;
  const { metaId } = route.query;
  let handler: any = registerMeta;
  const data: any = {
    ...formData,
    phone: `${formData.country || `+${formData.country1}`}${formData.phone}`,
    wallet_addr: address.value as string,
    name: "xxx",
  };

  if (metaId) {
    handler = inviteRegisterMeta;
    data.invite_register_meta = metaId;
  }
  handler(data)
    .then((res: any) => {
      if (res?.success) {
        getUserInfo();
        closeHandler();
      } else {
        message.error(t("home.register_fail"));
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
  formData.code = "";
  formData.phone = "";
  formData.email = "";
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
  @include for_breakpoint("max", 800px) {
    width: 90%;
  }
}
</style>
