import { connectToDatabase } from '@/utils/mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const { db } = await connectToDatabase();

  try {
    const profile = await db.collection('profiles').findOne({ email });
    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    return new Response('Error fetching profile', { status: 500 });
  }
}

export async function POST(req) {
  const { email, name, phone, address } = await req.json();
  const { db } = await connectToDatabase();

  try {
    await db.collection('profiles').updateOne(
      { email },
      { $set: { name, phone, address } },
      { upsert: true }
    );
    return new Response('Profile saved successfully', { status: 200 });
  } catch (error) {
    return new Response('Error saving profile', { status: 500 });
  }
}
