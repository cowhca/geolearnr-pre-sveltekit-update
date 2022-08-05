<script>
	export let quiz;
</script>

<a href={'/quiz/' + quiz.link}>
	<div class="w-60 lg:w-96 p-8 rounded-md hover:bg-muted-green">
		<img class="w-auto h-auto rounded-lg m-auto" src={quiz.img} alt="Quiz" />
		<p class="text-center mt-2 text-xl">{quiz.name}</p>
	</div>
</a>
