import { Cookie, Elysia, t } from "elysia";
import { config } from "./config";
import swagger from "@elysiajs/swagger";
import { getPdf } from "./pdf";

const convertStreamToFileResponse = (
    fileName: string,
    stream: ReadableStream,
) => {
    return new Response(stream, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${fileName}"`,
        },
    });
};
export const parseHeadersAndCookiesToSet = ({
    headersToSet,
    headersToCopy,
    cookiesToSet,
    cookiesToCopy,
    requestHeaders,
    requestCookies,
}: {
    headersToSet?: Record<string, string>;
    headersToCopy?: string[];
    cookiesToSet?: Record<string, string>;
    cookiesToCopy?: string[];
    requestHeaders: Record<string, string | undefined>;
    requestCookies: Record<string, Cookie>;
}) => {
    const headers: Record<string, unknown> = {};
    const cookies: Record<string, string> = {};
    if (headersToSet !== undefined) {
        for (const headerKey in headersToSet) {
            headers[headerKey] = headersToSet[headerKey];
        }
    }
    if (headersToCopy !== undefined) {
        for (const headerKey of headersToCopy) {
            headers[headerKey] = requestHeaders[headerKey];
        }
    }

    if (cookiesToSet !== undefined) {
        for (const cookieKey in cookiesToSet) {
            const cookieVal = cookiesToSet[cookieKey];
            if (cookieVal === undefined) continue;
            cookies[cookieKey] = cookieVal;
        }
    }
    if (cookiesToCopy !== undefined) {
        for (const cookieKey of cookiesToCopy) {
            const cookieVal = requestCookies[cookieKey];
            if (cookieVal === undefined) continue;
            cookies[cookieKey] = cookieVal.value as string;
        }
    }
    return { headers, cookies };
};

export const app = new Elysia()
    .use(swagger({ path: "/docs" }))
    .get("/", () => ({ hello: "editBun👋" }))
    .get("/temp", async () => {
        const stream = await getPdf({
            url: "https://shgrid.dev",
            headers: {},
            cookies: {},
        });
        const fileName = "testing.pdf";
        return convertStreamToFileResponse(fileName, stream);
    })
    .post(
        "/url",
        async ({
            body: {
                headersToSet,
                url,
                headersToCopy,
                cookiesToSet,
                cookiesToCopy,
                fileName,
            },
            headers,
            cookie,
        }) => {
            const val = parseHeadersAndCookiesToSet({
                headersToSet,
                headersToCopy,
                cookiesToSet,
                cookiesToCopy,
                requestHeaders: headers,
                requestCookies: cookie,
            });
            const stream = await getPdf({
                url,
                cookies: val.cookies,
                headers: {},
            });
            return convertStreamToFileResponse(fileName, stream);
        },
        {
            body: t.Object({
                url: t.String(),
                fileName: t.String(),
                cookiesToCopy: t.Optional(t.Array(t.String())),
                cookiesToSet: t.Optional(t.Record(t.String(), t.String())),
                headersToCopy: t.Optional(t.Array(t.String())),
                headersToSet: t.Optional(t.Record(t.String(), t.String())),
            }),
        },
    );

app.listen(config.port);
console.log(`Listening on ${app.server?.url}`);
