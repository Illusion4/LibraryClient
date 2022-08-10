export interface Book{
    id:string,
    title:string,
    author:string,
    cover:string,
    rating:number,
    reviewsNumber:number
}

export interface BookCreating{
    id:string,
    title:string,
    author:string,
    cover:string,
    content:string,
    genre:string
}