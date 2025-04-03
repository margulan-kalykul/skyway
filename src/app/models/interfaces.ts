export interface TourOld {
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

export interface Tour {
    id: string;
    description: string;
    owner_id: string;
    route: string;
    tour_categories: object[] | null;  // TODO
    tour_events: object[] | null;
    tour_images: Image[] | null;
    tour_location: object | null;
    tour_videos: object[] | null;
}

export interface Image {
    ID: string;
    image_url: string;
    tour: object | null;
    tour_id: string;
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