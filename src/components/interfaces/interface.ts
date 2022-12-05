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
    contents: any
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

export interface exam {
    id: number,
    name: string,
    type: string
}

export interface content {
    id: number,
    name: string,
    type: string
}

export interface contentDetail {
    id: number,
    name: string,
    type: string,
    url: string,
    username: string,
    description: string
}

export interface resultContent {
    id: number,
    marks : number,
    exam : exam,
    answerMap : any,
}
