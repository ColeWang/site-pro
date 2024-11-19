import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { Menu, theme } from 'ant-design-vue'
import { menuProps } from 'ant-design-vue/es/menu/src/Menu'
import type { BaseAttrs, MenuInfo, MenuProps } from '@site-pro/utils'
import type { TableSize } from '../../typings'
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
        const { tableSize, onSizeChange } = useSharedContext()

        const selectedKeys: ComputedRef<string[]> = computed(() => {
            return [unref(tableSize)].filter((_) => !!_)
        })

        function onMenuClick (params: MenuInfo): void {
            if (unref(tableSize) !== params.key) {
                onSizeChange && onSizeChange(params.key as TableSize)
            }
        }

        return () => {
            const { fontSize } = unref(token)

            const menuProps: MenuProps & BaseAttrs = {
                ...props,
                style: { minWidth: `${fontSize * 7}px` },
                selectedKeys: unref(selectedKeys),
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
