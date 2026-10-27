export const FILTER_KEYS = {
    lastw: 'last-w',
    lastm: 'last-m',
    last6m: 'last-6m',
    lasty: 'last-y',
};

export const FILTERS = [
    {
        value: FILTER_KEYS.lastw, label: 'This Week', urlParamKey: 'within'
    },
    {
        value: FILTER_KEYS.lastm, label: 'This Month', urlParamKey: 'within'
    },
    { value: FILTER_KEYS.last6m, label: '6 Months', urlParamKey: 'within' },
    { value: FILTER_KEYS.lasty, label: 'This Year', urlParamKey: 'within' },
];
