export interface user {
    id:number,
    name: string,
    email: string,
}

export interface company {
    id: number,
    name: string
}

export interface order {
    id: number,
    total: number,
    company: company

}

export interface project {
    id: number,
    name: string,
    noTasks: number,
    noTasksCompleted: number,
}

export interface checkIn {
    id: number,
    createAt: Date
}

export interface checkOut {
    id: number,
    createAt: Date
    minutes_worked: number
}