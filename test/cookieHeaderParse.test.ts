import { describe, expect, it } from "bun:test";
import { edenFetch } from "@elysiajs/eden";
import { app, parseHeadersAndCookiesToSet } from "../src";
import { Cookie } from "elysia";

describe("Elysia", () => {
    it("check headers and cookies are parsed correctly", async () => {
        const res = parseHeadersAndCookiesToSet({
            requestCookies: {
                cookie_copy: {
                    name: "cookie_copy",
                    value: "cookie copy value",
                    path: "/",
                    domain: "",
                } as unknown as Cookie<unknown>,
            },
            requestHeaders: { copy: "request_copy" },
            headersToCopy: ["copy"],
            headersToSet: { auth: "bearer testing", copy: "should_be_ignored" },
            cookiesToCopy: ["cookie_copy"],
            cookiesToSet: {
                cookie_copy: "should_be_ignored_cookie",
                auth_cookie: "b38774;sn84s4sggrdhrdhr;rdhdrhdrhdr9drn",
            },
        });
        expect(res).toStrictEqual({
            headers: {
                auth: "bearer testing",
                copy: "request_copy",
            },
            cookies: {
                cookie_copy: "cookie copy value",
                auth_cookie: "b38774;sn84s4sggrdhrdhr;rdhdrhdrhdr9drn",
            },
        });
    });
});
// describe("Elysia", () => {
// 	it("return a response", async () => {
//         app.listen(3000);
// 		const fetch = edenFetch<typeof app>("http://localhost:3000");
// 		const res = await fetch("/url", {
// 			method: "POST",
// 			body: {
// 				url: "https://shgrid.dev",
// 				fileName: "example.pdf",
// 			},
// 		});
//
// 		expect(res.error).toBe(null);
// 	});
// });
