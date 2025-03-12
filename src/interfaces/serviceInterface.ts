export interface ServiceInterface<T> {
    fetchAll(): Promise<T[]>;
    fetchById(id: any): Promise<T | null>;
    create(item: T): Promise<T>;
    update(id: any, item: T): Promise<T | null>;
    delete(id: any): Promise<boolean>;
}