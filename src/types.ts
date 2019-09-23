export interface TnquirerPrompt {
    type: 'input' | 'confirm' | 'list' | 'rawlist' | 'expand' | 'checkbox' | 'password' | 'editor';
    name: string;
    message?: string;
    default?: string | Function;
    choices?: string[];
    validate?: (v: string)=> (string | boolean);
    filter?: <T>(v: T)=> T;
    transformer ?: Function;
    when?: <T>(v:T)=> boolean;
    pageSize?: number;
    prefix?: string;
    suffix?: string;
}