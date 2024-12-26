import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { concat, map, reduce, set } from 'lodash-es'
import Layout from '@/Layout.vue'
import Home from '@/Home.vue'

type GlobResult = Record<string, () => Promise<any>>;

function extractParts (path: string): string[] {
    const regExp: RegExp = /(?:.*\/)?src\/([^\/]+)\/demos\/([^\/]+)\.\w+/
    const result: RegExpMatchArray | null = path.match(regExp)
    return result ? [result[1], result[2]] : []
}

function nameToCamelCase (name: string): string {
    const regExp: RegExp = /(?:^|-|_)([a-z])/g
    return name.toLowerCase().replace(regExp, (_, char) => {
        return char.toUpperCase()
    })
}

function createDemosRoute (parent: GlobResult, parentName: string): RouteRecordRaw[] {
    return map(parent, (component, name) => {
        const routeName: string = nameToCamelCase(name)
        return {
            path: routeName,
            name: parentName + routeName,
            meta: {
                title: routeName,
            },
            component: component
        }
    })
}

function createRoutes (): RouteRecordRaw[] {
    const files: GlobResult = import.meta.glob('../src/**/demos/*.{ts,tsx}')

    const demos: Record<string, GlobResult> = reduce(files, (result, component, path) => {
        return set(result, extractParts(path), component)
    }, {} as Record<string, GlobResult>)

    return map(demos, (parent, name) => {
        const routeName: string = nameToCamelCase(name)
        return {
            path: '/' + routeName,
            name: routeName,
            meta: {
                title: routeName,
            },
            component: Layout,
            children: createDemosRoute(parent, routeName)
        }
    })
}

export const routes: RouteRecordRaw[] = createRoutes()

export default () => {
    return createRouter({
        history: createWebHashHistory(),
        routes: concat([
            {
                path: '/',
                name: '_home',
                redirect: { name: 'Home' },
                component: Layout,
                children: [
                    {
                        path: 'Home',
                        name: 'Home',
                        component: Home
                    }
                ]
            },
            {
                path: '/:pathMatch(.*)*',
                redirect: { name: 'Home' },
            }
        ], routes)
    })
}
