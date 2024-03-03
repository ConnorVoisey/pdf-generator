const port = parseInt(Bun.env.PORT ?? "8000");
const temporaryPagesTimeoutMs = parseInt(
	Bun.env.TEMPORARY_PAGES_TIMEOUT_MS ?? "10_000",
);
const apiUrl = Bun.env.API_URL;
if (apiUrl === undefined) throw new Error("env var: `API_URL` must be set");
export const config = {
	port,
	temporaryPagesTimeoutMs,
	apiUrl,
};
