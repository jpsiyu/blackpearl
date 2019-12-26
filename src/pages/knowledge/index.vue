<template>
  <div class="know">
    <!--文章树-->
    <div class="know-left">
      <div class="know-group" v-for="g in group" :key="g.id">
        <!--分组-->
        <div class="know-group__title" @click="clickGroup(g.id)">
          <span class="know-group__arrow" :class="{ rotate: isOpen(g.id) }">❯</span>
          <span class="know-group__label">{{ g.name }}</span>
        </div>
        <!--文章-->
        <div class="know-writings" v-if="isOpen(g.id)">
          <div
            class="know-writing"
            v-for="w in getWritingsByGroupId(g.id)"
            :key="w.id"
            @click="clickWriting(w.id)"
          >
            <span class="know-writing__circle" :class="{hide: w.id!=selectId}"></span>
            <span class="know-writing__name" :class="{select: w.id==selectId}">{{ w.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--具体文章-->
    <div class="know-right" ref="right">
      <Article :source="source" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Article from "@/components/knowledge/Article.vue";
import cfg from "@/scripts/knowledge/writing-config.js";

const welcomeId = 101;

export default Vue.extend({
  components: {
    Article
  },
  data() {
    return {
      source: "",
      group: [],
      writings: [],
      selectId: 0,
      open: {}
    };
  },
  mounted() {
    this.init();
  },
  updated() {},
  beforeRouteUpdate(to, from, next) {
    const toId = to.query.id;
    const fromId = from.query.id;
    if (toId != fromId) {
      this.getWriting(toId);
    }
    next();
  },
  methods: {
    init() {
      this.group = cfg.group;
      this.writings = cfg.writings;
      const id = this.$route.query.id;
      this.getWriting(id);
    },
    getWriting(id) {
      if (!id) {
        this.jumpWriting(welcomeId);
        return;
      }
      const article = cfg.writings.find(e => e.id == id);
      if (!article) {
        this.jumpWriting(welcomeId);
        return;
      }
      this.selectId = id;
      this.$axios
        .get(article.path)
        .then(res => {
          this.source = res.data;
          return this.$nextTick();
        })
        .then(_ => {
          this.$refs.right.scrollTop = 0;
        })
        .catch(err => {
          console.error(err);
        });
    },
    isOpen(id) {
      return this.open[id] ? true : false;
    },
    clickGroup(id) {
      this.open[id] = this.isOpen(id) ? false : true;
      this.$forceUpdate();
    },
    getWritingsByGroupId(id) {
      return cfg.writings.filter(e => {
        return e.groupId == id;
      });
    },
    clickWriting(id) {
      this.jumpWriting(id);
    },
    jumpWriting(id) {
      this.$router.push({ path: "/knowledge", query: { id } });
    }
  }
});
</script>

<style lang="postcss" scoped>
.know {
  display: flex;
  width: 100%;
  height: 100%;
  &-left {
    overflow-y: scroll;
    width: 240px;
    min-width: 240px;
    background-image: linear-gradient(-90deg, rgba(0, 0, 0, 0.01), transparent);
    padding: 10px;
    box-sizing: border-box;
  }
  &-right {
    flex: 1;
    left: 340px;
    overflow-y: scroll;
    padding: 0 30px;
  }
  &-group {
    padding: 15px 0;
    cursor: pointer;
    user-select: none;
    &__title {
      font-size: 16px;
      font-weight: 600;
      &:hover {
        color: gray;
      }
    }

    &__label {
      padding-left: 10px;
    }

    &__arrow {
      display: inline-block;
      color: gray;
      transition: transform 0.3s;
    }
  }

  &-writings {
    cursor: pointer;
    user-select: none;
    margin-top: 10px;
  }
  &-writing {
    padding: 10px 30px;
    display: flex;
    align-items: center;
    &__name {
      font-size: 14px;
      margin-left: 3px;
    }
    &__circle {
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: #07c160;
      border-radius: 50%;
      &:hover {
        color: gray;
      }
    }
  }
}

.rotate {
  transform: rotateZ(90deg);
}

.select {
  color: #07c160;
  &:hover {
    color: #07c160;
  }
}

.hide {
  visibility: hidden;
}
</style>

