---
layout: home

hero:
  name: 唯有热爱可抵岁月漫长
  text: 
  tagline: 山底太挤 我们山顶见
  image:
    src: http://images.dushu.work/weixintouxiang.jpg
    alt: VitePress
  actions:
    - theme: brand
      text: View My Gitee
      link: https://gitee.com/zqq61
    - theme: alt
      text: View My BiliBili
      link: https://space.bilibili.com/123443918

features:
  - icon: 🛠️
    title: 孜孜不倦
    details: 2023/2/17 Update
    link: /page/index
  - icon: 🧛‍♀️
    title: Vue3源码解析
    details: No Update...
    link: /VueSource/index
  - icon: 🕵️‍♀️
    title: Vite详解
    details: 2023/2/21 Update
    link: /ViteDetailed/index
  - icon: 🌊
    title: 我的小程序
    details: 2023/3/19 Update
    link: /littelChat/index
---

<style>
 :root {
    /* --vp-nav-height: 94px !important; */
    --vt-c-divider-light:rgba(84,84,84,.48);
 }
 .VPNav{
    position: relative !important;
    border-bottom: 1px solid var(--vt-c-divider-light);
 }
#VPContent {
    background-size: cover;
    /* backdrop-filter: saturate(50%) blur(4px); */
    /* background:linear-gradient(to top left,rgba(84,84,84,.48) 1%, #1e1e20); */
}
.image-container *{
  border-radius: 50%;
}
.VPNavBarTitle .title img {
  border-radius:5px;
}
/* --vp-c-brand 边框绿 */
.VPFeature.link:hover{
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
   box-shadow: 0px 0px 10px 0px var(--vp-c-brand);
   color:var(--vp-c-brand);
}
.VPFeature.link:hover .title{
   transition: all 0.3s;
}
</style>
<script setup>
    import { onMounted , ref } from "vue";
    import { getUserIP , userAgent } from "./utils/util.js"
    let ip = 0
    let userDate = ""
    onMounted(()=>{
        console.log("onMonted")
        userDate = userAgent();
    })
</script>
