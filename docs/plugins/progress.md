## API

### Progress Props

| 属性       | 说明       | 类型      |
|----------|----------|---------|
| isActive | 是否处于加载状态 | boolean |
| status   | 进度 0~100 | number  |

### Progress Methods

| 方法    | 说明    | 类型         |
|-------|-------|------------|
| start | 激活并显示 | () => void |
| done  | 结束并隐藏 | () => void |
