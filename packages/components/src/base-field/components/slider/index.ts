import type { App } from 'vue'
import Slider from './Slider'
import { fieldSliderProps, fieldSliderSlots } from './typings'

Slider.install = function (app: App): App {
    app.component(Slider.name as string, Slider)
    return app
}

export { Slider as FieldSlider, fieldSliderProps, fieldSliderSlots }

export type { FieldSliderFieldProps, FieldSliderProps, FieldSliderInstance } from './typings'
