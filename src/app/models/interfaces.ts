export interface TourSearchResults {
    id: string;
    description: string;
    name: string;
    categories: string[] | null;
}


export interface Tour {
    ID: string;
    description: string;
    name: string;
    owner_id: string;
    route: string;
    telegram_chat_url: string | null;
    tour_categories: object[] | null;   
    tour_events: object[] | null;
    tour_images: Image[];
    tour_location: object | null;
    tour_panoramas: Panorama[] | null;
    tour_user_favorites: UserFavorites[] | null;
    tour_videos: Video[] | null;
    airpano_link: string;
}

export interface TourEvent {
    ID: string;
    amount: number;
    date: string;
    insta_post_url: string;
    is_opened: boolean;
    place: string;
    price: number;
    purchases: Purchase[];
    Tour: Tour | null;
    tour_id: string;
    tour_image_url: string;
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

export interface Video {
    ID: string;
    video_url: string;
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
    AvatarURL: string;
}

export interface Token {
    token: string;
}

export interface CustomPaymentIntent {
    clientSecret: string;
}

export interface IStripeSession {
    id: string;
}

export interface Message {
    ChatID: string;
    ID: string;
    UserID: string | null;
    chat: any | null;
    text: string;
    User?: {   
        ID: string | null;
        Username: string | null;
    };
}

export interface Chat {
    ChatMessages: Message[] | null;
    ID: string;
    description: string;
    name: string;
    owner: any | null;
    owner_id: string;
}

export interface RegisterForm {
    email: string,
    username: string,
    password: string,
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface RecommendationsResponse {
  user_id: string;
  recommendations: Recommendation[];
}

export interface JwtPayload {
    role: string;
}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
