import { type ComponentPublicInstance, defineComponent, type ExtractPropTypes, unref } from 'vue'
import { Menu, theme } from 'ant-design-vue'
import { menuProps } from 'ant-design-vue/es/menu/src/Menu'
import type { BaseAttrs, MenuInfo, MenuProps } from '@site-pro/utils'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '../../../locale-provider'

export const densityProps = () => ({
    ...menuProps()
})

export type DensityProps = Partial<ExtractPropTypes<ReturnType<typeof densityProps>>>;
export type DensityInstance = ComponentPublicInstance<DensityProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableDensity',
    props: densityProps(),
    setup (props, { attrs }) {
        const { token } = theme.useToken()

        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { tableSize, setTableSize } = useSharedContext()

        function onMenuClick (params: MenuInfo) {
            if (unref(tableSize) !== params.key) {
                setTableSize && setTableSize(params.key)
            }
            props.onClick && props.onClick(params)
        }

        return () => {
            const { fontSize } = unref(token)

            const menuProps: MenuProps & BaseAttrs = {
                ...props,
                style: { minWidth: `${fontSize * 7}px` },
                selectedKeys: [unref(tableSize)],
                onClick: onMenuClick
            }
            return (
                <Menu {...menuProps} {...attrs}>
                    <Menu.Item key={'large'}>
                        {t('densityLarger')}
                    </Menu.Item>
                    <Menu.Item key={'middle'}>
                        {t('densityMiddle')}
                    </Menu.Item>
                    <Menu.Item key={'small'}>
                        {t('densitySmall')}
                    </Menu.Item>
                </Menu>
            )
        }
    }
})
