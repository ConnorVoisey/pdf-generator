<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>From Url</h1>

<form action="/api/html" method="post">
	<fieldset>
		<label for="html">Html</label>
		<input type="text" id="html" name="html" />
	</fieldset>
	<fieldset>
		<label for="fileName">File Name</label>
		<input type="text" id="fileName" name="fileName" />
	</fieldset>
	<button>Generate</button>
</form>
