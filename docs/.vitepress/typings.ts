export interface Token {
    type: string;
    tag: string;
    attrs: Array<[string, string]> | null;
    map: [number, number] | null;
    nesting: 1 | 0 | -1;
    level: number;
    children: Token[] | null;
    content: string;
    markup: string;
    info: string;
    meta: any;
    block: boolean;
    hidden: boolean;
    attrIndex: (name: string) => number;
    attrPush: (attrData: [string, string]) => void;
    attrSet: (name: string, value: string) => void;
    attrGet: (name: string) => string | null;
    attrJoin: (name: string, value: string) => void;
}
