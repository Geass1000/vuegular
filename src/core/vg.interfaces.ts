
export interface DIProvider {
    providers?: any[];
}

export interface VgComponent extends DIProvider {
}

export interface VgService extends DIProvider {
}

export interface VgGlobalModule extends DIProvider {
    modules?: any[];
    exports?: any[];
}

export interface VgLocalModule extends VgGlobalModule {
    components?: any[];
    bootstrap?: any;
}

export interface VgModule extends VgLocalModule {
    global: boolean;
}