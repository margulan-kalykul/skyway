export interface Tour {
    id: number;
    name: string;
    image: string;
    start_end_point: string;
    distance: string;
    duration: string;
    availability: string;
    price: number | null;
    type: string | null;
    top_left: string[] | null;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface Token {
    token: string;
}

// export interface ToursByHeader {
//     header_id
// }