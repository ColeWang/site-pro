export interface BaseLocale {
    [key: string]: string | number | BaseLocale | BaseLocale[];
}

export interface BaseStateLocale {
    locale?: BaseLocale;
    __MARK__?: string;
}
