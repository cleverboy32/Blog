export const PageSize = {
    A2: {
        width: 420,
        height: 594,
    },
    A4: {
        width: 210,
        height: 297,
    },
    B2: {
        width: 500,
        height: 707,
    },
    B4: {
        width: 250,
        height: 353,
    },
    custom:{
        width: 250,
        height: undefined,
    }
}

export type PageSizeTypes = keyof typeof PageSize;