import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const QueryParamsSchema = z.string().uuid();

export async function GET(req: NextRequest, res: NextResponse) {
  let queryParams;
  try {
    queryParams = QueryParamsSchema.parse(
      req.nextUrl.searchParams.get("person_id"),
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json("Invalid input", { status: 400 });
  }
  try {
    const name = await fetchName(queryParams);
    return NextResponse.json(name, { status: 200 });
  } catch (e) {
    return NextResponse.json("Server error", { status: 500 });
  }
}

async function fetchName(person_id: string) {
  if (person_id === "111e2222-e89b-12d3-a456-426614174000") {
    return "Jane Doe";
  } else {
    return null;
  }
}
