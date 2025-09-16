import{Request, Response} from "express";
import Search from '../models/search.models';

export const addSearch = async(req:Request, res:Response) =>{
    try{
        const {city} = req.body;
        const newSearch = new Search({city});
        await newSearch.save();
    }catch(error){
        res.status(500).json({error:"Failed to save search"});
    }
};

export const getSearches = async(req:Request, res:Response)=>{
    try{
        const searches = await Search.find().sort({createdAt:-1}).limit(10);
        res.json(searches);
    }catch(error){
        res.status(500).json({error:"Failed to fetch searches"})
    }
};