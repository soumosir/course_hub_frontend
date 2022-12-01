export interface card {
    id:number,
    code: string,
    name: string,
    instructor: string,
    startTime: string,
    endTime: string,
    totalSeats: number,
    remainingSeats: number,
    description: string,
    active: 1,
    isWishlist: boolean,
    exams : any,
    contents:any
}

export interface course {
    id: number,
    name: string,
    code: string,
    description: string,
    instructor: string,
    startTime: string,
    endTime: string,
    totalSeats: number
}

export interface exams {
    id: number,
    name: string,
    type: string
}

export interface contents {
    id: number,
    name: string,
    type: string
}
