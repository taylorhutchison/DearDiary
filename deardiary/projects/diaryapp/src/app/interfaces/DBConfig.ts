export interface IndexConfig {
    name: string;
    keyPath: string;
    config: Partial<{ unique: boolean }>
}

export interface StoreConfig {
    name: string,
    keyPath: string,
    indexes: IndexConfig[]
}

export interface DBConfig {
    name: string,
    stores: StoreConfig[]
}
