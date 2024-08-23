export interface Dictionary<T = any> {
    [key: string]: T;
}

export type Recordable<T = any> = Record<string, T>;

export type BaseNamePath = string | number | (string | number)[];

export interface BaseFieldNames extends Dictionary {
    value?: string;
    label?: string;
    children?: string;
}

export interface BaseEnumType {
    [key: string]: string | number | {
        text?: any;
        value?: string | number;
        disabled?: boolean;
    } & Dictionary;
}

export interface BaseOptionType extends Dictionary {
    label?: any;
    value?: string | number;
    disabled?: boolean;
    children?: BaseOptionType[];
}
