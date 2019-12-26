<template>
  <div class="chat">
    <div class="chat-title">Chat</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/scripts/chat/user";
export default Vue.extend({
  data() {
    return {
      user: {}
    };
  },
  created() {
    const user = this.$db.getChatUser();
    if (!user) {
      this.$router.push({ path: "/chat/signup" });
      return;
    }
    this.user = user;
  }
});
</script>
