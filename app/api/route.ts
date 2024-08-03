import { NextResponse } from "next/server";



export async function GET() {
 return NextResponse.json({
  test: "hello"
 })
}
async function PUT() {
 return NextResponse.json({
  hello: "mf",
 })
}