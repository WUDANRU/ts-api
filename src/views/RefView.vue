<template>
  <div>
    {{ title }}
    <hr />
    <div>x:{{ x }} y:{{ y }}</div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watchEffect, toRefs, onMounted, onBeforeMount, onUpdated, onRenderTracked, onRenderTriggered} from "vue";
import { defineComponent } from "vue";

const utils = () => {
  const state = reactive({
    x: 0,
    y: 0,
  });
  // return state //x,y失去响应性，不能修改，页面没有变化,需要
  return toRefs(state) //吧state转换为响应式对象
};

export default defineComponent({
  setup() {

    // let { x, y } = utils();
    // setTimeout(() => {
    //   //x,y失去响应性，不能修改，页面没有变化
    //   x = 1;
    //   y = 4;
    // }, 2000);

 let { x, y } = utils();
    setTimeout(() => {
      x.value = 1;
      y.value = 4;
    }, 2000);
console.log('setup -> setup') //created和beforeCreated这两个生命周期的方法写到setup中，是等价的
//  created(()=>{ //created和beforeCreated会有曲线，因为它们是不存在的了
//    console.log('created -> created')
// })
 onBeforeMount(()=>{
    console.log('onBeforeMount -> onBeforeMount')
})
 onMounted(()=>{
    console.log('onMounted -> onMounted')
})
onUpdated(()=>{ //鼠标移动onUpdated，有弹出框，点击快速修复，又有一个弹出框，点击Add的那一个
    console.log('setup -> x.value',x.value)
    console.log('setup -> y.value',y.value)
})
onRenderTracked((debug)=>{ //onRenderTracked跟踪渲染
    console.log('onRenderTracked -> debug',debug)
})
onRenderTriggered((debug)=>{ //触发渲染才会执行回调
 console.log('onRenderTriggered -> debug',debug)
})

    const isShow = ref(false); //isShow,state是布尔值，这两个常量不用写在return里
    const state = reactive({
      isShow: false,
    });
    watchEffect(() => {
      console.log("setup -> isShow", isShow.value);
      console.log("setup -> state", state.isShow);
    });
    setTimeout(() => {
      isShow.value = true;
      state.isShow = true;
    }, 2000);

    let title = ref("hello vue3!"); //使用ref响应式页面发生了改变
    //     console.log("title1", title);
    setTimeout(() => {
      title.value = "changed";
      // console.log('title2',title)
    }, 2000);

    //  let title="hello vue3!" //2秒后页面不会发生改变，使用ref响应式页面发生了改变
    // setTimeout(()=>{
    //     title='changed'
    //     console.log('setup -> title',title)
    // },2000)
    return {
      title,
      //   isShow, //isShow,state是布尔值，这两个常量不用写在return里
      //   state,
      x,
      y,
    }
  },
});
</script>