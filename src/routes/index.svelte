<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/quizzes');
		const data = await res.json();
		return {
			props: {
				data: data.findResult
			}
		};
	}
</script>

<script>
	import Card from '$lib/components/Card.svelte';
	export let data;
</script>

<h2 class="text-center">Study the meta of Geoguessr</h2>
<div class="flex flex-wrap mx-auto m-6 p-4 w-11/12 justify-evenly bg-dusty-rose">
	{#each data as quiz}
		<Card {quiz} />
	{/each}
</div>
