export interface ServiceInterface<T> {
    fetchAll(): T[];
    fetchById(id: number): T | undefined;
    create(item: T): T;
    update(id: number, item: T): T | null;
    delete(id: number): boolean;
}