
## API

### Form Props

| 属性            | 说明         | 类型      | 可选值                            | 默认值      |
|---------------|------------|---------|--------------------------------|----------|
| layout        | 布局         | string  | horizontal / vertical / inline | vertical |
| initialValues | 默认值        | object  | -                              | -        |
| submitOnReset | 重置是否提交     | boolean | -                              | false    |
| grid          | 开启 grid 模式 | boolean | -                              | false    |
| rowProps      | 开启 grid 模式 | object  | -                              | false    |
| transform     | 开启 grid 模式 | object  | -                              | false    |

### Form Emits

| 事件             | 说明          | 回调参数                                               |
|----------------|-------------|----------------------------------------------------|
| onSubmit       | 提交时触发       | Function(e: Event \| \{ \_\_MARK\_\_: 'submit' \}) |
| onFinish       | 提交并且校验通过的回调 | Function(values)                                   |
| onFinishFailed | 提交并且校验通过的回调 | Function(values)                                   |
| onReset        | 重置表单回调      | Function(values)                                   |
| onValuesChange | 数据变化时回调     | Function(values)                                   |

### Form Expose

| 属性/方法            | 说明          | 类型            |
|------------------|-------------|---------------|
| formInstanceRef  | Form 实例     | Ref\<object\> |
| model            | 提交时触发       | Ref\<object\> |
| formProps        | 提交并且校验通过的回调 | Ref\<object\> |
| setModelValue    | 重置表单回调      | (values)      |
| getModelValue    | 重置表单回调      | (values)      |
| updateModelValue | 重置表单回调      | (values)      |
| deleteModelValue | 重置表单回调      | (values)      |
| submit           | 重置表单回调      | (values)      |
| validate         | 重置表单回调      | (values)      |
| resetFields      | 重置表单回调      | (values)      |
