import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pingDb } from '$lib/server/mongo';

const VISITOR_COOKIE = 'mural_visitor';
const BASELINE = 11038;
const COOKIE_MAX_AGE = 60 * 60 * 24;

type VisitorStats = {
	_id: string;
	count: number;
	updatedAt?: Date;
};

async function visitorsCollection() {
	const db = await pingDb();
	const col = db.collection<VisitorStats>('stats');
	await col.updateOne({ _id: 'visitors' }, { $setOnInsert: { count: BASELINE } }, { upsert: true });
	return col;
}

async function readCount() {
	try {
		const col = await visitorsCollection();
		const doc = await col.findOne({ _id: 'visitors' });
		return json({ count: doc?.count ?? BASELINE });
	} catch (error) {
		console.error(
			'Failed to read visitor count',
			error instanceof Error ? error.message : error
		);
		return json({ count: BASELINE }, { status: 503 });
	}
}

export const GET: RequestHandler = async () => {
	return readCount();
};

export const POST: RequestHandler = async ({ cookies }) => {
	try {
		const col = await visitorsCollection();
		const alreadyCounted = cookies.get(VISITOR_COOKIE);

		if (!alreadyCounted) {
			await col.updateOne(
				{ _id: 'visitors' },
				{ $inc: { count: 1 }, $set: { updatedAt: new Date() } }
			);
			cookies.set(VISITOR_COOKIE, '1', {
				path: '/',
				maxAge: COOKIE_MAX_AGE,
				httpOnly: true,
				sameSite: 'lax'
			});
		}

		const doc = await col.findOne({ _id: 'visitors' });
		return json({ count: doc?.count ?? BASELINE });
	} catch (error) {
		console.error(
			'Failed to ping visitor count',
			error instanceof Error ? error.message : error
		);
		return json({ count: BASELINE }, { status: 503 });
	}
};
