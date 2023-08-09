# vite + vue3 + ssr

vite ssr官方指南配置文档
https://cn.vitejs.dev/guide/ssr.html

## 改造

### 1.新增文件

新建 `/server.js,/src/entry-client.js,/src/entry-server.js` 三个文件

### 2.main.ts修改

主要修改为：

```typescript
export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  const router = createRouter()
  app.use(router)
  app.use(ElementPlus)
  return {app, router}
}
```

### 3.router修改

主要修改为

```typescript
export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
```

### 4.index.html修改为

添加`<!--preload-links-->`和`<!--app-html-->` 占位符用于替换内容和入口文件`entry-client.js`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Vite + Vue + TS</title>
    <!--preload-links-->
</head>
<body>
<div id="app"><!--app-html--></div>
<script type="module" src="/src/main.ts"></script>
<script type="module" src="/src/entry-client.js"></script>
</body>
</html>
```

### 5.package.json添加脚本
```json
{
  "scripts": {
    "dev": "node server.js",
    "serve": "set NODE_ENV=production && node server",
    "build": "npm run build:client && npm run build:server",
    "preview": "vite preview",
    "build:client": "vite build --ssrManifest --outDir dist/client",
    "build:server": "vite build --ssr src/entry-server.js --outDir dist/server"
  }
}
```

## 开发&部署

打包后的`dist`里没有`server.js`文件，可根据需要将`server.js`在打包时复制到`dist`下

```shell
npm run dev  // 本地开发
npm run build // 部署打包
npm run serve // 生产部署启动
```

vite官方示例https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue
