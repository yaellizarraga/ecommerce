export interface product {
    id: number,
    productName: string;
    imgUrl: string;
    price: string;
    discount: string;
    description: string;
    images:[];
    detalles: string;
    familia?: string,
    categoria?: string,
    modelo?: string,
    marca?: string,
    color?: string,
    medida?: string,
}

export interface Filters {
    [key: string]: string[]; 
  }