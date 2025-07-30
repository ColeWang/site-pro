<h1 align="center">
Fields - 表单项
</h1>

## API {#fields-api}

### Fields Props {#fields-props}

| 属性            | 说明         | 类型      | 可选值                            | 默认值      |
|---------------|------------|---------|--------------------------------|----------|
| layout        | 布局         | string  | horizontal / vertical / inline | vertical |
| initialValues | 默认值        | object  | -                              | -        |
| submitOnReset | 重置是否提交     | boolean | -                              | false    |
| grid          | 开启 grid 模式 | boolean | -                              | false    |
| rowProps      | 开启 grid 模式 | object  | -                              | false    |
| transform     | 开启 grid 模式 | object  | -                              | false    |

### Fields Emits {#fields-emits}

| 事件             | 说明          | 回调参数                                               |
|----------------|-------------|----------------------------------------------------|
| onSubmit       | 提交时触发       | Function(e: Event \| \{ \_\_MARK\_\_: 'submit' \}) |
| onFinish       | 提交并且校验通过的回调 | Function(values)                                   |
| onFormRef      | 提交并且校验通过的回调 | Function(values)                                   |
| onFinishFailed | 提交并且校验通过的回调 | Function(values)                                   |
| onReset        | 重置表单回调      | Function(values)                                   |
| onValuesChange | 数据变化时回调     | Function(values)                                   |

