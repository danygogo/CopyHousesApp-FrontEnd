export interface House
{
    id?:              number;
    title:            string;
    landSize:         number;
    constructionSize: number;
    lat:              number;
    lng:              number;
    kitchenAndLiving: boolean;
    price:            number;
    bedrooms:         number;
    hasPool:          boolean;
    details:          string;
    photo1?:           any;
    photo2?:           any;
    photo3?:           any;
    photo4?:           any;
    photo5?:           any;
    photo6?:           any;
    photo7?:           any;
    photo8?:           any;
    city:             string;
    parkings:         number;
    userId:           number;
    sold:             boolean;
    bathrooms:        number
  }