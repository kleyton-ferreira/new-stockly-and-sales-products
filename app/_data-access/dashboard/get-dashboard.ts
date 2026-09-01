import "server-only"

import { db } from "@/app/_lib/prisma"
import dayjs from "dayjs"

export interface DayTotalRevenue {
    day: string
    totalRevenue: number
}

interface DashboardDto {
    totalRevenue: number
    todayRevenue: number
    totalSales: number
    totalStock: number
    totalProducts: number
    totalLast14DaysRevenue: DayTotalRevenue[]
}

export const getDashboard = async (): Promise<DashboardDto> => {
    // NOVA FUNÇAO DO GRAFICO
    // Definindo o dia atual e os últimos 14 dias  : essa funçao e os graficos do dashboard
    // Essa função calcula quanto de receita foi gerada em cada um dos últimos 14 dias. Vou quebrar tudo:
    const today = dayjs().endOf("day").toDate()
    const last14Day = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((day) => {
        return dayjs(today).subtract(day, "day")
    })

    const totalLast14DaysRevenue: DayTotalRevenue[] = []
    for (const day of last14Day) {
        const dayTotalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(
            `
        SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
        FROM "SaleProduct"
        JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
        WHERE "Sale"."date" > $1 AND "Sale"."date" < $2
        `,
            day.startOf("day").toDate(),
            day.endOf("day").toDate()
        )

        totalLast14DaysRevenue.push({
            day: day.format("DD/MM"),
            totalRevenue: dayTotalRevenue[0].totalRevenue
        })
    }


    // Total de Receita Definindo as Queries SQL para o Prisma
    const totalRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
     FROM "SaleProduct"
     JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    `
    // Receita de Hoje
    const todayRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "todayRevenue"
     FROM "SaleProduct"
     JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
     WHERE "Sale"."date" > $1 AND "Sale"."date" < $2
    `
    // Definindo o início e fim do dia
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
    // Executando as Queries SQL
    const totalRevenuePromise = db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery)
    const todayRevenuePromise = db.$queryRawUnsafe<{ todayRevenue: number }[]>(todayRevenueQuery, startOfDay, endOfDay)
    // Total de Vendas
    const totalSalesPromise = db.sale.count()
    // Total de Estoque
    const totalStockPromise = db.product.aggregate({
        _sum: {
            stock: true
        },
    })

    // Total de Produtos
    const totalProductsPromise = db.product.count()

    // Executando todas as Promises e retornando os resultados
    const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] = await Promise.all([
        totalRevenuePromise,
        todayRevenuePromise,
        totalSalesPromise,
        totalStockPromise,
        totalProductsPromise
    ])

    return {
        totalRevenue: Number(totalRevenue[0].totalRevenue),
        todayRevenue: Number(todayRevenue[0].todayRevenue),
        totalSales,
        totalStock: Number(totalStock._sum.stock),
        totalProducts,
        totalLast14DaysRevenue
    }
}

