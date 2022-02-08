<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{ counter }}aa单1 {{ counter1 }}单2 {{ counter + counter1 }}双
    <hr />
    total is:{{ total }}aa
    <hr />
    tal is:{{ tal }}
    <hr />
    <button type="button" @click="add()">Add</button>
    <button type="button" @click="add1()">Add1</button>
    <button type="button" @click="modify()">modify num</button>
    <HomeChild :propsName="counter" @minus-event="minusEventHandler" id="5" />
    <hr />

<ul>
  <li v-for="item in state.lists" :key="item.id">{{item.text}}</li>
</ul>

<button type="button" @click="setList">set index 0</button>

  </div>
</template>
<script lang="ts">
// import { ref } from "vue";
import { reactive,readonly,watchEffect } from "vue";
import HomeChild from "./HomeChild.vue";
import { utils } from "./home";
// const stateUtils=utils()
import { defineComponent } from "vue"; //能够被分离到ts的import的就是组合式API
export default defineComponent({
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
    //  吧原来里面的内容剪切到home.ts中

const original=reactive({count:0})
const copy=readonly(original)
watchEffect(()=>{
  // 适用于响应性追踪
  console.log(copy.count)
})

// 变更original会触发侦听器依赖副本
original.count++

// 变更副本将失败并导致警告
// copy.count++ //警告！（控制台警告，因为readonly是只读的）

    return {
      ...utils(), //或...stateUtils
    };
  },
  methods: {
    add1() {
      this.counter1++;
    },
  },
  watch: {
    counter1(newval: number, oldval: number) {
      //或counter1(newval,oldval){}
      console.log(newval, "newval");
      console.log(oldval, "oldval");
    },
  },
  computed: {},
});
</script>