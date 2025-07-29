<h1 align="center">
快速上手
</h1>

## 新建项目

如果你需要新建一个项目，建议使用 [Vite](https://github.com/vitejs/vite) 构建。

请使用命令行来初始化项目：

```shell
npm create vite@latest
```

## 使用组件

#### 安装

```shell
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
      [Table.name]: Table,
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

// createSite(options?: BaseSitePluginsOptions) => BaseSitePlugins
const site = createSite()

const app = createApp(App)

app.use(plugins)
// ...
app.mount('#app')

```

#### 部分注册

```js
import { createApp } from 'vue'
import { Screen, Progress } from '@site-pro/plugins'

const app = createApp(App)

// install(app: App, options?: ScreenPluginInstallOptions)
app.use(Screen)

// install(app: App, options?: ProgressPluginInstallOptions)
app.use(Progress)
// ...
app.mount('#app')

```

