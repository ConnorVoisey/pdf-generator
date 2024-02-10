const port = parseInt(Bun.env.PORT ?? "3000");
export const config: { port: number } = {
	port,
};
