<h1 align="center">
Form - 高级表单
</h1>

Form 在 [Antd Form](https://www.antdv.com/components/form-cn) 的基础上增加了一些语法糖，快速开发表单。

## API {#form-api}

Form 是对 [Antd Form](https://www.antdv.com/components/form-cn) 的再封装，除了继承 Antd Form 的 API 还支持下面属性和方法。

### Form Props {#form-props}

| 属性            | 说明         | 类型      | 可选值                            | 默认值      |
|---------------|------------|---------|--------------------------------|----------|
| layout        | 布局         | string  | horizontal / vertical / inline | vertical |
| initialValues | 默认值        | object  | -                              | -        |
| submitOnReset | 重置是否提交     | boolean | -                              | false    |
| grid          | 开启 grid 模式 | boolean | -                              | false    |
| rowProps      | 开启 grid 模式 | object  | -                              | false    |
| transform     | 开启 grid 模式 | object  | -                              | false    |

### Form Emits {#form-emits}

| 事件             | 说明          | 回调参数                                               |
|----------------|-------------|----------------------------------------------------|
| onSubmit       | 提交时触发       | Function(e: Event \| \{ \_\_MARK\_\_: 'submit' \}) |
| onFinish       | 提交并且校验通过的回调 | Function(values)                                   |
| onFormRef      | 提交并且校验通过的回调 | Function(values)                                   |
| onFinishFailed | 提交并且校验通过的回调 | Function(values)                                   |
| onReset        | 重置表单回调      | Function(values)                                   |
| onValuesChange | 数据变化时回调     | Function(values)                                   |

### Form Expose {#form-expose}

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
