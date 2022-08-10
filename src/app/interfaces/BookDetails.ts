export interface BookDetails{
    id:string,
    title:string,
    author:string,
    cover:string,
    content:string,
    genre:string,
    rating:number,
    reviews:BookReview[]
}

export interface BookReview{
    id:string,
    message:string,
    reviewer:string
}