"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { createdProductSchema } from "./schema"
import { actionClient } from "@/app/_lib/safe-actions"

export const createdProduct = actionClient.schema(createdProductSchema).action(async ({ parsedInput: { id, ...data } }) => {
    createdProductSchema.parse(data)
    await db.product.upsert({
        where: { id: id ?? "" },
        update: data,
        create: data
    })
    revalidatePath("/products")
})