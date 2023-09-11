<template>
  <div id="bar" ref="dom" class="bar-container"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { removeResize, resize } from '@game-web/base';
import { onUnmounted } from 'vue';
import { data } from '@/constants/swap';
import { useI18n } from 'vue-i18n';
import { useBaseStore } from '@/store';
import { watch } from 'vue';
import { computed } from 'vue';

const { t } = useI18n();
const baseStore = useBaseStore();
const lang = computed(() => baseStore.getLang);

const dom = ref<HTMLElement>();

let chart = ref<echarts.ECharts>();

const moreLang = computed(() => ({
  title: t('home.token')
}));

const options = ref({
  title: {
    text: moreLang.value.title,
    subtext: '2,100,000,000 SHUI',
    x: 'center',
    bottom: '20%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    right: 10,
    top: 20,
    bottom: 20,
    data: [],
    orient: 'vertical',
    itemWidth: 10,
    itemHeight: 10
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '55%',
      center: ['30%', '30%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 50,
          shadowOffsetX: 50,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false
        }
      }
    }
  ]
});

watch(
  () => lang.value,
  () => {
    options.value.title.text = moreLang.value.title;
    chart.value && chart.value.setOption(options.value);
  }
);

const init = async () => {
  const names: any = [];
  const values: any = [];
  data.value.forEach((item: any) => {
    names.push(item.project_name);
    values.push({
      name: item.project_name,
      value: item.value
    });
  });

  options.value.legend.data = names;
  options.value.series[0].data = values;

  chart.value = echarts.init(dom.value as HTMLElement);
  chart.value.setOption(options.value);
  resize(chart.value);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  removeResize(chart.value);
});
</script>

<style lang="scss" scoped>
.bar-container {
  width: 100%;
  height: 100%;
}
</style>
