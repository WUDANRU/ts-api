<template>
<div>
   <div>home child {{propsName}}</div> <!-- {{}}是差值表达式 -->
   <button type="button" @click="clickHandler">Minus</button>
   <button type="button" @click="consoleThis">console.log(this)</button>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["propsName"],
  emits:['minus-event'], //注册事件

// setup(props, ctx){
// console.log("setup->ctx", ctx);
// const clickHandler=()=>{
// ctx.emit('minus-event')
// }
// return {
// clickHandler
// };
// }

// setup选项中没有this,无法访问组件声明中的属性
// 在执行setup时，尚未创建组件实例

// props是响应式的，不能使用解构，会消除响应性
  setup(props, { emit, attrs }) { //右键setup上点击转到定义，搜索ctx，找到SetupContext(也是ctx)就可以看到ctx的属性:attrs,slots,emit
     //鼠标移动到setup可以看到setup有属性：props,ctx(emit, attrs)
    console.log("setup->this", this); //this为undefined,setup选项中没有this
    console.log("setup->attrs", attrs);//attrs对应Home.vue的id="5"
    console.log("setup->props", props);//{propsName:0}
    const clickHandler=()=>{
        emit('minus-event') //minus-event是命名，命名方式不能使用驼峰还要小写
    } //emit,浏览器控制台报warn，第一种在template标签最外层加div标签(emit和attrs的id="5"会报warn，什么文本跟节点,可共同使用第一种)，第二种加emits:['minus-event'],
    return {
        clickHandler
    };
  },
  methods:{
      consoleThis(){
          console.log("consoleThis->this", this) //点击的时候完成了挂载，所以有了this指向
      }
  }
});
</script>

<style scoped>
</style>