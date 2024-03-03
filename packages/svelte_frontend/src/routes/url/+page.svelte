<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>From Url</h1>

<form action="/api/url" method="post">
	<fieldset>
		<label for="url">Url</label>
		<input type="text" id="url" name="url" />
	</fieldset>
	<fieldset>
		<label for="fileName">File name</label>
		<input type="text" id="fileName" name="fileName" />
	</fieldset>
	<button>Generate</button>
</form>
