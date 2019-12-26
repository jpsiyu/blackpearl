<template>
  <div class="home">
    <div class="home-cont">
      <Contact />
    </div>
    <div class="home-chat">
      <Chat v-if="chatting" />
    </div>
    <div class="home-me">
      <span>{{me.name}}</span>
      <span class="home-me__pub">{{me.pubKey}}</span>
      <span class="home-me__copy" @click="copy">复制</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/scripts/chat/user";
import { Group } from "@/scripts/contact/group";
import { Private } from "@/scripts/contact/private";
import { Message } from "@/scripts/message/message";
import Contact from "@/components/chat/Contact.vue";
import Chat from "@/components/chat/Chat.vue";
import { mapState } from "vuex";
import { State } from "@/store/state";

export default Vue.extend({
  components: { Contact, Chat },
  computed: {
    ...mapState({
      chatting: state => state.chatting,
      me: state => state.user
    })
  },

  created() {
    // init user
    const user = this.$db.getChatUser();
    if (!user) {
      this.$router.push({ path: "/chat/signup" });
      return;
    }
    this.$store.commit("setUser", user);

    // init contact
    const groups: Group[] = [
      new Group("word", "工作", "work", "0xaabbccdd"),
      new Group("living", "生活", "living", "0x11223344"),
      new Group("entainment", "娱乐", "entertainment", "0xaa22bb44")
    ];
    this.$store.commit("setChatting", groups[0]);
    this.$store.commit("setGroups", groups);

    // start subscribe
    this.$shh.startPrivSubscribe(user.keyPair);
    const topics: string[] = groups.map((e: Group) => {
      return e.topic;
    });
    return this.$shh.startSubscribe(topics);
  },

  methods: {
    copy() {
      this.$copyText(this.me.pubKey).then(() => {
        this.$message({
          message: "Publick Key 已复制到剪贴板",
          type: "success"
        });
      });
    }
  }
});
</script>

<style lang="postcss" scoped>
.home {
  color: var(--color-regular-text);
  width: 900px;
  height: 500px;
  margin: 50px auto 0 auto;
  box-shadow: 0 0 3px 2px rgba(200, 200, 200, 0.5);
  display: flex;
  position: relative;

  &-cont {
    flex: 1;
    background: var(--color-extra-light-border);
  }

  &-chat {
    flex: 3;
  }

  &-me {
    display: flex;
    align-items: center;
    position: absolute;
    top: -30px;
    &__pub {
      margin-left: 20px;
      display: inline-block;
      white-space: nowrap;
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__copy {
      margin-left: 20px;
      cursor: pointer;
      display: inline-block;
      font-size: 12px;
      border: 1px solid #e4e7ed;
      border-radius: 10px;
      padding: 0 10px;
    }
  }
}
</style>
