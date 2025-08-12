---
title: Fields
---

# Fields

## API {#fields-api}

### Fields Props {#fields-props}

| 属性            | 说明         | 类型      | 可选值                            | 默认值      |
|---------------|------------|---------|--------------------------------|----------|
| text          | 布局         | string  | horizontal / vertical / inline | vertical |
| mode          | 默认值        | object  | -                              | -        |
| placeholder   | 重置是否提交     | boolean | -                              | false    |
| valueType     | 开启 grid 模式 | boolean | -                              | false    |
| valueEnum     | 开启 grid 模式 | object  | -                              | false    |
| fieldProps    | 开启 grid 模式 | object  | -                              | false    |
| formItemProps | 开启 grid 模式 | object  | -                              | false    |
| emptyText     | 开启 grid 模式 | object  | -                              | false    |
| renderRead    | 开启 grid 模式 | object  | -                              | false    |
| renderEdit    | 开启 grid 模式 | object  | -                              | false    |
| initialValue  | 开启 grid 模式 | object  | -                              | false    |
| width         | 开启 grid 模式 | object  | -                              | false    |
| labelWidth    | 开启 grid 模式 | object  | -                              | false    |
| hidden        | 开启 grid 模式 | object  | -                              | false    |
| colProps      | 开启 grid 模式 | object  | -                              | false    |
| extra         | 开启 grid 模式 | object  | -                              | false    |
| help          | 开启 grid 模式 | object  | -                              | false    |
| label         | 开启 grid 模式 | object  | -                              | false    |
| tooltip       | 开启 grid 模式 | object  | -                              | false    |

### Fields Emits {#fields-emits}

| 事件             | 说明          | 回调参数                                               |
|----------------|-------------|----------------------------------------------------|
| onSubmit       | 提交时触发       | Function(e: Event \| \{ \_\_MARK\_\_: 'submit' \}) |
| onFinish       | 提交并且校验通过的回调 | Function(values)                                   |
| onFormRef      | 提交并且校验通过的回调 | Function(values)                                   |
| onFinishFailed | 提交并且校验通过的回调 | Function(values)                                   |
| onReset        | 重置表单回调      | Function(values)                                   |
| onValuesChange | 数据变化时回调     | Function(values)                                   |

