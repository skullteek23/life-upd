export type FILTERS_TYPES = 'date' | 'category';
export const KEYS = {
    lastw: 'last-w',
    lastm: 'last-m',
    last6m: 'last-6m',
    lasty: 'last-y',
    work: 'wrk',
    relationship: 'rsh',
    health: 'hlt',
    lifeAndExp: 'lex',
    money: 'mny',
    self: 'slf',
};

const FILTERS_MAP = (() => {
    const date = [
        { value: KEYS.lastw, label: 'This Week' },
        { value: KEYS.lastm, label: 'This Month' },
        { value: KEYS.last6m, label: '6 Months' },
        { value: KEYS.lasty, label: 'This Year' },
    ];

    const category = [
        { value: KEYS.work, label: 'Work related', imgSrc: 'images/wrk.svg' },
        { value: KEYS.relationship, label: 'Relationship related', imgSrc: 'images/rsh.svg' },
        { value: KEYS.health, label: 'Health related', imgSrc: 'images/hlt.svg' },
        { value: KEYS.lifeAndExp, label: 'Life & Experiences related', imgSrc: 'images/lex.svg' },
        { value: KEYS.money, label: 'Money related', imgSrc: 'images/mny.svg' },
        { value: KEYS.self, label: 'Self related', imgSrc: 'images/slf.svg' },
    ];

    return {
        get(type: FILTERS_TYPES) {
            switch (type) {
                case 'date':
                    return date;
                case 'category':
                    return category;
                default:
                    return [];
            }
        },
    };
})();

export default FILTERS_MAP;