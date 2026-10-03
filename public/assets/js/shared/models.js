export class PostData {
    added_by = undefined;
    // img_url;
    caption = '';
    category = null;
    is_pvt = null;

    constructor(userID) {
        this.added_by = userID;
    }
}

export const Category = {
    rsh: 'Relationship',
    mny: 'Money',
    hlt: 'Health',
    wrk: 'Work',
    slf: 'Self',
    lex: 'Life & Experiences'
}