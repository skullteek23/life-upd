export const Category = {
    rsh: 'Relationship',
    mny: 'Money',
    hlt: 'Health',
    wrk: 'Work',
    slf: 'Self',
    lex: 'Life & Experiences'
}

export class Post {
    id = undefined;
    added_by = undefined;
    created_at = '';
    img_url = '';
    caption = '';
    category = '';
    is_pvt = 0;
}

export class PostPayload {
    caption = '';
    is_pvt = 0;
    photo = null;
    category = ''
}