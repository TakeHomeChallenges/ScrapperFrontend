import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const url = "https://66595545de346625136c0091.mockapi.io/news/logs/add";

    const APIResponse = await axios.get(url);

    // Create a promise for each delete operation
    const deletePromises = APIResponse.data.map((log) => {
      const deleteUrl = `https://66595545de346625136c0091.mockapi.io/news/logs/add/${log.id}`;
      return axios.delete(deleteUrl);
    });

    console.log('before delete operation')

    await Promise.all(deletePromises);

    // Respond with success message
    return NextResponse.json({ logs: APIResponse.data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
