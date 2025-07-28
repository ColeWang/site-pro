### Screen Props

| 属性     | 说明                | 类型                                                         |
|--------|-------------------|------------------------------------------------------------|
| width  | 屏幕宽度              | number                                                     |
| height | 屏幕高度              | number                                                     |
| name   | 当前屏幕断点名称          | string                                                     |
| sizes  | 断点                | \{ sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 \}       |
| lt     | 当前屏幕宽度是否小于断点名称    | \{ sm: false, md: true, lg: true, xl: true, xxl: true \}   |
| gt     | 当前屏幕宽度是否大于断点名称    | \{ xs: true, sm: false, md: false, lg: false, xl: false \} |
| xs     | 当前屏幕宽度恰好适合 xs 断点  | boolean                                                    |
| sm     | 当前屏幕宽度恰好适合 sm 断点  | boolean                                                    |
| md     | 当前屏幕宽度恰好适合 md 断点  | boolean                                                    |
| lg     | 当前屏幕宽度恰好适合 lg 断点  | boolean                                                    |
| xl     | 当前屏幕宽度恰好适合 xl 断点  | boolean                                                    |
| xxl    | 当前屏幕宽度恰好适合 xxl 断点 | boolean                                                    |
