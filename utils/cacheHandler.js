let cache = {};
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

setInterval(() => {
    const now = Date.now();
    for(const key in cache){
        if(cache[key].expires < now){
            delete cache[key];
        }
    }
}, CACHE_EXPIRATION_TIME);

const getFromCache = (key) => {
    const cached = cache[key];
    const now = Date.now();
    if (cached && cached.expires > now) {
        return cached.data;
    }
    return null;
};

const addToCache = (key, data) => {
    cache[key] = {
        data,
        expires: Date.now() + CACHE_EXPIRATION_TIME,
    };
};

const clearAllCache = () => {
    cache = {};
}

export { getFromCache , addToCache , clearAllCache};