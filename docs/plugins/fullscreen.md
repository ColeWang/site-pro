### Fullscreen Props

| 属性       | 说明                     | 类型              |
|----------|------------------------|-----------------|
| isActive | 是否处于全屏状态               | boolean         |
| activeEl | DOM 元素用作全屏的根, 否则为 null | Element \| null |

### Fullscreen Methods

| 方法      | 说明        | 类型                                    |
|---------|-----------|---------------------------------------|
| request | 进入全屏      | (target?: Element) => Promise\<void\> |
| exit    | 退出全屏      | () => Promise\<void\>                 |
| toggle  | 进入/退出全屏模式 | (target?: Element) => Promise\<void\> |
