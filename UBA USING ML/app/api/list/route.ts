import {NextResponse} from "next/server";

export async function GET(req:Request){
    console.log(req.url)
    return NextResponse.json(
        {
            hello:"this is from the list route"
        }
    )
}