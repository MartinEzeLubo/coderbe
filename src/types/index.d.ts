export {};

declare module 'express-session' {
    interface SessionData {
        contador: number,
        login: boolean
    }
}