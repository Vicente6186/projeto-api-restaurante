import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../models/app-error";

function errorMiddleware(error, request: Request, response: Response, next: NextFunction) {
    if(error instanceof AppError) response.status(error.status).json({message: error.message});
    else if(error instanceof ZodError) response.status(400).json({message: error.format()});
    else {
        console.log(error);
        response.status(500).send()
    }
}

export default errorMiddleware