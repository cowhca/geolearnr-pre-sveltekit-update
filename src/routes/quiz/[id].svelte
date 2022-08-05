<script context="module">
	export async function load({ fetch, params }) {
		const res = await fetch(`/quiz?name=${params.id}&num=10`);
		const questions = await res.json();
		if (res.ok) {
			return {
				props: {
					questions: questions.findResult
				}
			};
		}
	}
</script>

<script>
	import Question from '../../lib/components/Question.svelte';
	import { page } from '$app/stores';
	export const email = $page.url.pathname;

	function shuffle(array) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}
	export let questions;
	questions = shuffle(questions);
</script>

<div class="w-1/2 m-auto flex flex-col">
	<Question {questions} />
	<!-- {#each questions as question}
		<Question {question} />
	{/each} -->
</div>
