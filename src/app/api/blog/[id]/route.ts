import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//ブログの詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try{
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        const post = await prisma.post.findFirst({where: {id}});
        return NextResponse.json({message: "success", post}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "error", err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};

//ブログの記事編集API
export const PUT = async (req: Request, res: NextResponse) => {
    try{
        const id: number = parseInt(req.url.split("/blog/")[1]);
        const {title, description} = await req.json();
        await main();
        const post = await prisma.post.update({where: {id}, data: {title, description}});
        return NextResponse.json({message: "success", post}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "error", err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};

//ブログの記事削除API
export const DELETE = async (req: Request, res: NextResponse) => {
    try{
        const id: number = parseInt(req.url.split("/blog/")[1]);        
        await main();
        const post = await prisma.post.delete({where: {id}});
        return NextResponse.json({message: "success", post}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "error", err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};
