export interface UserInterface {
    id?: string;
    email: string;
    name: string;
    uid: string;
}

export interface ClientInterface {
    id?: string;
    companyName: string;
    address: string;
    city: string;
    zipCode: string;
    cvr: number;
    contacts: {
        name: string;
        email: string;
        phone: string;
    }[];
    status: string;
    notes: {
        note: string;
        dateTime: string;
    }[];
    responsible: string;
}