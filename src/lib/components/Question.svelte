<script>
	export let questions;
	import { options } from './stateOptions.js';
	import Option from './Option.svelte';
	import ProgressBar from './ProgressBar.svelte';

	let count = 1;
	let total = questions.length;
	let currentQuestion = questions[count - 1];
	let correct = 0;
	let incorrectAnswers = [];
	let answers = [];
	let incorrect = false;
	let record = Array(total).fill(0);
	let submittedAnswer = '';

	/* FILTERING options DATA BASED ON INPUT */
	let filteredOptions = [];
	// $: console.log(filteredOptions)

	const filterOptions = () => {
		let storageArr = [];
		if (inputValue) {
			options.forEach((option) => {
				if (option.toLowerCase().startsWith(inputValue.toLowerCase())) {
					storageArr = [...storageArr, makeMatchBold(option)];
				}
			});
		}
		filteredOptions = storageArr;
	};

	/* HANDLING THE INPUT */
	let searchInput; // use with bind:this to focus element
	let inputValue = '';

	$: if (!inputValue) {
		filteredOptions = [];
		hiLiteIndex = 0;
	}

	const clearInput = () => {
		inputValue = '';
		searchInput.focus();
	};

	const setInputVal = (optionName) => {
		inputValue = removeBold(optionName);
		filteredOptions = [];
		hiLiteIndex = null;
		document.querySelector('#option-input').focus();
	};

	const correctAnswer = () => {
		record[count - 1] = 2;
		answers.push({
			correct: true,
			question: currentQuestion
		});
		correct++;
		if (count === total) {
			count++;
		} else {
			currentQuestion = questions[count++];
		}
	};
	const incorrectAnswer = () => {
		incorrect = true;
		record[count - 1] = 1;
		answers.push({
			correct: false,
			question: currentQuestion
		});
		incorrectAnswers.push(currentQuestion);
	};

	const nextQuestion = () => {
		incorrect = false;
		if (count === total) {
			count++;
		} else {
			currentQuestion = questions[count++];
		}

		setTimeout(clearInput, 1);
	};

	const restart = () => {
		window.location.reload(true);
		// setTimeout(searchInput.focus, 1000);
	};

	const submitValue = () => {
		if (inputValue) {
			console.log(currentQuestion.blurred);
			submittedAnswer = inputValue;
			clearInput();
			if (submittedAnswer === currentQuestion.answer) {
				correctAnswer();
			} else {
				incorrectAnswer();
			}
		}
	};

	const makeMatchBold = (str) => {
		// replace part of (option name === inputValue) with strong tags
		let matched = str.substring(0, inputValue.length);
		let makeBold = `<strong>${matched}</strong>`;
		let boldedMatch = str.replace(matched, makeBold);
		return boldedMatch;
	};

	const removeBold = (str) => {
		//replace < and > all characters between
		return str.replace(/<(.)*?>/g, '');
		// return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
	};

	/* NAVIGATING OVER THE LIST OF OPTIONS W HIGHLIGHTING */
	let hiLiteIndex = null;
	//$: console.log(hiLiteIndex);
	$: hiLitedOption = filteredOptions[hiLiteIndex];

	const navigateList = (e) => {
		if (count <= total) {
			searchInput.focus();
		}

		if (count > total && e.key === 'r') {
			restart();
			// window.location.reload(true);
		} else if (incorrect === true && e.key.length === 1) {
			nextQuestion();
		} else if (e.key === 'ArrowDown' && hiLiteIndex <= filteredOptions.length - 1) {
			hiLiteIndex === null || hiLiteIndex === filteredOptions.length - 1
				? (hiLiteIndex = 0)
				: (hiLiteIndex += 1);
		} else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
			hiLiteIndex === 0 ? (hiLiteIndex = filteredOptions.length - 1) : (hiLiteIndex -= 1);
		} else if (e.key === 'Enter') {
			if (inputValue.length > 0) {
				setInputVal(filteredOptions[hiLiteIndex]);
			}
		} else {
			return;
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<div
	id="question-holder"
	class="relative bg-dusty-rose gap-4 p-4 shadow-md m-4 rounded-md flex flex-col justify-center"
>
	<ProgressBar {record} />
	<p class="absolute bottom-0 left-0 p-2 rounded-tr-md rounded-bl-md bg-slate-100">
		{Math.min(count, total)} / {total}
	</p>
	{#if count <= total}
		<img class="max-h-96 w-auto" src={currentQuestion.blurred} alt="license plate" />
		<div class="relative flex justify-center">
			<form autocomplete="off" on:submit|preventDefault={submitValue}>
				<div class="autocomplete">
					<input
						id="option-input"
						type="text"
						placeholder="Search Options"
						bind:this={searchInput}
						bind:value={inputValue}
						on:input={filterOptions}
					/>
				</div>

				<input class="bg-perriwinkle" type="submit" />

				<!-- FILTERED LIST OF OPTIONS -->
				{#if filteredOptions.length > 0}
					<ul id="autocomplete-items-list">
						{#each filteredOptions as option, i}
							<Option
								itemLabel={option}
								highlighted={i === hiLiteIndex}
								on:click={() => setInputVal(option)}
							/>
						{/each}
					</ul>
				{/if}
			</form>
		</div>
		{#if incorrect === true}
			<div>
				<p>
					Your answer: {submittedAnswer}<br />
					Correct answer: {currentQuestion.answer}.<br />
					Press any key to continue.
				</p>
				<img src={currentQuestion.clear} alt="Unblurred license plate" />
			</div>
		{/if}
	{:else}
		<div class="my-8 flex flex-col justify-center items-center gap-2">
			<p>Your got {correct} out of {total} correct</p>
			<a
				class="bg-perriwinkle p-2 rounded-sm"
				href="#"
				on:click={() => {
					restart();
				}}>Restart</a
			>
			{#if incorrectAnswers.length > 0}
				<p>Review:</p>
				{#each answers as answer}
					{#if answer.correct === true}
						<div class="grid grid-cols-2 p-4 bg-green-300">
							<img
								class="justify-self-stretch"
								src={answer.question.blurred}
								alt="Blurred license plate"
							/>
							<img
								class="justify-self-stretch"
								src={answer.question.clear}
								alt="Unblurred license plate"
							/>
						</div>
					{:else}
						<div class="grid grid-cols-2 p-4 bg-red-300">
							<img
								class="justify-self-stretch"
								src={answer.question.blurred}
								alt="Blurred license plate"
							/>
							<img
								class="justify-self-stretch"
								src={answer.question.clear}
								alt="Unblurred license plate"
							/>
						</div>
					{/if}
				{/each}
				<!-- {#each incorrectAnswers as question}
					<div class="grid grid-cols-2 gap-4">
						<img class="justify-self-stretch" src={question.blurred} alt="Blurred license plate" />
						<img class="justify-self-stretch" src={question.clear} alt="Unblurred license plate" />
					</div>
				{/each} -->
			{/if}
		</div>
	{/if}
</div>

<style>
	div.autocomplete {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
		width: 300px;
	}
	input {
		border: 1px solid transparent;
		/* background-color: #f1f1f1; */
		padding: 10px;
		font-size: 16px;
		margin: 0;
	}
	input[type='text'] {
		background-color: #f1f1f1;
		width: 100%;
	}
	input[type='submit'] {
		/* background-color: DodgerBlue; */
		color: #fff;
	}

	#autocomplete-items-list {
		position: absolute;
		margin: 0;
		padding: 0;
		top: 2.9rem;
		width: 297px;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
