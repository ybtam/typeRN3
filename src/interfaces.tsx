export interface user {
    id:number,
    name: string,
    firstName: string,
    lastName: string,
    phone: number
    email: string,
}

export interface company {
    id: number,
    name: string,
    nip: number
}

export interface order {
    id: number,
    delivery: boolean,
    deliveryCost: number,
    subtotal: number,
    total: number,
    company: company
    orderProducts: [orderProduct]
}

export interface orderProduct {
    id: number,
    quantity: number,
    total: number,
    product: product
}

export interface product {
    id: number,
    code: string,
    description: string,
    category: category,
    allPrices: [price],
    twoPrice: [price],
    nowPrice: price
}

export interface price {
    id: number,
    price: number,
    createAt: Date
}

export interface category {
    id: number,
    name: string,
    description: string,
    products: [product]
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

export interface task {
    id: number,
    title: string,
    completed: boolean
}