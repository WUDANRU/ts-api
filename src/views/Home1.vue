<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{ counter }}单1 {{ counter1 }}单2
    {{counter + counter1}}双
    <button type="button" @click="add()">Add</button>
    <button type="button" @click="add1()">Add1</button>
    <HomeChild :propsName="counter" @minus-event="minusEventHandler" id="5" />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import HomeChild from "./HomeChild.vue";
export default {
  name: "Home",
  data() {
    return {
      counter1: 0,
    };
  },
  components: {
    HomeChild,
  },
  setup() {
    const counter = ref(0); //ref响应式属性
    console.log("setup -> counter", counter);//counter.value为0

    const add = () => {
      counter.value++;
    };

    const minusEventHandler = () => { //没有效果
        counter.value--;
    }

    return {
      counter,
      add,
      minusEventHandler
    };
  },
  methods: {
    add1() {
      this.counter1++;
    },
  },
};
</script>