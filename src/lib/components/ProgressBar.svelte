<script>
	export let record;
</script>

<div
	style="grid-template-columns: repeat(10, 1rem);"
	class="p-2 bg-white rounded-bl-md fixed top-0 right-0 justify-center m-auto grid gap-y-1 gap-x-1"
>
	{#each record as question}
		{#if question === 0}
			<div class="w-4 h-4 bg-gray-300" />
		{/if}
		{#if question === 1}
			<div class="w-4 h-4 bg-red-400" />
		{/if}
		{#if question === 2}
			<div class="w-4 h-4 bg-green-400" />
		{/if}
	{/each}
</div>
