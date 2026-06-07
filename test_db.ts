import { createClient } from '@insforge/sdk';
import 'dotenv/config';

const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || 'http://127.0.0.1:7130',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'dummy'
});

async function run() {
  const { data, error } = await insforge.database.from('products').select('id, title, slug, price, category, rating_avg, review_count, images:product_images(url)').limit(1);
  console.log('ERROR:', JSON.stringify(error, null, 2));
  console.log('DATA:', data);
}
run();
