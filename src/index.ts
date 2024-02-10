import { Cookie, Elysia, t } from "elysia";
import { config } from "./config";
import swagger from "@elysiajs/swagger";
import { getPdf } from "./createPdf";

const app = new Elysia()
	.use(swagger({ path: "/docs" }))
	.get("/", () => ({ hello: "editBun👋" }))
	.get("/temp", async () => {
		const stream = await getPdf("https://shgrid.dev");
		const fileName = "testing";
		return new Response(stream, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="${fileName}"`,
			},
		});
		return stream;
		return Bun.file("output.pdf");
	})
	.post(
		"/html",
		({ body, headers, cookie }) => {
			const newHeaders: Record<string, unknown> = {};
			const newCookies: Record<string, Cookie["value"]> = {};
			if (body.headersToSet !== undefined) {
				for (const headerKey in body.headersToSet) {
					newHeaders[headerKey] = body.headersToSet[headerKey];
				}
			}
			if (body.headersToCopy !== undefined) {
				for (const headerKey of body.headersToCopy) {
					newHeaders[headerKey] = headers[headerKey];
				}
			}

			if (body.cookiesToSet !== undefined) {
				for (const cookieKey in body.cookiesToSet) {
					const cookieVal = body.cookiesToSet[cookieKey];
					if (cookieVal === undefined) continue;
					newCookies[cookieKey] = {
						name: cookieKey,
						path: "/",
						value: cookieVal,
					};
				}
			}
			if (body.cookiesToCopy !== undefined) {
				for (const cookieKey of body.cookiesToCopy) {
					const cookieVal = cookie[cookieKey];
					if (cookieVal === undefined) continue;
					newCookies[cookieKey] = cookieVal;
				}
			}
			return { newCookies, newHeaders };
			return { body };
		},
		{
			body: t.Object({
				html: t.String(),
				cookiesToCopy: t.Optional(t.Array(t.String())),
				cookiesToSet: t.Optional(t.Record(t.String(), t.String())),
				headersToCopy: t.Optional(t.Array(t.String())),
				headersToSet: t.Optional(t.Record(t.String(), t.String())),
			}),
		},
	)
	.listen(config.port);

console.log(`Listening on ${app.server!.url}`);
