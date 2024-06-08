import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

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
  const person = await db.person.findUnique({
    where: {
      id: person_id,
      deleted: false,
    },
  });

  if (!person) {
    return null;
  }

  return { name: person.name };
}
