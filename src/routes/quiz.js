// import clientPromise from '$lib/mongo';
// export async function GET() {
// 	const dbConnection = await clientPromise;
// 	const db = dbConnection.db('geolearnr');
// 	const collection = db.collection('questions');
// 	const findResult = await collection.find({}).toArray();
// 	return { status: 200, body: { findResult } };
// }
import { questions } from './questions.js';

export async function GET({ url }) {
	let output = [];
	const urlName = url.searchParams.get('name');
	const urlNum = url.searchParams.get('num');
	if (urlName === null && urlNum === null) {
		output = questions;
	} else if (urlName === null && urlNum !== null) {
		// output = questions.shuffle.slice(0, urlNum);
	} else {
		const name = urlName.split('-').join('_');
		let questionsPerType = {};
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].quiz === name) {
				if (Object.keys(questionsPerType).indexOf(questions[i].type) == -1) {
					questionsPerType[questions[i].type] = [questions[i]];
				} else {
					questionsPerType[questions[i].type].push(questions[i]);
				}
			}
		}
		const types = Object.keys(questionsPerType);
		for (let i = 0; i < url.searchParams.get('num'); i++) {
			let typeIndex = Math.floor(Math.random() * types.length);
			let typeArray = questionsPerType[types[typeIndex]];

			let groupIndex = Math.floor(Math.random() * typeArray.length);
			output.push(typeArray[groupIndex]);
		}
	}
	return {
		status: 200,
		body: {
			findResult: output
		}
	};
}
