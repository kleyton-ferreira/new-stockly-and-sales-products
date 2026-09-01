import { db } from "@/app/_lib/prisma"

interface DashboardDto {
    totalRevenue: number
    todayRevenue: number
    totalSales: number
    totalStock: number
    totalProducts: number
}

export const getDashboard = async (): Promise<DashboardDto> => {

    // Total de Receita Definindo as Queries SQL para o Prisma
    const totalRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "totalRevenue"
     FROM "SaleProduct"
    `

    // Receita de Hoje
    const todayRevenueQuery = `
     SELECT COALESCE(SUM("unitPrice" * "quantity"), 0) as "todayRevenue"
     FROM "SaleProduct"
     WHERE "createdAt" > $1 AND "createdAt" < $2
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
        totalProducts
    }
}