import 'dotenv/config';
import app from "./app"
import pool from './db/postgres';

const PORT = Number(process.env.PORT) || 2000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    try {
        await pool.connect();
        console.log('PostgreSQL connected');
    } catch (error) {
        console.log('PostgreSQL connection failed: ', error);
    }
})