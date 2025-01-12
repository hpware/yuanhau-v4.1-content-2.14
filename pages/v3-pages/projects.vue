<script setup>
import Project from "@/components/pf-d/ProjectDisplayTemplate.vue";
useHead({
  title: "專案v3 | 吳元皓",
  keywords:
    "Web Dev, Photography, Computer Nerd, Howard Wu, yuanhau, wuyuanhau, yuanhau.com, yuanh.xyz, Yuan-Hau Wu, 吳元皓, 元皓 ,吳元皓, 吳元浩, 元浩 ,吳元浩, 吳元浩 ,五專生, ictechz, 攝影, 前端方面, 台灣的五專生, 使用Vue製作, 吴元皓, 元皓 ,吴元皓的网站, 吴元浩, 元浩 ,吴元浩的网站, 吴元浩 ,五专生, ictechz, 摄影, 前端方面, 台湾的五专生, 使用Vue制作, Made With Vue, student, HTML Dev, Blog Posts, Photo Library, PHP Plugins, Profile Links, JS, Javascript, NextJS, HTML nerd, CSS Dev, CSS, HTML, Web Developer, HTML Developer, CSS Developer, Web Dev, 学生, HTML 开发, 博客文章, 照片库, PHP 插件, 个人资料链接, JS, Javascript, NextJS, CSS 开发, CSS, HTML, Web 开发人员, HTML 开发人员, CSS 开发人员, Web 开发, 學生, HTML 開發, 部落格文章, 照片庫, PHP 插件, 個人資料連結, JS, Javascript, NextJS, CSS 開發, CSS, HTML, Web 開發人員, HTML 開發人員, CSS 開發人員, Web 開發, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli, Familiar with HTML, Familiar with CSS, Familiar with Vercel, Familiar with Git, Familiar with Debian Cli, Familiar with Ubuntu Cli, Familiar with Debian Cli, Familiar with Ubuntu Cli, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli",
});
</script>
<template>
  <h2 class="pagetitle">所有專案</h2>
  <h3 class="todo">新的還在TODO</h3>
  <h3>現在開發、更新中的專案</h3>
  <section id="current">
    <Project
      name="Site-V3 網站"
      ai="help"
      repo="https://github.com/hpware/hpware-vue-v3"
      website="https://yuanh.xyz"
      about="Site-V3"
      between_projects="1"
    ></Project>
    <Project
      name="lovemusic.asia Web App"
      website="https://app.lovemusic.asia"
      about="lovemusicasiawebapp"
      between_projects="1"
    ></Project>
    <Project
      name="AdGuard Home Block & Allow lists"
      repo="https://github.com/hpware/AdGuard-Block-list"
      website="https://gh.yuanh.xyz/adguard-block-list/"
      MoreText="<a href='https://gh.yuanh.xyz/adguard-block-list/README-zh'>繁體中文網頁</a>"
      about="AdGuard-Block-list"
      between_projects="1"
    ></Project>
    <Project
      name="Linux 安裝腳本"
      MoreText=" <a href='https://old.hwtw.cc/script/linux-install.txt'>安裝指令</a>"
      about="Linux安裝指令"
      between_projects="0"
    ></Project>
  </section>
  <hr />
  <section id="previous">
    <h3>舊或以取代的專案</h3>
    <Project
      name="hwtw.cc 網站"
      website="https://hwtw.cc"
      about="hwtw-cc"
      between_projects="1"
    ></Project>
    <Project
      name="lovemusic.asia 網站"
      website="https://lovemusic.asia"
      about="lovemusicasia"
      between_projects="1"
    ></Project>
    <Project
      name="舊 hwtw.cc 網站"
      ai="help"
      website="https://old.hwtw.cc"
      between_projects="1"
    ></Project>
    <Project
      name="TestConnectCenter"
      ai="make"
      about="testconnectcenter"
      repo="https://github.com/hpware/testconnectcenter"
      website="https://testconnectcenter.azurewebsites.net"
      between_projects="1"
    ></Project>
    <Project
      name="Site-V2"
      repo="https://github.com/hpware/site-v2"
      website="https://v2.yuanh.xyz"
      between_projects="1"
    ></Project>
    <Project
      name="Site-V1 (用別人做的)"
      repo="https://github.com/hpware/old-site"
      website="https://3002.hwtw.cc"
      between_projects="0"
    ></Project>
  </section>
  <br />
</template>
<style scoped>
p {
  margin-top: 0.4em;
  margin-bottom: 0;
}
.todo {
  margin-top: 0;
  margin: 0;
  margin-bottom: 0;
  padding: 0;
  font-size: 0.6em;
  font-weight: 100;
}
br.mobile {
  display: none;
}
br.desktop {
  display: block;
}
span.mobile {
  display: none;
}
span.desktop {
  display: block;
}
h2.pagetitle {
  margin-bottom: 0;
}
h1.nametitle {
  margin-top: 0.3em;
  margin-bottom: 0em;
  font-size: 2.2em;
  font-weight: bold;
  color: aquamarine;
}
.not-a-button {
  background-color: transparent;
  border: none;
  color: rgba(191, 191, 191, 0.7);
  font-size: 1em;
  cursor: pointer;
}
.not-a-button:hover {
  background-color: transparent;
}
a.white {
  color: white;
}
a.white:hover {
  color: #939393;
}

@media (max-width: 502px) {
  br.mobile {
    display: block;
  }
  br.desktop {
    display: none;
  }
  span.mobile {
    display: block;
  }
  span.desktop {
    display: none;
  }
}
h1 {
  font-size: 3em;
  margin-bottom: 0;
}
</style>
