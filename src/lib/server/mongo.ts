import { getServers, setServers } from 'node:dns';
import { env } from '$env/dynamic/private';
import { MongoClient, type Db } from 'mongodb';

const globalForMongo = globalThis as typeof globalThis & {
	_mongoClientPromise?: Promise<MongoClient>;
};

if (import.meta.env.DEV) {
	globalForMongo._mongoClientPromise = undefined;
}

/** Node on some Windows setups only has 127.0.0.1 as a resolver, which refuses SRV lookups Atlas needs. */
function ensureSrvCapableDns() {
	const servers = getServers();
	const onlyLoopback = servers.every(
		(server) => server === '127.0.0.1' || server === '::1' || server.startsWith('127.0.0.1:')
	);
	if (onlyLoopback) {
		setServers(['8.8.8.8', '1.1.1.1', ...servers]);
	}
}

function getClientPromise() {
	const uri = env.MONGOURI;
	if (!uri) {
		throw new Error('MONGOURI is not set');
	}

	if (!globalForMongo._mongoClientPromise) {
		ensureSrvCapableDns();
		const client = new MongoClient(uri);
		globalForMongo._mongoClientPromise = client.connect().catch((error) => {
			globalForMongo._mongoClientPromise = undefined;
			throw error;
		});
	}

	return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
	const client = await getClientPromise();
	return client.db('unitymural');
}

export async function pingDb() {
	const db = await getDb();
	await db.command({ ping: 1 });
	return db;
}
