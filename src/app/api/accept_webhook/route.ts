import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for validation
const PersonAddedSchema = z.object({
  person_id: z.string().uuid(),
  name: z.string(),
  timestamp: z.string(),
});

const PersonRenamedSchema = z.object({
  person_id: z.string().uuid(),
  name: z.string(),
  timestamp: z.string(),
});

const PersonRemovedSchema = z.object({
  person_id: z.string().uuid(),
  timestamp: z.string(),
});

const WebhookPayloadSchema = z.object({
  payload_type: z.enum(["PersonAdded", "PersonRenamed", "PersonRemoved"]),
  payload_content: z.unknown(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  let data;
  let body;

  let payload_content;
  try {
    data = (await req.json()) as unknown;
    body = WebhookPayloadSchema.parse(data);

    switch (body.payload_type) {
      case "PersonAdded":
        payload_content = PersonAddedSchema.parse(body.payload_content);
        break;
      case "PersonRenamed":
        payload_content = PersonRenamedSchema.parse(body.payload_content);
        break;
      case "PersonRemoved":
        payload_content = PersonRemovedSchema.parse(body.payload_content);
        break;
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json("Invalid input", { status: 400 });
  }

  try {
    console.log(payload_content);

    return NextResponse.json("Success", {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json("Server error", { status: 500 });
  }
}
