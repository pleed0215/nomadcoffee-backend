import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const PAGE_SIZE = process.env.PAGE_SIZE ? +process.env.PAGE_SIZE : 10;
