export interface Tour {
    ID: string;
    description: string;
    name: string;
    owner_id: string;
    route: string;
    telegram_chat_url: string | null;
    tour_categories: object[] | null;  // TODO
    tour_events: object[] | null;
    tour_images: Image[];
    tour_location: object | null;
    tour_panoramas: Panorama[] | null;
    tour_user_favorites: UserFavorites[] | null;
    tour_videos: object[] | null;
}

export interface TourEvent {
    ID: string;
    amount: number;
    data: string;
    insta_post_url: string;
    is_opened: boolean;
    place: string;
    price: number;
    purchases: Purchase[];
    Tour: Tour | null;
    tour_id: string;
}

export interface TourCategory {
    category: object | null;
    categoryID: string;
    tour: object | null;
    tour_id: string;
}

export interface Category {
    ID: string;
    name: string;
    TourCategories: TourCategory[];
}

export interface Purchase {
    ID: string;
    Status: string;
    TourEvent: TourEvent;
    TourEventID: string;
    User: UserData;
    UserID: string;
}

export interface PurchaseRequest {
    tour_event_id: string;
}

export interface LikeTourDTO {
    tour_id: string;
}

export interface Panorama {
    ID: string;
    panorama_url: string;
    tour: object | null;
    tour_id: string;
}

export interface Image {
    ID: string;
    image_url: string;
    tour: object | null;
    tour_id: string;
}

export interface WeatherCondition {
    code: number;
    icon: string;
    text: string;
}

export interface WeatherInfo {
    condition: WeatherCondition;
    temp_c: number;
    temp_f: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface UserFavorites {
    UserID: string;
    User: object | null;
    tour_id: string;
    Tour: object | null;
}

export interface UserData {
    ID: string;
    CreatedTours: Tour[];
    Email: string;
    FavoriteTours: UserFavorites[];
    Password: string | null;
    PurchasedTourEvents: Purchase[];
    Role: string;
    Username: string;
}

export interface Token {
    token: string;
}

// TODO: implement all interfaces and use them instead
// export class TourClass implements Tour {
//     ID: string = '';
//     description: string = '';
//     name: string = '';
//     owner_id: string = '';
//     route: string = '';
//     telegram_chat_url: string | null = null;
//     tour_categories: object[] | null = null;  // TODO
//     tour_events: object[] | null = null;
//     tour_images: Image[] = [];
//     tour_location: object | null = null;
//     tour_panoramas: Panorama[] | null = null;
//     tour_user_favorites: UserFavorites[] | null = null;
//     tour_videos: object[] | null = null;

//     constructor(
//         ID: string = '',
//         description: string = '',
//         name: string = '',
//         owner_id: string = '',
//         route: string = '',
//         telegram_chat_url: string | null = null,
//         tour_categories: object[] | null = null,  // TODO
//         tour_events: object[] | null = null,
//         tour_images: Image[] = [],
//         tour_location: object | null = null,
//         tour_panoramas: Panorama[] | null = null,
//         tour_user_favorites: UserFavorites[] | null = null,
//         tour_videos: object[] | null = null,
//     ) {
//         this.ID = ID;
//         this.description = description;
//         this.name = name;
//         this.owner_id = owner_id;
//         this.route = route;
//         this.telegram_chat_url = telegram_chat_url;
//         this.tour_categories = tour_categories;  // TODO
//         this.tour_events = tour_events;
//         this.tour_images = tour_images;
//         this.tour_location = tour_location;
//         this.tour_panoramas = tour_panoramas;
//         this.tour_user_favorites = tour_user_favorites;
//         this.tour_videos = tour_videos;
//     }
// }

// TODO: Remove, pseudo Events fetching
// export function pseudoEvents(): TourEvent[] {
//     let tourEvents = [];
//     let tours = pseudoTours();
//     for (let i = 0; i < 12; i++) {
//         tourEvents.push({
//             ID: `68d3dd8a-98b7-4d8a-81eb-d8bb${Math.floor(i/10)}f${i%10}15aa5`,
//             amount: 10,
//             data: `April ${23-i}`,
//             insta_post_url: '',
//             is_opened: true,
//             place: '',
//             price: Number(`${150 - i*10}`),
//             purchases: [],
//             Tour: tours[i],
//             tour_id: ''
//         });
//     }
//     return tourEvents;
// }

// export function pseudoTours(): Tour[] {
//     let tours = [];
//     for (let i = 0; i < 12; i++) {
//         let name0 = [
//             'Kolsay, kaindy lakes & charyn canyon',
//             'Shymbulak & Kok Tobe  Day Tour',
//             'Kazakh Ethno Village Tour ',
//             'Almaty sightseeing  tour',
//             'issyk lake & bear waterfall',
//             'Assy plateau',
//             'English stand up',
//             'Qazaqstan Coffee Festival',
//             "Chef's Point Gastronomic Festival - Nomad Cusine",
//             'Altyn Emel - Singing Barkhan',
//             'All stars jam session - Jazz music and improvisation',
//             'Tekes Waterfall and Lake Tuzkol',
//         ];
//         let desc0 = [
//             'TOP natural landmarks of Almaty - Charyn Canyon, Black and Moon Canyons, Kolsay and Kaindy Lakes',
//             'Almaty - Shymbulak High-Mountain Ski Resort, ride on a Cable Car',
//             'enjoy an authentic theatrical show program',
//             'visit the landmarks of Almaty city & try national cuisine',
//             'short hike deep into the Turgen mountain gorge, where the Bear waterfall is located ',
//             'high-mountain plateau of Assy, the route that runs through the  gorge of the Turgen River ',
//             'Come to the atmosphere of laughter, openness and relaxed vibe.',
//             "The coffee event you've been waiting for! Almaty will become the capital of coffee magic.",
//             'NOMAD Cuisine gastrofestival will become a real celebration of taste and culture.',
//             "have the opportunity to climb the sand on Barkhan, enjoy the stunning scenery",
//             "Jam Session is not only music, but also communication with like-minded people. ",
//             "see alpine meadows, flocks of sheep, Kazakh yurts, the famous Khan-Tengri peak!",
//         ];
//         let images = [
//             'kolsai-kaindy.png',
//             'shymbulak.png',
//             'ethno-village.png',
//             'almaty.png',
//             'issyk-lake.png',
//             'assy.png',
//             'stand-up.png',
//             'coffee-festival.png',
//             'nomad-cuisine.png',
//             'altyn-emel.png',
//             'jazz.png',
//             'tekes-waterfall.png',
//         ];
//         tours.push({
//             ID: `db4b${Math.floor(i/10)}7ff-1f3${i%10}-4e2c-bb13-94380cec7df5`,
//             description: desc0[i],
//             name: name0[i],
//             owner_id: `c${Math.floor(i/10)}0e${i%10}611-60cb-4cdb-804c-3c0c00ab082b`,
//             route: name0[i],
//             telegram_chat_url: null,
//             tour_categories: null,
//             tour_events: null,
//             tour_images: [{ID: '', image_url: `assets/images/${images[i]}`, tour: null, tour_id: `db4b${Math.floor(i/10)}7ff-1f3${i%10}-4e2c-bb13-94380cec7df5`}],
//             tour_location: null,
//             tour_panoramas: null,
//             tour_user_favorites: null,
//             tour_videos: null
//         });
//     }
//     return tours;
// }