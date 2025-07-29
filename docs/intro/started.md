<h1 align="center">
快速上手
</h1>

## 新建项目

如果你需要一个开箱即用的模版项目，建议使用 [Vue3 Admin Pro](https://github.com/ColeWang/vue3-admin-pro.git) 开发。

尽管存在学习曲线，但回报值得。

```shell
# 克隆项目
git clone https://github.com/ColeWang/vue3-admin-pro.git

# 进入项目目录
cd vue3-admin-pro

# 安装依赖
npm install

# 启动服务
npm run serve

# 打包
npm run build
```

如果你需要新建一个项目，建议使用 [Vite](https://github.com/vitejs/vite) 构建。

请使用命令行来初始化项目：

```shell
npm create vite@latest
```

## 使用组件

#### 安装

```shell
# 安装必要依赖
npm install ant-design-vue @ant-design/icons-vue dayjs lodash-es --save

# 安装 @site-pro
npm install @site-pro/utils @site-pro/hooks @site-pro/components --save 
```

#### 全局完整注册

```js
import { createApp } from 'vue'
import SitePro from '@site-pro/components'
import App from './App'

const app = createApp(App)

app.use(SitePro)
// ...
app.mount('#app')

```

```vue
<template>
  <pro-table></pro-table>
</template>
```

#### 全局部分注册

```js
import { createApp } from 'vue'
import { Table, Form } from '@site-pro/components'
import App from './App'

const app = createApp(App)

app.use(Table)
app.use(Form)
// ...
app.mount('#app')

```

#### 局部注册组件

```vue
<template>
  <pro-table></pro-table>
</template>

<script>
  import { Table } from '@site-pro/components'
  
  export default {
    components: {
      [Table.name]: Table
    }
  }
</script>
```

## 使用插件

#### 安装

```shell
npm install @site-pro/plugins --save 
```

#### 完整注册

```js
import { createApp } from 'vue'
import { createSite } from '@site-pro/plugins'

/**
 * createSite(options?: BaseSitePluginsOptions) => BaseSitePlugins
 */
const site = createSite()

const app = createApp(App)

app.use(site)
// ...
app.mount('#app')

```

```vue
<script>
  import { useSite } from '@site-pro/plugins'
  
  const $site = useSite()
  
  console.log($site.screen.name)
</script>
```

#### 部分注册

```js
import { createApp } from 'vue'
import { Screen, Progress } from '@site-pro/plugins'

const app = createApp(App)

/**
 * install(app: App, options?: ScreenPluginInstallOptions)
 */
app.use(Screen)

/**
 * install(app: App, options?: ProgressPluginInstallOptions)
 */
app.use(Progress)
// ...
app.mount('#app')

```

```vue
<script>
  import { Screen } from '@site-pro/plugins'
  
  console.log(Screen.name)
</script>
```
