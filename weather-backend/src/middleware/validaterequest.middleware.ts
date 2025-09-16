import { Request, Response, NextFunction } from "express";

export const validateCityRequest = (
    req: Request,
    res:Response,
    next:NextFunction
) => {
    const {city} = req.query;

    if(!city || typeof city !== "string" || city.trim() === ""){
        return res.status(400).json({
            success:false,
            message:"City name is required."
        });
    }
    next(); //move to controller
};