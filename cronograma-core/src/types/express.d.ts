import express from 'express';

//declarando o tipo do usuario no request para ser usado em todos os controllers
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            }
        }
    }
}