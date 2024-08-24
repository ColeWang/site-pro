import type { App } from 'vue'
import Slider from './Slider'
import { fieldSliderProps } from './typings'

Slider.install = (app: App) => {
    app.component(Slider.name as string, Slider)
}

export { Slider as FieldSlider, fieldSliderProps }

export type { FieldSliderProps, FieldSliderInstance } from './typings'
