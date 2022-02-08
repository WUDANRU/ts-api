//能够被分离到ts的import的就是组合式API
import { ref, watch, watchEffect, computed, reactive } from 'vue' //下面写了watchEffect，这里会自动引入
export const utils = () => { //鼠标移动到utils去就会有自动ts(类型)推导
    // 从Home.vue的setup中剪切过来的
    let num = 2 //非响应式
    const m = 5
    const total = ref(0);
    const tal = ref(0);
    const counter = ref(0); //ref响应式属性/响应式对象(默认值0)，
    console.log("setup -> counter", counter); //counter.value为0

    const state = reactive({
        lists: [
            { id: 1, text: 'zhang san' },//reactive可以让lists和lists里面的属性都加入响应式
            { id: 2, text: 'li si' }
        ]
    })

    const setList = () => {
        state.lists[0].text = 'changed'
    }

    const add = () => {
        counter.value++; //counter.value为1
        total.value = num * counter.value
    };

    //修改num的值
    const modify = () => {
        num = 3
        console.log("modify -> num", num);
    }

    const minusEventHandler = () => {
        counter.value -= 1;
        console.log('minusEventHandler')
    }

    // watch可以多个响应式对象[counter,total]
    watch([counter, total], (newval, oldval) => { //watch属于在setup中响应式对象(setup中watch的使用,完全抽离出来了,跟之前watch:{counter(newval,oldval){}}的写法是等价的)
        console.log('utils -> oldval', oldval)
        console.log('utils -> newval', newval)
    })

    // watchEffect: 函数中的响应式内容发生变化时，函数立即执行
    watchEffect(() => {
        const total = counter.value * 2
        console.log('total is:' + total)
    })

    return { //响应式的需要写在这里，watch和watchEffect就不需要
        counter,
        total,
        tal: computed(() => counter.value * m), //点击Add按钮，值会变化
        add,
        modify,
        minusEventHandler,
        state,
        setList
    }
}