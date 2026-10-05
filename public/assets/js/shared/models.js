export class PostData {
    added_by = undefined;
    // img_url;
    caption = '';
    category = null;
    is_pvt = null;
}

export const Category = {
    rsh: 'Relationship',
    mny: 'Money',
    hlt: 'Health',
    wrk: 'Work',
    slf: 'Self',
    lex: 'Life & Experiences'
}

export class User {
    username = '';
    password = '';
}