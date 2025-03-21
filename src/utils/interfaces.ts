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
    zipCode: number;
    cvr: number;
    status: string;
    responsible: string;
    activityStatus: string;
    phone: number;
    stampCardIds?: string[];
    contactIds?: string[];
    notes?: NoteInterface[];
}

export interface StampCardInterface {
    id?: string;
    clientId: string;
    name: string;
    created: string;
    stampValue: number;
    stampUnit: string;
    price: number;
    initialStampCount: number;
    currentStampCount: number;
    lastStamp: string;
    notes: string;
    stamps?: {
        stampTitle: string;
        stampDate: string;
        stampDescription: string;
        stampResponsible: string;
        stampsUsed: number;
    }[];
}

export interface ContactInterface {
    id?: string;
    clientId: string;
    name: string;
    mail: string;
    phone: string;
    title: string;
    notes?: NoteInterface[];
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    }
}

export interface NoteInterface {
    dateTime: string;
    note: string;
}

export interface StampInterface {
    id?: string;
    stampTitle: string;
    stampDate: string;
    stampDescription: string;
    stampResponsible: string;
    stampsUsed: number;
}