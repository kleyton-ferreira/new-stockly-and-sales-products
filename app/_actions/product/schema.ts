import z from "zod";

export const createdProductSchema = z.object({

    id: z.string().uuid().optional(),

    name: z
        .string()
        .trim()
        .min(1, {
            message: "O nome do produto é obrigatório",
        })
        .max(20, {
            message: "O nome não pode exceder 20 caracteres",
        }),
    price: z.number().min(0.01, {
        message: "O preço do produto é obrigatório.",
    }),
    stock: z.number().min(0, {
        message: "A quantidade de estoque é obrigatória.",
    }),
});

export type CreatedProductSchema = z.infer<typeof createdProductSchema>