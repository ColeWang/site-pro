import type { App, InjectionKey, ObjectPlugin } from 'vue'
import { inject } from 'vue'
import { get } from 'lodash-es'
import version from './version'
// --
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

interface BaseSitePluginsOptions {
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

interface BaseSitePluginsExpose extends BaseDefaultPlugins {
    name: string;
    version: string;
    options: BaseSitePluginsOptions;
}

const SitePluginsInstanceKey: InjectionKey<BaseSitePluginsExpose> = Symbol('SitePlugins')

const defaultPlugins: BaseDefaultPlugins = {
    fullscreen: Fullscreen,
    loading: Loading,
    progress: Progress,
    screen: Screen
}

function install (app: App, options: BaseSitePluginsOptions): void {
    const $site: Partial<BaseSitePluginsExpose> = {
        name: 'site-plugins',
        version: version,
        options: options
    }

    app.config.globalProperties.$site = $site
    app.provide(SitePluginsInstanceKey, $site as BaseSitePluginsExpose)

    Object.keys(defaultPlugins).forEach((name) => {
        // fix: the context of type is not assignable to method's this of type
        const Plugin: any = defaultPlugins[name as keyof BaseDefaultPlugins]
        // -- install --
        const pluginOpts: any = get(options, name, {})
        Plugin.install.call(Plugin, app, { ...pluginOpts, $site })
    })
}

// 默认有值 避免使用时多余的判断
function useSite (): BaseSitePluginsExpose {
    return inject(SitePluginsInstanceKey, {} as BaseSitePluginsExpose)
}

function createSite (options: BaseSitePluginsOptions = {}): BaseSitePlugins {
    const installExtend = (app: App): void => {
        install(app, { ...options })
    }
    return { name: 'site-plugins', install: installExtend }
}

export { version }
export { useSite, createSite }
export { Fullscreen, Loading, Progress, Screen }

export type { BaseSitePlugins, BaseSitePluginsOptions, BaseSitePluginsExpose }
