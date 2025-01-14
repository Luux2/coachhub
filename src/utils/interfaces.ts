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
        mail: string;
        phone: string;
    }[];
    status: string;
    notes: {
        note: string;
        dateTime: string;
    }[];
    responsible: string;
    stampCards: {
        [key: string]: {
            name: string;
            created: string;
            stampValue: number;
            stampUnit: string;
            price: number;
            initialStampCount: number;
            currentStampCount: number;
            lastStamp: string;
        };
    };
}