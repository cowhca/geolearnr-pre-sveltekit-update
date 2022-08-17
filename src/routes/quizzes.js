import clientPromise from '$lib/mongo';
export async function GET() {
	const dbConnection = await clientPromise;
	const db = dbConnection.db('geolearnr');
	const collection = db.collection('quizzes');
	const findResult = await collection.find({}).toArray();
	return { status: 200, body: { findResult } };
}
// For offline development
// export async function GET() {
// 	return {
// 		status: 200,
// 		body: {
// 			findResult: [
// 				{ name: 'US Licence Plates', img: '/us_license_plates.jpeg', link: 'us-license-plates' }
// 			]
// 		}
// 	};
// }
