import { defineComponent } from 'vue'
import Icon from '@ant-design/icons-vue'

export default defineComponent({
    setup (props, { attrs }) {
        return () => {
            const iconSlots = {
                component: (svgProps) => {
                    return (
                        <svg viewBox="0 0 1024 1024" width="1em" height="1em" {...svgProps}>
                            <path d="M266.96239859 235.54504344a64.72691357 64.72691357 0 1 0 64.72691358-112.10932599 64.72691357 64.72691357 0 0 0-64.72691358 112.10932599z m0 328.2579189a64.72691357 64.72691357 0 1 0 64.72691358-112.10932602 64.72691357 64.72691357 0 0 0-64.72691358 112.10932602zM659.94723103 179.49038045a64.72691357 64.72691357 0 1 0 129.45382717 0 64.72691357 64.72691357 0 0 0-129.45382717 0z m0 328.25791889a64.72691357 64.72691357 0 1 0 129.45382717 0 64.72691357 64.72691357 0 0 0-129.45382717 0zM266.96239859 892.0608812a64.72691357 64.72691357 0 1 0 64.72691358-112.109326 64.72691357 64.72691357 0 0 0-64.72691358 112.109326zM659.94723103 836.00621819a64.72691357 64.72691357 0 1 0 129.45382717 2e-8 64.72691357 64.72691357 0 0 0-129.45382717 0z"></path>
                        </svg>
                    )
                }
            }
            return <Icon v-slots={iconSlots} {...attrs}/>
        }
    }
})

