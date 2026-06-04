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
    
    const deleteRes = await client.query("DELETE FROM \"CronLog\" WHERE status = 'ERROR';");
    console.log(`Borrados ${deleteRes.rowCount} errores antiguos.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

main();
