
'Life Updates' Phase I (Full Stack Project)

1. Features
    1. Add a Life Update
        1. Set visiblity - private/public
        2. Set category - career, emotional, social, etc - **TBD**
            1. **Self** 
            → personal growth, mindset, habits, identity, hobbies
            2. **Relationships**
            → partner, family, friends, social life
            3. **Work**
            → career, job, professional development
            4. **Money**
            → income, spending, savings, investments, possessions
            5. **Health**
            → physical health, fitness, nutrition, sleep
            6. **Life & Experiences**
            → home, travel, events, adventures, lifestyle
        3. Upload image with caption

    2. Feed showing all updates in card format
        1. Public feed shows all public
        2. Private feed shows your private + other public 
        3. Can filter feed to view based on:
            1. date - Last week, Last month, Last 6 months, Last 1 year
            2. Category - for ex: show only emotional life updates.


    3. Signup with username/password.

2. Constraints
    1. Signup required to add a life update and view private updates
    2. Image size can be max 10MB, server must store after compressing it to <1MB. 
    3. Every username is pre-fixed with ''@ 

3. Tech Stack
    1. React w Typescript
    2. Node.js
    3. Express
    4. PostgreSQL

4. Backend Architecture
    1. Http Endpoints - v1
        1. /posts - GET, POST, PATCH
        2. /users - GET, POST
        3. /uploads - GET

    2. DB Schemas/Tables
        1. Post - added_by, img_url, caption, created_at, category, id
        2. User - username, password, id

    3. Major Logic
        1. Authentication using JWT token
        2. Image compression and public link retrieval
        3. Query logic for posts

    4. File/Folder structure
        1. app.ts 🗒️
        2. server.ts 🗒️
        3. middleware 📁
            1. cors.middleware.ts
            2. auth.middleware.ts
            3. error.middleware.ts

        4. db 📁
            1. postgres.ts

        5. views 📁
            1. add-post.html
            2. posts.html
            3. login.html
            4. error-404.html

        6. auth 📁
            1. auth.routes.ts
            2. auth.controller.ts
            3. auth.service.ts
            4. auth.repository.ts
            5. auth.type.ts

        7. users 📁
            1. users.routes.ts
            2. users.controller.ts
            3. users.service.ts
            4. users.repository.ts
            5. users.type.ts

        8. posts 📁
            1. posts.routes.ts
            2. posts.controller.ts
            3. posts.service.ts
            4. posts.repository.ts
            5. posts.type.ts
6. Frontend Architecture
    1. Browser will render the server side HTML as received as response
