import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

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
        await addPerson(payload_content);
        break;

      case "PersonRenamed":
        payload_content = PersonRenamedSchema.parse(body.payload_content);
        await renamePerson(payload_content);
        break;

      case "PersonRemoved":
        payload_content = PersonRemovedSchema.parse(body.payload_content);
        await removePerson(payload_content);
        break;
    }

    return NextResponse.json("Success", {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json("Invalid input", { status: 400 });
  }
}

const addPerson = async (payload_content: {
  person_id: string;
  name: string;
  timestamp: string;
}) => {
  const person = await db.person.create({
    data: {
      id: payload_content.person_id,
      name: payload_content.name,
    },
  });

  if (!person) {
    throw new Error("Failed to create Person.");
  }

  const record = await db.personHistory.create({
    data: {
      type: "PersonAdded",
      personId: person.id,
      changeData: JSON.stringify(payload_content),
    },
  });

  if (!record) {
    throw new Error("Failed to create PersonHistory record.");
  }
};

const renamePerson = async (payload_content: {
  person_id: string;
  name: string;
  timestamp: string;
}) => {
  const person = await db.person.update({
    where: { id: payload_content.person_id, deleted: false },
    data: { name: payload_content.name },
  });

  if (!person) {
    throw new Error("Failed to update Person.");
  }

  const record = await db.personHistory.create({
    data: {
      type: "PersonRenamed",
      personId: person.id,
      changeData: JSON.stringify(payload_content),
    },
  });

  if (!record) {
    throw new Error("Failed to create PersonHistory record.");
  }
};

const removePerson = async (payload_content: {
  person_id: string;
  timestamp: string;
}) => {
  const person = await db.person.update({
    where: { id: payload_content.person_id, deleted: false },
    data: { deleted: true },
  });

  if (!person) {
    throw new Error("Failed to delete Person.");
  }

  const record = await db.personHistory.create({
    data: {
      type: "PersonRemoved",
      personId: person.id,
      changeData: JSON.stringify(payload_content),
    },
  });

  if (!record) {
    throw new Error("Failed to create PersonHistory record.");
  }
};
