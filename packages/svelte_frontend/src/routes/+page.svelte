<script lang="ts">
	import { downloadFromUrl } from '$lib/client/download';
	let isLoadingPdf = false;
	const getPdf = async () => {
		isLoadingPdf = true;
		try {
			const blob = await fetch('/api/temp').then((res) => res.blob());
			const fileUrl = window.URL.createObjectURL(blob);
			downloadFromUrl(fileUrl, 'output.pdf');
		} catch (e) {
			console.error(e);
		}
		isLoadingPdf = false;
	};
</script>

<h1>Pdf Generator</h1>
<p>Generate some pdfs</p>
<button on:click={getPdf} aria-busy={isLoadingPdf} disabled={isLoadingPdf}>Get Pdf</button>
