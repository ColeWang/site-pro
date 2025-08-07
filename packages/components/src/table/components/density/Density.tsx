import type { ComputedRef } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import { Menu as AntMenu, theme as antTheme } from 'ant-design-vue'
import type { BaseAttrs } from '@site-pro/utils'
import { toPx } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import { useSharedContext } from '../../hooks/useSharedContext'
import type { MenuInfo, MenuProps } from '../../../ant-typings'
import type { TableSize } from '../../typings'
import { densityProps } from './typings'

export default defineComponent({
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    name: 'ProTableDensity',
    props: densityProps(),
    setup (props, { attrs }) {
        const { token } = antTheme.useToken()

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
                style: { minWidth: toPx(fontSize * 7) },
                selectedKeys: unref(selectedKeys),
                onClick: onMenuClick
            }
            return (
                <AntMenu {...menuProps} {...attrs}>
                    <AntMenu.Item key={'large'}>
                        {t('densityLarger')}
                    </AntMenu.Item>
                    <AntMenu.Item key={'middle'}>
                        {t('densityMiddle')}
                    </AntMenu.Item>
                    <AntMenu.Item key={'small'}>
                        {t('densitySmall')}
                    </AntMenu.Item>
                </AntMenu>
            )
        }
    }
})
