<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/quiz?num=3');
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
	export let questions;
</script>

<div class="grid grid-cols-[1fr_1fr_5fr_5fr] mx-auto w-1/2">
	{#each questions as question, i}
		<p>
			{i + 1}
		</p>
		<p class="">{question.answer}</p>
		<img class="h-24" src={question.blurred} alt="blurred license plate" />
		<img class="h-24" src={question.clear} alt="blurred license plate" />
	{/each}
</div>
