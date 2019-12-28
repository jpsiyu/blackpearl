<template>
  <el-dialog class="set" :visible.sync="visible" :append-to-body="true">
    <div slot="title">设置</div>
    <el-form>
      <el-form-item label="切换网络:">
        <el-select v-model="form.netID">
          <el-option
            v-for="item in networks"
            :key="item.netID"
            :label="item.name"
            :value="item.netID"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hide">取消</el-button>
      <el-button @click="sure" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

interface IData {
  visible: boolean;
  form: {
    netID: number;
    coin: string;
  };
}

export default Vue.extend({
  data(): IData {
    return {
      visible: false,
      form: {
        netID: 0,
        coin: ""
      }
    };
  },
  computed: {
    ...mapState({
      networks: (state: any) => state.wallet.networks,
      currentNet: (state: any) => state.wallet.currentNet
    })
  },
  created() {
    this.form.netID = this.currentNet.netID;
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    sure() {}
  }
});
</script>
