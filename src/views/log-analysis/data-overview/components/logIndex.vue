<template>
  <div class="block-main public-hoverItem" style="width: 100%" v-loading="loading">
    <div class="block-title public-firstHead">访问数据占比</div>
    <div style="display: flex; justify-content: space-between">
      <div class="logCon">
        <div class="warryItem" v-if="msg.chartData1.length > 1">
          <echartsLog
            :title="logTitle"
            id="logChart1"
            width="100%"
            height="300px"
            :chartData="msg.chartData1"
            :nameData="msg.rows1"
            autoresize
          ></echartsLog>
          <div class="block-head">
            <div
              class="public-secondHead"
              style="text-align: center; width: 100%"
            >
              访问量(PV)
            </div>
          </div>
        </div>
        <div class="warryItem" v-if="msg.chartData4.length > 1">
          <echartsLog
            :title="logTitle"
            width="100%"
            height="300px"
            id="logChart4"
            :chartData="msg.chartData4"
            :nameData="msg.rows4"
            autoresize
          ></echartsLog>
          <div class="block-head">
            <div
              class="public-secondHead"
              style="text-align: center; width: 100%"
            >
              用户数(UV)
            </div>
          </div>
        </div>
        <div class="warryItem" v-if="msg.chartData3.length > 1">
          <echartsLog
            :title="logTitle"
            width="100%"
            height="300px"
            id="logChart3"
            :chartData="msg.chartData3"
            :nameData="msg.rows3"
            autoresize
          ></echartsLog>
          <div class="block-head">
            <div
              class="public-secondHead"
              style="text-align: center; width: 100%"
            >
              流出流量
            </div>
          </div>
        </div>
      </div>
      <div class="logTable">
        <el-table
          :data="tableData"
          class="public-radius"
          :header-cell-style="{ textAlign: 'center', background: '#f7fafe ' }"
          :cell-style="tableHeaderColor"
          style="width: 100%"
          max-height="405"
          @sort-change="sortChange($event)"
          border
        >
          <el-table-column
            type="index"
            label="排名"
            min-width="15%"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="httpHost"
            min-width="40%"
            :show-overflow-tooltip="true"
            label="httpHost"
          >
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="pv"
            label="访问量(PV)"
            min-width="20%"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            sortable="custom"
            prop="uv"
            label="用户数(UV)"
            min-width="20%"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            sortable="custom"
            prop="bodySentBytes"
            label="流出流量"
            min-width="20%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="{row}">
              {{ row.bodySentBytes | conver }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import echartsLog from "./echartsLog";
import { copyObj } from "@/utils/copy";
export default {
  components: {
    echartsLog,
  },
  data() {
    return {
      msg: {
        rows1: [],
        rows2: [],
        rows3: [],
        rows4: [],
        rows5: [],
        rows6: [],
        chartData1: [],
        chartData2: [],
        chartData3: [],
        chartData4: [],
        chartData5: [],
        chartData6: [],
      },
      logList: [],
      xaxis: [],
      logTitle: "",
      pieEcharts: {
        pvRate: [],
        requestLengthRate: [],
        bodyBytesSentRate: [],
        uvRate: [],
        avgVisitTime: [],
      },
      tableData: [],
      sortTableData: [],
      current: {
        sortName: "",
        sortOrder: "",
      },
      loading: false,
    };
  },
  methods: {
    setLoading(val) {
      this.loading = val;
    },
    sortChange(e) {
      if (e.order && e.order == "ascending") {
        // 降序
        this.current.sortName = e.prop;
        this.current.sortOrder = "ascending";
      } else if (e.order && e.order == "descending") {
        // 升序
        this.current.sortName = e.prop;
        this.current.sortOrder = "descending";
      } else {
        this.current.sortName = null;
        this.current.sortOrder = null;
        // this.$emit("currentPage");
        this.$emit("visitDataEvent");
      }
      this.ascDscEvent();
    },
    ascDscEvent() {
      let nameAttr = this.current.sortName;
      if (nameAttr && this.current.sortOrder === "ascending") {
        this.tableData = this.tableData.sort((a, b) => {
          return a[nameAttr] - b[nameAttr];
        });
      } else if (nameAttr && this.current.sortOrder === "descending") {
        this.tableData = this.tableData.sort(function (a, b) {
          return b[nameAttr] - a[nameAttr];
        });
      }
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return "text-align:left";
      } else {
        return "text-align:center";
      }
    },
    logEvent(val) {
      this.loading = true;
      this.tableData = val;
      this.clearEcharts();
      this.logList = val;
      if (this.logList.length > 0) {
        this.logList.map((item, index) => {
          item.xaxis = index + 1;
        });
        this.logList.map((item) => {
          if (item.xaxis) {
            this.xaxis.push(item.xaxis);
          }
          if (item.pvRate) {
            item.value = item.pvRate;
            item.total = item.pv;
            item.host = item.httpHost;
            item.logTitle = "访问量(PV)";
            this.pieEcharts.pvRate.push(JSON.parse(JSON.stringify(item)));
          }
          if (item.bodySentBytesRate) {
            item.value = item.bodySentBytesRate;
            item.host = item.httpHost;
            item.total = this.$options.filters.conver(item.bodySentBytes);
            item.logTitle = "流出流量";
            this.pieEcharts.bodyBytesSentRate.push(
              JSON.parse(JSON.stringify(item))
            );
          }
          if (item.uvRate) {
            item.value = item.uvRate;
            item.host = item.httpHost;
            item.total = item.uv;
            item.logTitle = "用户数(UV)";
            this.pieEcharts.uvRate.push(JSON.parse(JSON.stringify(item)));
          }
        });
        this.msg.chartData1 = this.pieEcharts.pvRate;
        this.msg.rows1 = this.xaxis;
        this.msg.chartData2 = this.pieEcharts.requestLengthRate;
        this.msg.rows2 = this.xaxis;
        this.msg.chartData3 = this.pieEcharts.bodyBytesSentRate;
        this.msg.rows3 = this.xaxis;
        this.msg.chartData4 = this.pieEcharts.uvRate;
        this.msg.rows4 = this.xaxis;
        this.msg.chartData5 = this.pieEcharts.avgVisitTime;
        this.msg.rows5 = this.xaxis;
        this.loading = false;
      } else {
        this.msg = Object.assign(
          {},
          {
            rows1: [],
            rows2: [],
            rows3: [],
            rows4: [],
            rows5: [],
            rows6: [],
            chartData1: [],
            chartData2: [],
            chartData3: [],
            chartData4: [],
            chartData5: [],
            chartData6: [],
          }
        );
        this.loading = false;
      }
    },
    clearEcharts() {
      this.pieEcharts = Object.assign(
        {},
        {
          pvRate: [],
          requestLengthRate: [],
          bodyBytesSentRate: [],
          uvRate: [],
          avgVisitTime: [],
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.logCon {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  .warryItem {
    width: 33.3%;
    min-height: 300px;
  }
}
.logTable {
  width: 38%;
}
</style>
