import { connectToDB } from "@/lib/moongose";
import { Garbage } from "@/lib/models";

export async function POST(req) {
  try {
    const body = await req.json();
    const { image, latitude, longitude } = body;

    await connectToDB();
    const report = await Garbage.create({ image, latitude, longitude });

    return Response.json({ success: true, report });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to create report" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const reports = await Garbage.find().sort({ createdAt: -1 });
    if(reports.length>0)  return Response.json({ success: true, reports:reports[0] });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to fetch reports" }, { status: 500 });
  }
}
