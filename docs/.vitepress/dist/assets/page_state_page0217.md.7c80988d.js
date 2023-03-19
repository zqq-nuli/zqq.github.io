import{_ as n,o as e,c as t,a as s,b as l,t as p,d as o}from"./app.0160a6d2.js";const c="/assets/0217-1.0f96e32f.png",f=JSON.parse('{"title":"VitePress如何添加百度统计","description":"","frontmatter":{"title":"VitePress如何添加百度统计"},"headers":[],"relativePath":"page/state/page0217.md","lastUpdated":1679189067000}'),r={name:"page/state/page0217.md"},i={id:"frontmatter-title",tabindex:"-1"},D=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),d=o(`<h1 id="在config-js中添加head属性" tabindex="-1">在config.js中添加<code>head</code>属性 <a class="header-anchor" href="#在config-js中添加head属性" aria-hidden="true">#</a></h1><pre><code>官方文档
</code></pre><p><img src="`+c+`" alt=""> 因为官方文档没有中文的哈，所以机翻过来看起来不是很易懂 具体写法可以写成</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// config.js</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// head 的配置是在 themeConfig之外的</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">         head: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            [</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">script</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">{},</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">var _hmt = _hmt || [];</span></span>
<span class="line"><span style="color:#C3E88D;">                (function() {</span></span>
<span class="line"><span style="color:#C3E88D;">                var hm = document.createElement(&quot;script&quot;);</span></span>
<span class="line"><span style="color:#C3E88D;">                hm.src = &quot;https://hm.baidu.com/hm.js?xxxxxx&quot;;</span></span>
<span class="line"><span style="color:#C3E88D;">                var s = document.getElementsByTagName(&quot;script&quot;)[0]; </span></span>
<span class="line"><span style="color:#C3E88D;">                s.parentNode.insertBefore(hm, s);</span></span>
<span class="line"><span style="color:#C3E88D;">                })();</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div>`,4);function y(a,C,h,F,A,_){return e(),t("div",null,[s("h1",i,[l(p(a.$frontmatter.title)+" ",1),D]),d])}const u=n(r,[["render",y]]);export{f as __pageData,u as default};
