class BrowserStorage {
    static save(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key: string) {
        const value = localStorage.getItem(key);
        if (value != null) {
            try {
                return JSON.parse(value);
            } catch (error) {
                return null;
            }
        }
        return null;
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

export default BrowserStorage;