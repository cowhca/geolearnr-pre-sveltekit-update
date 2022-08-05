<script>
	export let itemLabel;
	export let highlighted;
</script>

<li class="autocomplete-items" class:autocomplete-active={highlighted} on:click>
	{@html itemLabel}
</li>

<style>
	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		/*position the autocomplete items to be the same width as the container:*/
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
	}

	li.autocomplete-items:hover {
		/*when hovering an item:*/
		background-color: #b6c199;
		color: white;
	}

	.autocomplete-active {
		/*when navigating through the items using the arrow keys:*/
		background-color: #7d94b5 !important;
		color: #ffffff;
	}
</style>
