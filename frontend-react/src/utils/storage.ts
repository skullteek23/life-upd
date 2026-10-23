class BrowserStorage {
    static save(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key: string) {
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