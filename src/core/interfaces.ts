
export interface DIProvider {
    providers?: any[];
}

export interface VueComponent extends DIProvider {
}

export interface VueService extends DIProvider {
}

export interface VueModule extends DIProvider {
    components?: any[];
    modules?: any[];
    exports?: any[];
    bootstrap?: any;
}