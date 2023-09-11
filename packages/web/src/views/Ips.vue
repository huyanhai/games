<template>
  <div class="page-ip-lists">
    <NSpace justify="space-between">
      <h3>
        网站访问列表:<NButton text type="primary">{{ pageInfo.total }}</NButton>
      </h3>
      <NButton text @click="$router.replace('/')">返回首页</NButton>
    </NSpace>
    <div class="table">
      <NSpace :vertical="true" :size="20">
        <NDataTable :columns="columns" :data="lists">ips</NDataTable>
        <NPagination
          v-model:page="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
          :page-count="pageInfo.pageCount"
          @update-page="updatePage"
        />
      </NSpace>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { getIps } from '@/api';
import { onMounted } from 'vue';
import { NDataTable, NSpace, NButton, NPagination } from 'naive-ui';
import dayjs from 'dayjs';
const lists = ref([]);
const pageInfo = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
  pageCount: 0
});

const columns = [
  {
    title: '系统',
    key: 'agent',
    width: 300
  },
  {
    title: 'ip地址',
    key: 'ip',
    width: 120
  },
  {
    title: '页面路径',
    key: 'path',
    width: 100
  },
  {
    title: '访问时间',
    key: 'time',
    width: 200,
    render: (row: any) => {
      return `${dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')}`;
    }
  }
];

const getPageData = async () => {
  const { data } = await getIps(pageInfo);
  lists.value = data.list;
  pageInfo.pageCount = data.pageCount;
  pageInfo.total = data.total;
};

const updatePage = (page: number) => {
  pageInfo.page = page;
  getPageData();
};

onMounted(async () => {
  getPageData();
});
</script>

<style lang="scss" scoped>
.page-ip-lists {
  padding: 20px;
  .table {
    margin-top: 20px;
  }
}
</style>
