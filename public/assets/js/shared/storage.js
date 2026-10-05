class BrowserStorage {
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        const value = localStorage.getItem(key);
        if (value != null) {
            return JSON.parse(value);
        }
        return null;
    }

    static clear() {
        localStorage.clear();
    }
}

export default BrowserStorage;