export interface card {
    courseCode: string,
    courseName: string,
    courseInstructor: string,
    courseStartDate: string,
    courseEndDate: string,
    totalSeats: number,
    remainingSeats: number,
    courseDescription: string,
    active: 1,
    isWishlist: boolean
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
