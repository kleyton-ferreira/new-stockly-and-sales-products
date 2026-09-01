"use server"

import { actionClient } from "@/app/_lib/safe-actions";
import { deleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient.schema(deleteSaleSchema).action(async ({ parsedInput: { id } }) => {

    // Iniciando a transação
    await db.$transaction(async (trx) => {
        // Buscando a venda
        const sale = await trx.sale.findUnique({
            where: {
                id,
            },
            include: {
                products: true
            }
        })
        if (!sale) return

        // Deletando a venda
        await trx.sale.delete({
            where: {
                id
            }
        })

        for (const product of sale.products) {

            // Atualizando o estoque do produto
            await trx.product.update({
                where: {
                    id: product.productId
                },
                data: {
                    stock: {
                        increment: product.quantity
                    }
                }
            })
        }

    })

    revalidatePath("/sale")
    revalidatePath("/products")
    revalidatePath("/")
})