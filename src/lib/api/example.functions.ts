"use server";

import { z } from "zod";
import { getServerConfig } from "../config.server";

export async function getGreeting(data: { name: string }) {
  const parsed = z.object({ name: z.string().min(1) }).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  
  const config = getServerConfig();
  return {
    greeting: `Hello, ${parsed.data.name}!`,
    mode: config.nodeEnv ?? "unknown",
  };
}
