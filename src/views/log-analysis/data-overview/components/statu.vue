<template>
  <div class="block-main public-hoverItem logCon" v-loading="loading">
    <div class="block-head" @click="$router.push('/logAnalysis/statuCode')">
      <div class="block-title">状态码</div>
      <div class="block-head-icon">
        <img src="@/assets/images/icon.png" alt="" width="10px" />
      </div>
    </div>
    <div style="width: 100%">
      <el-table
        :data="tableData"
        class="public-radius"
        :header-cell-style="{ textAlign: 'center', background: '#f7fafe ' }"
        :cell-style="tableHeaderColor"
        style="width: 100%"
        height="405"
        border
      >
        <el-table-column
          type="index"
          label="排名"
          min-width="20%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="status"
          label="状态码"
          min-width="25%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="pv"
          label="计数"
          min-width="30%"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="pvRate"
          label="占比"
          min-width="25%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="{ row }">
            {{ row.pvRate | percenTable }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStatusApi } from "@/api/trackingapi/accessLog";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  mounted() {},
  methods: {
    setLoading(val) {
      this.loading = val;
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 1) {
      //   return "text-align:left";
      // } else {
      return "text-align:center";
      // }
    },
    async getStatus(commonParams) {
      this.loading = true;
      await getStatusApi(commonParams).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logCon {
  width: calc(23% - 15px);
  min-height: 300px;
}
</style>
