export class Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    constructor() {
        this.source = new Source();
    }
}



export class Source {
    id: string;
    name: string;
    constructor() { }
}