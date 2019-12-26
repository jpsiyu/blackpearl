<template>
  <div class="article">
    <vue-markdown :source="source"></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
export default {
  props: ["source"],
  components: {
    "vue-markdown": VueMarkdown
  },
  data() {
    return {};
  },
};
</script>

<style lang="postcss" scoped>
.article {
  padding: 10px;
  margin-bottom: 20px;
}

.article h1 {
  margin: 30px 0;
}

.article h2 {
  margin: 20px 0 10px 0;
}

.article h3 {
  margin: 20px 0 10px 0;
}

.article p {
  line-height: 25px;
  margin: 20px 0;
}

.article a {
  text-decoration: none;
}

.article a:hover {
  text-decoration: underline;
}

.article img {
  max-width: 80%;
  margin: 30px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}

.article ul {
  line-height: 25px;
  background-color: rgb(250, 250, 250);
  color: gray;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
}

.article blockquote {
  margin-left: 20px;
}
</style>


