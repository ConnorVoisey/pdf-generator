<script lang="ts">
	// import '@picocss/pico/css/pico.css';
	import '$lib/styles/main.scss';
</script>

<div class="container">
	<nav>
		<ul><li><a href="/">Home</a></li></ul>
		<ul>
			<li><a href="/template">From Template</a></li>
			<li><a href="/url">From Url</a></li>
			<li><a href="/html">From Html</a></li>
			<li><a href="/api/docs">Api Docs</a></li>
		</ul>
	</nav>

	<slot />
</div>
