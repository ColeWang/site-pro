import type { App, InjectionKey, ObjectPlugin } from 'vue'
import { inject } from 'vue'
import { get } from 'lodash-es'
import type { FullscreenPlugin, FullscreenPluginInstallOptions, FullscreenState } from './fullscreen'
import Fullscreen from './fullscreen'
import type { LoadingPlugin, LoadingPluginInstallOptions, LoadingState } from './loading'
import Loading from './loading'
import type { ProgressPlugin, ProgressPluginInstallOptions, ProgressState } from './progress'
import Progress from './progress'
import type { ScreenPlugin, ScreenPluginInstallOptions, ScreenState } from './screen'
import Screen from './screen'

interface BaseSitePlugins extends ObjectPlugin {
    name: string;
}

interface BaseSiteOptions {
    fullscreen?: FullscreenPluginInstallOptions;
    loading?: LoadingPluginInstallOptions;
    progress?: ProgressPluginInstallOptions;
    screen?: ScreenPluginInstallOptions;
}

interface BaseDefaultPlugins {
    fullscreen: FullscreenState & FullscreenPlugin;
    loading: LoadingState & LoadingPlugin;
    progress: ProgressState & ProgressPlugin;
    screen: ScreenState & ScreenPlugin;
}

interface BaseSiteExpose extends BaseDefaultPlugins {
    name: string;
    version: string;
    options: BaseSiteOptions;
}

const version: string = __VERSION__

const SiteInstanceKey: InjectionKey<BaseSiteExpose> = Symbol('SitePro')

const defaultPlugins: BaseDefaultPlugins = {
    fullscreen: Fullscreen,
    loading: Loading,
    progress: Progress,
    screen: Screen
}

function install (app: App, options: BaseSiteOptions) {
    const $site: Partial<BaseSiteExpose> = {
        name: 'site-pro',
        version: version,
        options: options
    }

    app.config.globalProperties.$site = $site
    app.provide(SiteInstanceKey, $site as BaseSiteExpose)

    Object.keys(defaultPlugins).forEach((name) => {
        // fix: the context of type is not assignable to method's this of type
        const Plugin: any = defaultPlugins[name as keyof BaseDefaultPlugins]
        // -- install --
        const pluginOpts: any = get(options, name, {})
        Plugin.install.call(Plugin, app, { ...pluginOpts, $site })
    })
}

// 默认有值 避免使用时多余的判断
function useSite (): BaseSiteExpose {
    return inject(SiteInstanceKey, {} as BaseSiteExpose)
}

function createSite (options: BaseSiteOptions = {}): BaseSitePlugins {
    const installExtend = (app: App) => {
        install(app, { ...options })
    }
    return { name: 'site-pro', install: installExtend }
}

export { version }
export { useSite, createSite }
export { Fullscreen, Loading, Progress, Screen }

export type { BaseSitePlugins, BaseSiteOptions, BaseSiteExpose }
