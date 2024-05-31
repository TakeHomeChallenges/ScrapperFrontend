import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(req, res) {

  try {
   
    const url = 'https://66595545de346625136c0091.mockapi.io/news/logs/add';

    const APIResponse = await axios.get(url);
    console.log('Successfully posted log entry:', APIResponse.data);

    return NextResponse.json({ logs: APIResponse.data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
