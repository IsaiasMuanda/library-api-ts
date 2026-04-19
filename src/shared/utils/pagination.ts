export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export function buildPaginationOptions(query: PaginationQuery) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 10))
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {
        [String(query.sort ?? "createdAt")]: query.order === "asc" ? 1 : -1
    };
    return { page, limit, skip, sort }
}

export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    }
}