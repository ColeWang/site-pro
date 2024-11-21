# 基于 ant-design-vue@4 的重装组件

```javascript
// 检查浏览器宽度来启用紧凑模式
const [compact, setCompact] = useState(false)

useEffect(() => {
    const handleResize = () => {
        setCompact(window.innerWidth < 768) // 假设屏幕宽度小于768px时启用
    }
    window.addEventListener('resize', handleResize)
    handleResize() // 初始化检查
    return () => window.removeEventListener('resize', handleResize)
}, [])

return (
    <ConfigProvider compact={compact}>
        {/* 你的应用组件 */}
    </ConfigProvider>
)
```

## TODO

- [ ] Slots Type
- [ ] 表单列表 FormList
- [ ] 可编辑表格 EditableTable

