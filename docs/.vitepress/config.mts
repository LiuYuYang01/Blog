import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Blog/",
  title: "宇阳 - 记录开发日常",
  description: "再渺小的星光，也有属于它的光芒！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '学习', link: '/React/React' }
    ],
    sidebar: [
      {
        text: 'React',
        items: [
          { text: '1、React 快速上手', link: '/React/React' },
          { text: '2、Zustand', link: '/React/Zustand' },
          { text: '3、React Hooks Form', link: '/React/React Hooks Form' },
          { text: '4、NextJS', link: '/React/NextJS' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
