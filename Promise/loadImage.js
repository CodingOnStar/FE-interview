class imageCache {
    constructor() {
        this.hashmap = new Map();
    }
    async load (url) {
        return new Promise(resolve => {
            let image = new Image();
            image.src = url;
            if (!this.hashmap[url]) {
                image.addEventListener("load", () => {
                    this.hashmap[url] = image;
                    resolve(image);
                })
            } else {
                resolve(this.hashmap[url])
            }
        })
    }
}
const cache = new ImageCache();
const image1 = await cache.load('http://image1.jpg')