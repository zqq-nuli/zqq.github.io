import { defineConfig } from "vitepress";
import pageSiderbar from "../page/sidebar";
import viteSiderbar from "../ViteDetailed/sidebar";
// import "./style/style.css";
export default defineConfig({
    base: "/",
    title: "代码之内",
    description: "vue vue3 vue源码解读 如何看vuejs源码 张侨庆", // 描述源标签
    srcDir: "",
    lastUpdated: true, // 最后更新时间
    themeConfig: {
        siteTitle: "To have no technique",
        // logo: "http://images.dushu.work/kunkun.jpg",
        logo: "./public/getimgdata.gif",
        nav: [
            {
                text: "首页",
                link: "/index",
            },
            {
                text: "孜孜不倦",
                link: "/page/index",
            },
            // {
            //     text: "Vue杂谈",
            //     link: "/VueMany/index",
            // },
            {
                text: "Vue源码解析",
                link: "/VueSource/index",
            },
            {
                text: "Vite详解",
                link: "/ViteDetailed/index",
            },
        ],
        sidebar: {
            // "/page/": [
            //     {
            //         text: "杂谈侧边栏1",
            //         items: [
            //             { text: "Index", link: "/page/index" },
            //             {
            //                 text: "杂谈One",
            //                 link: "/page/index",
            //             },
            //         ],
            //     },
            // ],
            "/page/state/": pageSiderbar,
            "/ViteDetailed/pages": viteSiderbar,
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/zqq-nuli" },
            { icon: "youtube", link: "https://space.bilibili.com/123443918" },
        ],
        footer: {
            message: "可以不光芒万丈，但是不要停止发光",
            copyright: "Copyright © 2023",
        },
    },
    head: [
        [
            "script",
            {},
            `var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?d71f6aed773c222905829d1d3d0846d2";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();`,
        ],
    ],
});
