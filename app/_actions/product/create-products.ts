"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { CreatedProductSchema, createdProductSchema } from "./schema"

export const createdProduct = async (data: CreatedProductSchema) => {
    createdProductSchema.parse(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await db.product.upsert({
        where: { id: data.id ?? "" },
        update: data,
        create: data
    })
    revalidatePath("/products")
}