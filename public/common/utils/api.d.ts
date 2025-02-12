export declare class Api {
    static post(url: string, body: any): Promise<any>;
    static patch(url: string, body: any): Promise<any>;
    static fetch(url: string, options: any, timeout?: number): Promise<any>;
}
