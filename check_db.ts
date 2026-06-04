import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    await client.connect();
    
    console.log('--- ÚLTIMO CRON LOG ---');
    const logRes = await client.query('SELECT * FROM "CronLog" ORDER BY "createdAt" DESC LIMIT 1;');
    console.log(logRes.rows[0]);
    
    console.log('\n--- ÚLTIMO ARTÍCULO ---');
    const articleRes = await client.query('SELECT title, content FROM "Article" ORDER BY "publishDate" DESC LIMIT 1;');
    console.log(articleRes.rows[0].title);
    console.log(articleRes.rows[0].content.substring(0, 500));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

main();
