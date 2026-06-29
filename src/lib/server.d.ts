import { Elysia } from "elysia";
export declare const app: Elysia<
  "",
  {
    decorator: Record<string, unknown> & {
      publicPermissions: {
        readonly code: import("./lib/permissions").PermissionCode;
        description: string;
        requiresAdmin?: boolean;
      }[];
    };
    store: {
      [x: string]: unknown;
      logger: import("logixlysia").Logger;
      pino: import("logixlysia").Pino;
      beforeTime?: bigint | undefined;
      cron: Record<"check_pocket_cron", import("croner").Cron>;
    };
    derive: Record<string, unknown>;
    resolve: Record<string, unknown>;
  },
  {
    typebox: {};
    error: {};
  } & {
    typebox: {};
    error: {};
  } & {
    typebox: {};
    error: {};
  } & {
    typebox: {};
    error: {};
  },
  {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
  } & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
  } & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
  } & {
    schema: {};
    standaloneSchema: {};
    macro: Partial<{
      readonly auth: boolean;
      readonly userKind: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION";
      readonly permission:
        | "BACK_OFFICE_ADMIN"
        | "USER_CREATE_OWN"
        | "USER_CREATE_ADMIN"
        | "USER_CREATE_BACKOFFICE"
        | "USER_SELECT_OWN"
        | "USER_SELECT_ADMIN"
        | "USER_SELECT_BACKOFFICE"
        | "PERMISSION_ADD"
        | "PERMISSION_GROUP_ALL"
        | "INVENTORY_ITEM_SELECT_OWN"
        | "INVENTORY_ITEM_SELECT_ADMIN"
        | "INVENTORY_ITEM_CREATE_OWN"
        | "INVENTORY_ITEM_CREATE_ADMIN"
        | "INVENTORY_ITEM_UPDATE_OWN"
        | "INVENTORY_ITEM_UPDATE_ADMIN"
        | "INVENTORY_ITEM_DELETE_OWN"
        | "INVENTORY_ITEM_DELETE_ADMIN"
        | "INVENTORY_LOG_SELECT_OWN"
        | "INVENTORY_LOG_SELECT_ADMIN"
        | "INVENTORY_REFUND_SELECT_OWN"
        | "INVENTORY_REFUND_SELECT_ADMIN"
        | "INVENTORY_REFUND_CREATE_OWN"
        | "INVENTORY_REFUND_APPROVE_ADMIN"
        | "MERCHANT_MERCHANT_CREATE"
        | "MERCHANT_MERCHANT_UPDATE_OWN"
        | "MERCHANT_MERCHANT_UPDATE_ADMIN"
        | "MERCHANT_BRANCH_SELECT_OWN"
        | "MERCHANT_BRANCH_SELECT_ADMIN"
        | "MERCHANT_BRANCH_CREATE"
        | (
            | "BACK_OFFICE_ADMIN"
            | "USER_CREATE_OWN"
            | "USER_CREATE_ADMIN"
            | "USER_CREATE_BACKOFFICE"
            | "USER_SELECT_OWN"
            | "USER_SELECT_ADMIN"
            | "USER_SELECT_BACKOFFICE"
            | "PERMISSION_ADD"
            | "PERMISSION_GROUP_ALL"
            | "INVENTORY_ITEM_SELECT_OWN"
            | "INVENTORY_ITEM_SELECT_ADMIN"
            | "INVENTORY_ITEM_CREATE_OWN"
            | "INVENTORY_ITEM_CREATE_ADMIN"
            | "INVENTORY_ITEM_UPDATE_OWN"
            | "INVENTORY_ITEM_UPDATE_ADMIN"
            | "INVENTORY_ITEM_DELETE_OWN"
            | "INVENTORY_ITEM_DELETE_ADMIN"
            | "INVENTORY_LOG_SELECT_OWN"
            | "INVENTORY_LOG_SELECT_ADMIN"
            | "INVENTORY_REFUND_SELECT_OWN"
            | "INVENTORY_REFUND_SELECT_ADMIN"
            | "INVENTORY_REFUND_CREATE_OWN"
            | "INVENTORY_REFUND_APPROVE_ADMIN"
            | "MERCHANT_MERCHANT_CREATE"
            | "MERCHANT_MERCHANT_UPDATE_OWN"
            | "MERCHANT_MERCHANT_UPDATE_ADMIN"
            | "MERCHANT_BRANCH_SELECT_OWN"
            | "MERCHANT_BRANCH_SELECT_ADMIN"
            | "MERCHANT_BRANCH_CREATE"
          )[];
    }>;
    macroFn: {
      readonly auth: {
        readonly resolve: ({
          request: { headers },
        }: {
          body: unknown;
          query: Record<string, string>;
          params: {};
          headers: Record<string, string | undefined>;
          cookie: Record<string, import("elysia").Cookie<unknown>>;
          server: import("elysia/dist/universal/server").Server | null;
          redirect: import("elysia").redirect;
          set: {
            headers: import("elysia").HTTPHeaders;
            status?: number | keyof import("elysia").StatusMap;
            redirect?: string;
            cookie?: Record<string, import("elysia/dist/cookies").ElysiaCookie>;
          };
          path: string;
          route: string;
          request: Request;
          store: {};
          status: <
            const Code extends number | keyof import("elysia").StatusMap,
            const T = Code extends
              | 200
              | 401
              | 404
              | 402
              | 400
              | 100
              | 101
              | 102
              | 103
              | 201
              | 202
              | 203
              | 204
              | 205
              | 206
              | 207
              | 208
              | 300
              | 301
              | 302
              | 303
              | 304
              | 307
              | 308
              | 403
              | 405
              | 406
              | 407
              | 408
              | 409
              | 410
              | 411
              | 412
              | 413
              | 414
              | 415
              | 416
              | 417
              | 418
              | 420
              | 421
              | 422
              | 423
              | 424
              | 425
              | 426
              | 428
              | 429
              | 431
              | 451
              | 500
              | 501
              | 502
              | 503
              | 504
              | 505
              | 506
              | 507
              | 508
              | 510
              | 511
              ? {
                  readonly 100: "Continue";
                  readonly 101: "Switching Protocols";
                  readonly 102: "Processing";
                  readonly 103: "Early Hints";
                  readonly 200: "OK";
                  readonly 201: "Created";
                  readonly 202: "Accepted";
                  readonly 203: "Non-Authoritative Information";
                  readonly 204: "No Content";
                  readonly 205: "Reset Content";
                  readonly 206: "Partial Content";
                  readonly 207: "Multi-Status";
                  readonly 208: "Already Reported";
                  readonly 300: "Multiple Choices";
                  readonly 301: "Moved Permanently";
                  readonly 302: "Found";
                  readonly 303: "See Other";
                  readonly 304: "Not Modified";
                  readonly 307: "Temporary Redirect";
                  readonly 308: "Permanent Redirect";
                  readonly 400: "Bad Request";
                  readonly 401: "Unauthorized";
                  readonly 402: "Payment Required";
                  readonly 403: "Forbidden";
                  readonly 404: "Not Found";
                  readonly 405: "Method Not Allowed";
                  readonly 406: "Not Acceptable";
                  readonly 407: "Proxy Authentication Required";
                  readonly 408: "Request Timeout";
                  readonly 409: "Conflict";
                  readonly 410: "Gone";
                  readonly 411: "Length Required";
                  readonly 412: "Precondition Failed";
                  readonly 413: "Payload Too Large";
                  readonly 414: "URI Too Long";
                  readonly 415: "Unsupported Media Type";
                  readonly 416: "Range Not Satisfiable";
                  readonly 417: "Expectation Failed";
                  readonly 418: "I'm a teapot";
                  readonly 420: "Enhance Your Calm";
                  readonly 421: "Misdirected Request";
                  readonly 422: "Unprocessable Content";
                  readonly 423: "Locked";
                  readonly 424: "Failed Dependency";
                  readonly 425: "Too Early";
                  readonly 426: "Upgrade Required";
                  readonly 428: "Precondition Required";
                  readonly 429: "Too Many Requests";
                  readonly 431: "Request Header Fields Too Large";
                  readonly 451: "Unavailable For Legal Reasons";
                  readonly 500: "Internal Server Error";
                  readonly 501: "Not Implemented";
                  readonly 502: "Bad Gateway";
                  readonly 503: "Service Unavailable";
                  readonly 504: "Gateway Timeout";
                  readonly 505: "HTTP Version Not Supported";
                  readonly 506: "Variant Also Negotiates";
                  readonly 507: "Insufficient Storage";
                  readonly 508: "Loop Detected";
                  readonly 510: "Not Extended";
                  readonly 511: "Network Authentication Required";
                }[Code]
              : Code,
          >(
            code: Code,
            response?: T
          ) => import("elysia").ElysiaCustomStatusResponse<
            Code,
            T,
            Code extends
              | "Continue"
              | "Switching Protocols"
              | "Processing"
              | "Early Hints"
              | "OK"
              | "Created"
              | "Accepted"
              | "Non-Authoritative Information"
              | "No Content"
              | "Reset Content"
              | "Partial Content"
              | "Multi-Status"
              | "Already Reported"
              | "Multiple Choices"
              | "Moved Permanently"
              | "Found"
              | "See Other"
              | "Not Modified"
              | "Temporary Redirect"
              | "Permanent Redirect"
              | "Bad Request"
              | "Unauthorized"
              | "Payment Required"
              | "Forbidden"
              | "Not Found"
              | "Method Not Allowed"
              | "Not Acceptable"
              | "Proxy Authentication Required"
              | "Request Timeout"
              | "Conflict"
              | "Gone"
              | "Length Required"
              | "Precondition Failed"
              | "Payload Too Large"
              | "URI Too Long"
              | "Unsupported Media Type"
              | "Range Not Satisfiable"
              | "Expectation Failed"
              | "I'm a teapot"
              | "Enhance Your Calm"
              | "Misdirected Request"
              | "Unprocessable Content"
              | "Locked"
              | "Failed Dependency"
              | "Too Early"
              | "Upgrade Required"
              | "Precondition Required"
              | "Too Many Requests"
              | "Request Header Fields Too Large"
              | "Unavailable For Legal Reasons"
              | "Internal Server Error"
              | "Not Implemented"
              | "Bad Gateway"
              | "Service Unavailable"
              | "Gateway Timeout"
              | "HTTP Version Not Supported"
              | "Variant Also Negotiates"
              | "Insufficient Storage"
              | "Loop Detected"
              | "Not Extended"
              | "Network Authentication Required"
              ? {
                  readonly Continue: 100;
                  readonly "Switching Protocols": 101;
                  readonly Processing: 102;
                  readonly "Early Hints": 103;
                  readonly OK: 200;
                  readonly Created: 201;
                  readonly Accepted: 202;
                  readonly "Non-Authoritative Information": 203;
                  readonly "No Content": 204;
                  readonly "Reset Content": 205;
                  readonly "Partial Content": 206;
                  readonly "Multi-Status": 207;
                  readonly "Already Reported": 208;
                  readonly "Multiple Choices": 300;
                  readonly "Moved Permanently": 301;
                  readonly Found: 302;
                  readonly "See Other": 303;
                  readonly "Not Modified": 304;
                  readonly "Temporary Redirect": 307;
                  readonly "Permanent Redirect": 308;
                  readonly "Bad Request": 400;
                  readonly Unauthorized: 401;
                  readonly "Payment Required": 402;
                  readonly Forbidden: 403;
                  readonly "Not Found": 404;
                  readonly "Method Not Allowed": 405;
                  readonly "Not Acceptable": 406;
                  readonly "Proxy Authentication Required": 407;
                  readonly "Request Timeout": 408;
                  readonly Conflict: 409;
                  readonly Gone: 410;
                  readonly "Length Required": 411;
                  readonly "Precondition Failed": 412;
                  readonly "Payload Too Large": 413;
                  readonly "URI Too Long": 414;
                  readonly "Unsupported Media Type": 415;
                  readonly "Range Not Satisfiable": 416;
                  readonly "Expectation Failed": 417;
                  readonly "I'm a teapot": 418;
                  readonly "Enhance Your Calm": 420;
                  readonly "Misdirected Request": 421;
                  readonly "Unprocessable Content": 422;
                  readonly Locked: 423;
                  readonly "Failed Dependency": 424;
                  readonly "Too Early": 425;
                  readonly "Upgrade Required": 426;
                  readonly "Precondition Required": 428;
                  readonly "Too Many Requests": 429;
                  readonly "Request Header Fields Too Large": 431;
                  readonly "Unavailable For Legal Reasons": 451;
                  readonly "Internal Server Error": 500;
                  readonly "Not Implemented": 501;
                  readonly "Bad Gateway": 502;
                  readonly "Service Unavailable": 503;
                  readonly "Gateway Timeout": 504;
                  readonly "HTTP Version Not Supported": 505;
                  readonly "Variant Also Negotiates": 506;
                  readonly "Insufficient Storage": 507;
                  readonly "Loop Detected": 508;
                  readonly "Not Extended": 510;
                  readonly "Network Authentication Required": 511;
                }[Code]
              : Code
          >;
        }) => Promise<
          | import("elysia").ElysiaCustomStatusResponse<"Unauthorized", "Токен олдсонгүй", 401>
          | import("elysia").ElysiaCustomStatusResponse<
              "Not Found",
              "Байгууллагын мэдээлэл олдсонгүй.",
              404
            >
          | import("elysia").ElysiaCustomStatusResponse<
              "Not Found",
              "Салбарын мэдээлэл олдсонгүй.",
              404
            >
          | import("elysia").ElysiaCustomStatusResponse<
              "Payment Required",
              "Системийн төлбөр хийгдээгүй байна. 88046194",
              402
            >
          | {
              user: import("./lib/auth").User;
              session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
                impersonatedBy?: string | null | undefined;
              };
            }
        >;
      };
      readonly userKind: (input: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION") => {
        readonly resolve: ({
          request: { headers },
        }: {
          body: unknown;
          query: Record<string, string>;
          params: {};
          headers: Record<string, string | undefined>;
          cookie: Record<string, import("elysia").Cookie<unknown>>;
          server: import("elysia/dist/universal/server").Server | null;
          redirect: import("elysia").redirect;
          set: {
            headers: import("elysia").HTTPHeaders;
            status?: number | keyof import("elysia").StatusMap;
            redirect?: string;
            cookie?: Record<string, import("elysia/dist/cookies").ElysiaCookie>;
          };
          path: string;
          route: string;
          request: Request;
          store: {};
          status: <
            const Code extends number | keyof import("elysia").StatusMap,
            const T = Code extends
              | 200
              | 401
              | 404
              | 402
              | 400
              | 100
              | 101
              | 102
              | 103
              | 201
              | 202
              | 203
              | 204
              | 205
              | 206
              | 207
              | 208
              | 300
              | 301
              | 302
              | 303
              | 304
              | 307
              | 308
              | 403
              | 405
              | 406
              | 407
              | 408
              | 409
              | 410
              | 411
              | 412
              | 413
              | 414
              | 415
              | 416
              | 417
              | 418
              | 420
              | 421
              | 422
              | 423
              | 424
              | 425
              | 426
              | 428
              | 429
              | 431
              | 451
              | 500
              | 501
              | 502
              | 503
              | 504
              | 505
              | 506
              | 507
              | 508
              | 510
              | 511
              ? {
                  readonly 100: "Continue";
                  readonly 101: "Switching Protocols";
                  readonly 102: "Processing";
                  readonly 103: "Early Hints";
                  readonly 200: "OK";
                  readonly 201: "Created";
                  readonly 202: "Accepted";
                  readonly 203: "Non-Authoritative Information";
                  readonly 204: "No Content";
                  readonly 205: "Reset Content";
                  readonly 206: "Partial Content";
                  readonly 207: "Multi-Status";
                  readonly 208: "Already Reported";
                  readonly 300: "Multiple Choices";
                  readonly 301: "Moved Permanently";
                  readonly 302: "Found";
                  readonly 303: "See Other";
                  readonly 304: "Not Modified";
                  readonly 307: "Temporary Redirect";
                  readonly 308: "Permanent Redirect";
                  readonly 400: "Bad Request";
                  readonly 401: "Unauthorized";
                  readonly 402: "Payment Required";
                  readonly 403: "Forbidden";
                  readonly 404: "Not Found";
                  readonly 405: "Method Not Allowed";
                  readonly 406: "Not Acceptable";
                  readonly 407: "Proxy Authentication Required";
                  readonly 408: "Request Timeout";
                  readonly 409: "Conflict";
                  readonly 410: "Gone";
                  readonly 411: "Length Required";
                  readonly 412: "Precondition Failed";
                  readonly 413: "Payload Too Large";
                  readonly 414: "URI Too Long";
                  readonly 415: "Unsupported Media Type";
                  readonly 416: "Range Not Satisfiable";
                  readonly 417: "Expectation Failed";
                  readonly 418: "I'm a teapot";
                  readonly 420: "Enhance Your Calm";
                  readonly 421: "Misdirected Request";
                  readonly 422: "Unprocessable Content";
                  readonly 423: "Locked";
                  readonly 424: "Failed Dependency";
                  readonly 425: "Too Early";
                  readonly 426: "Upgrade Required";
                  readonly 428: "Precondition Required";
                  readonly 429: "Too Many Requests";
                  readonly 431: "Request Header Fields Too Large";
                  readonly 451: "Unavailable For Legal Reasons";
                  readonly 500: "Internal Server Error";
                  readonly 501: "Not Implemented";
                  readonly 502: "Bad Gateway";
                  readonly 503: "Service Unavailable";
                  readonly 504: "Gateway Timeout";
                  readonly 505: "HTTP Version Not Supported";
                  readonly 506: "Variant Also Negotiates";
                  readonly 507: "Insufficient Storage";
                  readonly 508: "Loop Detected";
                  readonly 510: "Not Extended";
                  readonly 511: "Network Authentication Required";
                }[Code]
              : Code,
          >(
            code: Code,
            response?: T
          ) => import("elysia").ElysiaCustomStatusResponse<
            Code,
            T,
            Code extends
              | "Continue"
              | "Switching Protocols"
              | "Processing"
              | "Early Hints"
              | "OK"
              | "Created"
              | "Accepted"
              | "Non-Authoritative Information"
              | "No Content"
              | "Reset Content"
              | "Partial Content"
              | "Multi-Status"
              | "Already Reported"
              | "Multiple Choices"
              | "Moved Permanently"
              | "Found"
              | "See Other"
              | "Not Modified"
              | "Temporary Redirect"
              | "Permanent Redirect"
              | "Bad Request"
              | "Unauthorized"
              | "Payment Required"
              | "Forbidden"
              | "Not Found"
              | "Method Not Allowed"
              | "Not Acceptable"
              | "Proxy Authentication Required"
              | "Request Timeout"
              | "Conflict"
              | "Gone"
              | "Length Required"
              | "Precondition Failed"
              | "Payload Too Large"
              | "URI Too Long"
              | "Unsupported Media Type"
              | "Range Not Satisfiable"
              | "Expectation Failed"
              | "I'm a teapot"
              | "Enhance Your Calm"
              | "Misdirected Request"
              | "Unprocessable Content"
              | "Locked"
              | "Failed Dependency"
              | "Too Early"
              | "Upgrade Required"
              | "Precondition Required"
              | "Too Many Requests"
              | "Request Header Fields Too Large"
              | "Unavailable For Legal Reasons"
              | "Internal Server Error"
              | "Not Implemented"
              | "Bad Gateway"
              | "Service Unavailable"
              | "Gateway Timeout"
              | "HTTP Version Not Supported"
              | "Variant Also Negotiates"
              | "Insufficient Storage"
              | "Loop Detected"
              | "Not Extended"
              | "Network Authentication Required"
              ? {
                  readonly Continue: 100;
                  readonly "Switching Protocols": 101;
                  readonly Processing: 102;
                  readonly "Early Hints": 103;
                  readonly OK: 200;
                  readonly Created: 201;
                  readonly Accepted: 202;
                  readonly "Non-Authoritative Information": 203;
                  readonly "No Content": 204;
                  readonly "Reset Content": 205;
                  readonly "Partial Content": 206;
                  readonly "Multi-Status": 207;
                  readonly "Already Reported": 208;
                  readonly "Multiple Choices": 300;
                  readonly "Moved Permanently": 301;
                  readonly Found: 302;
                  readonly "See Other": 303;
                  readonly "Not Modified": 304;
                  readonly "Temporary Redirect": 307;
                  readonly "Permanent Redirect": 308;
                  readonly "Bad Request": 400;
                  readonly Unauthorized: 401;
                  readonly "Payment Required": 402;
                  readonly Forbidden: 403;
                  readonly "Not Found": 404;
                  readonly "Method Not Allowed": 405;
                  readonly "Not Acceptable": 406;
                  readonly "Proxy Authentication Required": 407;
                  readonly "Request Timeout": 408;
                  readonly Conflict: 409;
                  readonly Gone: 410;
                  readonly "Length Required": 411;
                  readonly "Precondition Failed": 412;
                  readonly "Payload Too Large": 413;
                  readonly "URI Too Long": 414;
                  readonly "Unsupported Media Type": 415;
                  readonly "Range Not Satisfiable": 416;
                  readonly "Expectation Failed": 417;
                  readonly "I'm a teapot": 418;
                  readonly "Enhance Your Calm": 420;
                  readonly "Misdirected Request": 421;
                  readonly "Unprocessable Content": 422;
                  readonly Locked: 423;
                  readonly "Failed Dependency": 424;
                  readonly "Too Early": 425;
                  readonly "Upgrade Required": 426;
                  readonly "Precondition Required": 428;
                  readonly "Too Many Requests": 429;
                  readonly "Request Header Fields Too Large": 431;
                  readonly "Unavailable For Legal Reasons": 451;
                  readonly "Internal Server Error": 500;
                  readonly "Not Implemented": 501;
                  readonly "Bad Gateway": 502;
                  readonly "Service Unavailable": 503;
                  readonly "Gateway Timeout": 504;
                  readonly "HTTP Version Not Supported": 505;
                  readonly "Variant Also Negotiates": 506;
                  readonly "Insufficient Storage": 507;
                  readonly "Loop Detected": 508;
                  readonly "Not Extended": 510;
                  readonly "Network Authentication Required": 511;
                }[Code]
              : Code
          >;
        }) => Promise<
          | import("elysia").ElysiaCustomStatusResponse<"Unauthorized", "Токен олдсонгүй", 401>
          | import("elysia").ElysiaCustomStatusResponse<
              "Not Found",
              "Байгууллагын мэдээлэл олдсонгүй.",
              404
            >
          | import("elysia").ElysiaCustomStatusResponse<
              "Not Found",
              "Салбарын мэдээлэл олдсонгүй.",
              404
            >
          | import("elysia").ElysiaCustomStatusResponse<
              "Payment Required",
              "Системийн төлбөр хийгдээгүй байна. 88046194",
              402
            >
          | import("elysia").ElysiaCustomStatusResponse<"Forbidden", "Хандах эрхгүй байна.", 403>
          | {
              user: import("./lib/auth").User;
              session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
                impersonatedBy?: string | null | undefined;
              };
            }
        >;
      };
      readonly permission: (
        input:
          | import("./lib/permissions").PermissionCode
          | import("./lib/permissions").PermissionCode[]
      ) => {
        readonly resolve: ({
          request: { headers },
        }: {
          body: unknown;
          query: Record<string, string>;
          params: {};
          headers: Record<string, string | undefined>;
          cookie: Record<string, import("elysia").Cookie<unknown>>;
          server: import("elysia/dist/universal/server").Server | null;
          redirect: import("elysia").redirect;
          set: {
            headers: import("elysia").HTTPHeaders;
            status?: number | keyof import("elysia").StatusMap;
            redirect?: string;
            cookie?: Record<string, import("elysia/dist/cookies").ElysiaCookie>;
          };
          path: string;
          route: string;
          request: Request;
          store: {};
          status: <
            const Code extends number | keyof import("elysia").StatusMap,
            const T = Code extends
              | 200
              | 401
              | 404
              | 402
              | 400
              | 100
              | 101
              | 102
              | 103
              | 201
              | 202
              | 203
              | 204
              | 205
              | 206
              | 207
              | 208
              | 300
              | 301
              | 302
              | 303
              | 304
              | 307
              | 308
              | 403
              | 405
              | 406
              | 407
              | 408
              | 409
              | 410
              | 411
              | 412
              | 413
              | 414
              | 415
              | 416
              | 417
              | 418
              | 420
              | 421
              | 422
              | 423
              | 424
              | 425
              | 426
              | 428
              | 429
              | 431
              | 451
              | 500
              | 501
              | 502
              | 503
              | 504
              | 505
              | 506
              | 507
              | 508
              | 510
              | 511
              ? {
                  readonly 100: "Continue";
                  readonly 101: "Switching Protocols";
                  readonly 102: "Processing";
                  readonly 103: "Early Hints";
                  readonly 200: "OK";
                  readonly 201: "Created";
                  readonly 202: "Accepted";
                  readonly 203: "Non-Authoritative Information";
                  readonly 204: "No Content";
                  readonly 205: "Reset Content";
                  readonly 206: "Partial Content";
                  readonly 207: "Multi-Status";
                  readonly 208: "Already Reported";
                  readonly 300: "Multiple Choices";
                  readonly 301: "Moved Permanently";
                  readonly 302: "Found";
                  readonly 303: "See Other";
                  readonly 304: "Not Modified";
                  readonly 307: "Temporary Redirect";
                  readonly 308: "Permanent Redirect";
                  readonly 400: "Bad Request";
                  readonly 401: "Unauthorized";
                  readonly 402: "Payment Required";
                  readonly 403: "Forbidden";
                  readonly 404: "Not Found";
                  readonly 405: "Method Not Allowed";
                  readonly 406: "Not Acceptable";
                  readonly 407: "Proxy Authentication Required";
                  readonly 408: "Request Timeout";
                  readonly 409: "Conflict";
                  readonly 410: "Gone";
                  readonly 411: "Length Required";
                  readonly 412: "Precondition Failed";
                  readonly 413: "Payload Too Large";
                  readonly 414: "URI Too Long";
                  readonly 415: "Unsupported Media Type";
                  readonly 416: "Range Not Satisfiable";
                  readonly 417: "Expectation Failed";
                  readonly 418: "I'm a teapot";
                  readonly 420: "Enhance Your Calm";
                  readonly 421: "Misdirected Request";
                  readonly 422: "Unprocessable Content";
                  readonly 423: "Locked";
                  readonly 424: "Failed Dependency";
                  readonly 425: "Too Early";
                  readonly 426: "Upgrade Required";
                  readonly 428: "Precondition Required";
                  readonly 429: "Too Many Requests";
                  readonly 431: "Request Header Fields Too Large";
                  readonly 451: "Unavailable For Legal Reasons";
                  readonly 500: "Internal Server Error";
                  readonly 501: "Not Implemented";
                  readonly 502: "Bad Gateway";
                  readonly 503: "Service Unavailable";
                  readonly 504: "Gateway Timeout";
                  readonly 505: "HTTP Version Not Supported";
                  readonly 506: "Variant Also Negotiates";
                  readonly 507: "Insufficient Storage";
                  readonly 508: "Loop Detected";
                  readonly 510: "Not Extended";
                  readonly 511: "Network Authentication Required";
                }[Code]
              : Code,
          >(
            code: Code,
            response?: T
          ) => import("elysia").ElysiaCustomStatusResponse<
            Code,
            T,
            Code extends
              | "Continue"
              | "Switching Protocols"
              | "Processing"
              | "Early Hints"
              | "OK"
              | "Created"
              | "Accepted"
              | "Non-Authoritative Information"
              | "No Content"
              | "Reset Content"
              | "Partial Content"
              | "Multi-Status"
              | "Already Reported"
              | "Multiple Choices"
              | "Moved Permanently"
              | "Found"
              | "See Other"
              | "Not Modified"
              | "Temporary Redirect"
              | "Permanent Redirect"
              | "Bad Request"
              | "Unauthorized"
              | "Payment Required"
              | "Forbidden"
              | "Not Found"
              | "Method Not Allowed"
              | "Not Acceptable"
              | "Proxy Authentication Required"
              | "Request Timeout"
              | "Conflict"
              | "Gone"
              | "Length Required"
              | "Precondition Failed"
              | "Payload Too Large"
              | "URI Too Long"
              | "Unsupported Media Type"
              | "Range Not Satisfiable"
              | "Expectation Failed"
              | "I'm a teapot"
              | "Enhance Your Calm"
              | "Misdirected Request"
              | "Unprocessable Content"
              | "Locked"
              | "Failed Dependency"
              | "Too Early"
              | "Upgrade Required"
              | "Precondition Required"
              | "Too Many Requests"
              | "Request Header Fields Too Large"
              | "Unavailable For Legal Reasons"
              | "Internal Server Error"
              | "Not Implemented"
              | "Bad Gateway"
              | "Service Unavailable"
              | "Gateway Timeout"
              | "HTTP Version Not Supported"
              | "Variant Also Negotiates"
              | "Insufficient Storage"
              | "Loop Detected"
              | "Not Extended"
              | "Network Authentication Required"
              ? {
                  readonly Continue: 100;
                  readonly "Switching Protocols": 101;
                  readonly Processing: 102;
                  readonly "Early Hints": 103;
                  readonly OK: 200;
                  readonly Created: 201;
                  readonly Accepted: 202;
                  readonly "Non-Authoritative Information": 203;
                  readonly "No Content": 204;
                  readonly "Reset Content": 205;
                  readonly "Partial Content": 206;
                  readonly "Multi-Status": 207;
                  readonly "Already Reported": 208;
                  readonly "Multiple Choices": 300;
                  readonly "Moved Permanently": 301;
                  readonly Found: 302;
                  readonly "See Other": 303;
                  readonly "Not Modified": 304;
                  readonly "Temporary Redirect": 307;
                  readonly "Permanent Redirect": 308;
                  readonly "Bad Request": 400;
                  readonly Unauthorized: 401;
                  readonly "Payment Required": 402;
                  readonly Forbidden: 403;
                  readonly "Not Found": 404;
                  readonly "Method Not Allowed": 405;
                  readonly "Not Acceptable": 406;
                  readonly "Proxy Authentication Required": 407;
                  readonly "Request Timeout": 408;
                  readonly Conflict: 409;
                  readonly Gone: 410;
                  readonly "Length Required": 411;
                  readonly "Precondition Failed": 412;
                  readonly "Payload Too Large": 413;
                  readonly "URI Too Long": 414;
                  readonly "Unsupported Media Type": 415;
                  readonly "Range Not Satisfiable": 416;
                  readonly "Expectation Failed": 417;
                  readonly "I'm a teapot": 418;
                  readonly "Enhance Your Calm": 420;
                  readonly "Misdirected Request": 421;
                  readonly "Unprocessable Content": 422;
                  readonly Locked: 423;
                  readonly "Failed Dependency": 424;
                  readonly "Too Early": 425;
                  readonly "Upgrade Required": 426;
                  readonly "Precondition Required": 428;
                  readonly "Too Many Requests": 429;
                  readonly "Request Header Fields Too Large": 431;
                  readonly "Unavailable For Legal Reasons": 451;
                  readonly "Internal Server Error": 500;
                  readonly "Not Implemented": 501;
                  readonly "Bad Gateway": 502;
                  readonly "Service Unavailable": 503;
                  readonly "Gateway Timeout": 504;
                  readonly "HTTP Version Not Supported": 505;
                  readonly "Variant Also Negotiates": 506;
                  readonly "Insufficient Storage": 507;
                  readonly "Loop Detected": 508;
                  readonly "Not Extended": 510;
                  readonly "Network Authentication Required": 511;
                }[Code]
              : Code
          >;
        }) => Promise<
          | import("elysia").ElysiaCustomStatusResponse<"Unauthorized", "Токен олдсонгүй", 401>
          | import("elysia").ElysiaCustomStatusResponse<
              "Not Found",
              "Байгууллагын мэдээлэл олдсонгүй.",
              404
            >
          | import("elysia").ElysiaCustomStatusResponse<
              "Not Found",
              "Салбарын мэдээлэл олдсонгүй.",
              404
            >
          | import("elysia").ElysiaCustomStatusResponse<
              "Payment Required",
              "Системийн төлбөр хийгдээгүй байна. 88046194",
              402
            >
          | import("elysia").ElysiaCustomStatusResponse<"Forbidden", "Хандах эрхгүй байна.", 403>
          | {
              user: import("./lib/auth").User;
              session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
                impersonatedBy?: string | null | undefined;
              };
              permissions: (
                | "BACK_OFFICE_ADMIN"
                | "USER_CREATE_OWN"
                | "USER_CREATE_ADMIN"
                | "USER_CREATE_BACKOFFICE"
                | "USER_SELECT_OWN"
                | "USER_SELECT_ADMIN"
                | "USER_SELECT_BACKOFFICE"
                | "PERMISSION_ADD"
                | "PERMISSION_GROUP_ALL"
                | "INVENTORY_ITEM_SELECT_OWN"
                | "INVENTORY_ITEM_SELECT_ADMIN"
                | "INVENTORY_ITEM_CREATE_OWN"
                | "INVENTORY_ITEM_CREATE_ADMIN"
                | "INVENTORY_ITEM_UPDATE_OWN"
                | "INVENTORY_ITEM_UPDATE_ADMIN"
                | "INVENTORY_ITEM_DELETE_OWN"
                | "INVENTORY_ITEM_DELETE_ADMIN"
                | "INVENTORY_LOG_SELECT_OWN"
                | "INVENTORY_LOG_SELECT_ADMIN"
                | "INVENTORY_REFUND_SELECT_OWN"
                | "INVENTORY_REFUND_SELECT_ADMIN"
                | "INVENTORY_REFUND_CREATE_OWN"
                | "INVENTORY_REFUND_APPROVE_ADMIN"
                | "MERCHANT_MERCHANT_CREATE"
                | "MERCHANT_MERCHANT_UPDATE_OWN"
                | "MERCHANT_MERCHANT_UPDATE_ADMIN"
                | "MERCHANT_BRANCH_SELECT_OWN"
                | "MERCHANT_BRANCH_SELECT_ADMIN"
                | "MERCHANT_BRANCH_CREATE"
              )[];
            }
        >;
      };
    };
    parser: {};
    response: {};
  } & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
  },
  {
    health: {
      get: {
        body: unknown;
        params: {};
        query: unknown;
        headers: unknown;
        response: {
          200: string;
        };
      };
    };
  } & {
    api: {
      image: {};
    } & {
      image: {
        post: {
          body: {
            image: File;
            folder: string;
          };
          params: {};
          query: {};
          headers: {};
          response: {
            200: {
              path: string;
            };
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
          };
        };
      };
    } & {
      image: {
        pdf: {
          post: {
            body: {
              folder: string;
              pdf: File;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                path: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      };
    } & {
      image: {
        get: {
          body: {};
          params: {};
          query: {
            name: string;
            folder: string;
          };
          headers: {};
          response: {
            200: Response;
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
          };
        };
      };
    };
  } & {
    api: {
      bt: {
        "cart-item": {};
      } & {
        "cart-item": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              productId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    product: {
                      name: string;
                      partNumber: string;
                      oen: string[] | null;
                      description: string | null;
                      supplierId: string;
                      pictureList: string[];
                      uomId: string;
                      uomQuantity: number;
                      productKindId: string;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    requestItem: {
                      requestId: string;
                      productId: string;
                      status: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED";
                      type: "WAREHOUSE" | "ORDER";
                      unit: "MOQ" | "PACKAGE";
                      quantity: number;
                      currency: string;
                      price: number;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                    companyId: string;
                    branchId: string;
                    productId: string;
                    quantity: number;
                    description: string | null;
                    btRequestItemId: string;
                    json: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "cart-item": {
          post: {
            body: {
              json?: import("drizzle-typebox").Json | undefined;
              oldId?: number | null | undefined;
              quantity?: number | undefined;
              description?: string | null | undefined;
              productId: string;
              btRequestItemId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                json: unknown;
                branchId: string;
                companyId: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                productId: string;
                quantity: number;
                description: string | null;
                btRequestItemId: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "cart-item": {
          order: {
            post: {
              body: {
                deliveryAddress: string;
                cartItemIds: string[];
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: {
                  readonly message: "Сагсны мэдээлэл таарахгүй байна.";
                  readonly ids: string[];
                };
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cart-item": {
          ":id": {
            put: {
              body: {
                json?: import("drizzle-typebox").Json | undefined;
                oldId?: number | null | undefined;
                productId?: string | undefined;
                quantity?: number | undefined;
                description?: string | null | undefined;
                btRequestItemId?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string;
                  productId: string;
                  quantity: number;
                  description: string | null;
                  btRequestItemId: string;
                  json: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cart-item": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        product: {};
      } & {
        product: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              companyId?: string | undefined;
              warehouseItemId?: string | undefined;
              productId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    companyId: string;
                    warehouseItemId: string;
                    productId: string | null;
                    baseQuantity: number;
                    uomId: string | null;
                    price: number;
                    currency: string;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        product: {
          post: {
            body: {
              oldId?: number | null | undefined;
              productId?: string | null | undefined;
              baseQuantity?: number | undefined;
              uomId?: string | null | undefined;
              price?: number | undefined;
              currency?: string | undefined;
              warehouseItemId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                warehouseItemId: string;
                productId: string | null;
                baseQuantity: number;
                uomId: string | null;
                price: number;
                currency: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        product: {
          ":id": {
            put: {
              body: {
                companyId?: string | undefined;
                oldId?: number | null | undefined;
                warehouseItemId?: string | undefined;
                productId?: string | null | undefined;
                baseQuantity?: number | undefined;
                uomId?: string | null | undefined;
                price?: number | undefined;
                currency?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  warehouseItemId: string;
                  productId: string | null;
                  baseQuantity: number;
                  uomId: string | null;
                  price: number;
                  currency: string;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        product: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        order: {};
      } & {
        order: {
          get: {
            body: {};
            params: {};
            query: {
              state?:
                | "DRAFT"
                | "CONFIRMED"
                | "PROCESSING"
                | "SHIPPED"
                | "DELIVERED"
                | "CANCELLED"
                | "ON_HOLD"
                | "PARTIALLY_SHIPPED"
                | "PARTIALLY_DELIVERED"
                | undefined;
              id?: string | undefined;
              orderCode?: string | undefined;
              customerId?: string | undefined;
              companySupplierId?: string | undefined;
              companyClientId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    orderCode: string;
                    customerId: string;
                    customerName: string;
                    deliveryAddress: string;
                    companySupplierId: string | null;
                    companyClientId: string;
                    state:
                      | "DRAFT"
                      | "CONFIRMED"
                      | "PROCESSING"
                      | "SHIPPED"
                      | "DELIVERED"
                      | "CANCELLED"
                      | "ON_HOLD"
                      | "PARTIALLY_SHIPPED"
                      | "PARTIALLY_DELIVERED";
                    priceTotal: number;
                    currency: string | null;
                    extraData: unknown;
                    orderDate: string | null;
                    requestedDeliveryDate: string | null;
                    timeConfirmed: string | null;
                    timeShipped: string | null;
                    timeDelivered: string | null;
                    timeCancelled: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        order: {
          post: {
            body: {
              state?:
                | "DRAFT"
                | "CONFIRMED"
                | "PROCESSING"
                | "SHIPPED"
                | "DELIVERED"
                | "CANCELLED"
                | "ON_HOLD"
                | "PARTIALLY_SHIPPED"
                | "PARTIALLY_DELIVERED"
                | undefined;
              oldId?: number | null | undefined;
              currency?: string | null | undefined;
              companySupplierId?: string | null | undefined;
              extraData?: import("drizzle-typebox").Json | undefined;
              orderDate?: string | null | undefined;
              requestedDeliveryDate?: string | null | undefined;
              timeConfirmed?: string | null | undefined;
              timeShipped?: string | null | undefined;
              timeDelivered?: string | null | undefined;
              timeCancelled?: string | null | undefined;
              orderCode: string;
              customerId: string;
              customerName: string;
              deliveryAddress: string;
              companyClientId: string;
              priceTotal: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state:
                  | "DRAFT"
                  | "CONFIRMED"
                  | "PROCESSING"
                  | "SHIPPED"
                  | "DELIVERED"
                  | "CANCELLED"
                  | "ON_HOLD"
                  | "PARTIALLY_SHIPPED"
                  | "PARTIALLY_DELIVERED";
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                currency: string | null;
                orderCode: string;
                customerId: string;
                customerName: string;
                deliveryAddress: string;
                companySupplierId: string | null;
                companyClientId: string;
                priceTotal: number;
                extraData: unknown;
                orderDate: string | null;
                requestedDeliveryDate: string | null;
                timeConfirmed: string | null;
                timeShipped: string | null;
                timeDelivered: string | null;
                timeCancelled: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        order: {
          ":id": {
            paid: {
              post: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        order: {
          id: {
            shipped: {
              post: {
                body: {
                  warehouseId: string;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        order: {
          ":id": {
            put: {
              body: {
                state?:
                  | "DRAFT"
                  | "CONFIRMED"
                  | "PROCESSING"
                  | "SHIPPED"
                  | "DELIVERED"
                  | "CANCELLED"
                  | "ON_HOLD"
                  | "PARTIALLY_SHIPPED"
                  | "PARTIALLY_DELIVERED"
                  | undefined;
                oldId?: number | null | undefined;
                currency?: string | null | undefined;
                orderCode?: string | undefined;
                customerId?: string | undefined;
                customerName?: string | undefined;
                deliveryAddress?: string | undefined;
                companySupplierId?: string | null | undefined;
                companyClientId?: string | undefined;
                priceTotal?: number | undefined;
                extraData?: import("drizzle-typebox").Json | undefined;
                orderDate?: string | null | undefined;
                requestedDeliveryDate?: string | null | undefined;
                timeConfirmed?: string | null | undefined;
                timeShipped?: string | null | undefined;
                timeDelivered?: string | null | undefined;
                timeCancelled?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  orderCode: string;
                  customerId: string;
                  customerName: string;
                  deliveryAddress: string;
                  companySupplierId: string | null;
                  companyClientId: string;
                  state:
                    | "DRAFT"
                    | "CONFIRMED"
                    | "PROCESSING"
                    | "SHIPPED"
                    | "DELIVERED"
                    | "CANCELLED"
                    | "ON_HOLD"
                    | "PARTIALLY_SHIPPED"
                    | "PARTIALLY_DELIVERED";
                  priceTotal: number;
                  currency: string | null;
                  extraData: unknown;
                  orderDate: string | null;
                  requestedDeliveryDate: string | null;
                  timeConfirmed: string | null;
                  timeShipped: string | null;
                  timeDelivered: string | null;
                  timeCancelled: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        order: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        "order-item": {};
      } & {
        "order-item": {
          get: {
            body: {};
            params: {};
            query: {
              state?:
                | "SHIPPED"
                | "DELIVERED"
                | "CANCELLED"
                | "PENDING"
                | "RESERVED"
                | "BACKORDERED"
                | undefined;
              id?: string | undefined;
              productId?: string | undefined;
              btOrderId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    item: {
                      btOrderId: string;
                      productId: string;
                      skuId: string | null;
                      skuName: string | null;
                      partNumber: string | null;
                      quantity: number;
                      currency: string | null;
                      priceUnit: number;
                      priceTotal: number;
                      state:
                        | "SHIPPED"
                        | "DELIVERED"
                        | "CANCELLED"
                        | "PENDING"
                        | "RESERVED"
                        | "BACKORDERED";
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    product: {
                      name: string;
                      partNumber: string;
                      oen: string[] | null;
                      description: string | null;
                      supplierId: string;
                      pictureList: string[];
                      uomId: string;
                      uomQuantity: number;
                      productKindId: string;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "order-item": {
          post: {
            body: {
              state?:
                | "SHIPPED"
                | "DELIVERED"
                | "CANCELLED"
                | "PENDING"
                | "RESERVED"
                | "BACKORDERED"
                | undefined;
              oldId?: number | null | undefined;
              currency?: string | null | undefined;
              skuId?: string | null | undefined;
              skuName?: string | null | undefined;
              partNumber?: string | null | undefined;
              productId: string;
              priceTotal: number;
              btOrderId: string;
              quantity: number;
              priceUnit: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state:
                  | "SHIPPED"
                  | "DELIVERED"
                  | "CANCELLED"
                  | "PENDING"
                  | "RESERVED"
                  | "BACKORDERED";
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                productId: string;
                currency: string | null;
                priceTotal: number;
                btOrderId: string;
                skuId: string | null;
                skuName: string | null;
                partNumber: string | null;
                quantity: number;
                priceUnit: number;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "order-item": {
          ":id": {
            put: {
              body: {
                state?:
                  | "SHIPPED"
                  | "DELIVERED"
                  | "CANCELLED"
                  | "PENDING"
                  | "RESERVED"
                  | "BACKORDERED"
                  | undefined;
                oldId?: number | null | undefined;
                productId?: string | undefined;
                currency?: string | null | undefined;
                priceTotal?: number | undefined;
                btOrderId?: string | undefined;
                skuId?: string | null | undefined;
                skuName?: string | null | undefined;
                partNumber?: string | null | undefined;
                quantity?: number | undefined;
                priceUnit?: number | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  btOrderId: string;
                  productId: string;
                  skuId: string | null;
                  skuName: string | null;
                  partNumber: string | null;
                  quantity: number;
                  currency: string | null;
                  priceUnit: number;
                  priceTotal: number;
                  state:
                    | "SHIPPED"
                    | "DELIVERED"
                    | "CANCELLED"
                    | "PENDING"
                    | "RESERVED"
                    | "BACKORDERED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "order-item": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        "order-req": {};
      } & {
        "order-req": {
          get: {
            body: {};
            params: {};
            query: {
              state?:
                | "DRAFT"
                | "CANCELLED"
                | "SUBMITTED"
                | "UNDER_REVIEW"
                | "APPROVED"
                | "REJECTED"
                | "EXPIRED"
                | undefined;
              id?: string | undefined;
              companyClientId?: string | undefined;
              btOrderId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    btOrderId: string;
                    companyClientId: string;
                    priceTotal: number;
                    currency: string | null;
                    state:
                      | "DRAFT"
                      | "CANCELLED"
                      | "SUBMITTED"
                      | "UNDER_REVIEW"
                      | "APPROVED"
                      | "REJECTED"
                      | "EXPIRED";
                    timeSubmitted: string | null;
                    timeUnderReview: string | null;
                    timeApproved: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "order-req": {
          post: {
            body: {
              state?:
                | "DRAFT"
                | "CANCELLED"
                | "SUBMITTED"
                | "UNDER_REVIEW"
                | "APPROVED"
                | "REJECTED"
                | "EXPIRED"
                | undefined;
              oldId?: number | null | undefined;
              currency?: string | null | undefined;
              timeSubmitted?: string | null | undefined;
              timeUnderReview?: string | null | undefined;
              timeApproved?: string | null | undefined;
              companyClientId: string;
              priceTotal: number;
              btOrderId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state:
                  | "DRAFT"
                  | "CANCELLED"
                  | "SUBMITTED"
                  | "UNDER_REVIEW"
                  | "APPROVED"
                  | "REJECTED"
                  | "EXPIRED";
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                currency: string | null;
                companyClientId: string;
                priceTotal: number;
                btOrderId: string;
                timeSubmitted: string | null;
                timeUnderReview: string | null;
                timeApproved: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "order-req": {
          ":id": {
            put: {
              body: {
                state?:
                  | "DRAFT"
                  | "CANCELLED"
                  | "SUBMITTED"
                  | "UNDER_REVIEW"
                  | "APPROVED"
                  | "REJECTED"
                  | "EXPIRED"
                  | undefined;
                oldId?: number | null | undefined;
                currency?: string | null | undefined;
                companyClientId?: string | undefined;
                priceTotal?: number | undefined;
                btOrderId?: string | undefined;
                timeSubmitted?: string | null | undefined;
                timeUnderReview?: string | null | undefined;
                timeApproved?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  btOrderId: string;
                  companyClientId: string;
                  priceTotal: number;
                  currency: string | null;
                  state:
                    | "DRAFT"
                    | "CANCELLED"
                    | "SUBMITTED"
                    | "UNDER_REVIEW"
                    | "APPROVED"
                    | "REJECTED"
                    | "EXPIRED";
                  timeSubmitted: string | null;
                  timeUnderReview: string | null;
                  timeApproved: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "order-req": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        "order-req-item": {};
      } & {
        "order-req-item": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              productId?: string | undefined;
              btOrderReqId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    btOrderReqId: string;
                    productId: string;
                    skuId: string | null;
                    skuName: string | null;
                    partNumber: string | null;
                    quantity: number;
                    currency: string | null;
                    priceUnit: number;
                    priceTotal: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "order-req-item": {
          post: {
            body: {
              oldId?: number | null | undefined;
              currency?: string | null | undefined;
              skuId?: string | null | undefined;
              skuName?: string | null | undefined;
              partNumber?: string | null | undefined;
              productId: string;
              priceTotal: number;
              quantity: number;
              priceUnit: number;
              btOrderReqId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                productId: string;
                currency: string | null;
                priceTotal: number;
                skuId: string | null;
                skuName: string | null;
                partNumber: string | null;
                quantity: number;
                priceUnit: number;
                btOrderReqId: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "order-req-item": {
          ":id": {
            put: {
              body: {
                oldId?: number | null | undefined;
                productId?: string | undefined;
                currency?: string | null | undefined;
                priceTotal?: number | undefined;
                skuId?: string | null | undefined;
                skuName?: string | null | undefined;
                partNumber?: string | null | undefined;
                quantity?: number | undefined;
                priceUnit?: number | undefined;
                btOrderReqId?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  btOrderReqId: string;
                  productId: string;
                  skuId: string | null;
                  skuName: string | null;
                  partNumber: string | null;
                  quantity: number;
                  currency: string | null;
                  priceUnit: number;
                  priceTotal: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "order-req-item": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        request: {
          item: {};
        } & {
          item: {
            get: {
              body: {};
              params: {};
              query: {
                id?: string | undefined;
                productId?: string | undefined;
                status?: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED" | undefined;
                requestId?: string | undefined;
                type?: "WAREHOUSE" | "ORDER" | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      item: {
                        requestId: string;
                        productId: string;
                        status: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED";
                        type: "WAREHOUSE" | "ORDER";
                        unit: "MOQ" | "PACKAGE";
                        quantity: number;
                        currency: string;
                        price: number;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      product: {
                        name: string;
                        partNumber: string;
                        oen: string[] | null;
                        description: string | null;
                        supplierId: string;
                        pictureList: string[];
                        uomId: string;
                        uomQuantity: number;
                        productKindId: string;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      totalCount: number;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          item: {
            post: {
              body: {
                oldId?: number | null | undefined;
                quantity?: number | undefined;
                status?: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED" | undefined;
                unit?: "MOQ" | "PACKAGE" | undefined;
                productId: string;
                price: number;
                currency: string;
                requestId: string;
                type: "WAREHOUSE" | "ORDER";
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  productId: string;
                  price: number;
                  currency: string;
                  quantity: number;
                  status: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED";
                  requestId: string;
                  type: "WAREHOUSE" | "ORDER";
                  unit: "MOQ" | "PACKAGE";
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Хүсэлт олдсонгүй эсвэл хандах эрхгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Баталгаажуулагдсан эсвэл цуцалсан захиалгын хүсэлтэд нэмэх боломжгүй.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          item: {
            ":id": {
              put: {
                body: {
                  oldId?: number | null | undefined;
                  productId?: string | undefined;
                  price?: number | undefined;
                  currency?: string | undefined;
                  quantity?: number | undefined;
                  status?: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED" | undefined;
                  requestId?: string | undefined;
                  type?: "WAREHOUSE" | "ORDER" | undefined;
                  unit?: "MOQ" | "PACKAGE" | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    requestId: string;
                    productId: string;
                    status: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED";
                    type: "WAREHOUSE" | "ORDER";
                    unit: "MOQ" | "PACKAGE";
                    quantity: number;
                    currency: string;
                    price: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          item: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        request: {};
      } & {
        request: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              companyId?: string | undefined;
              status?: "DRAFT" | "CANCELLED" | "SUBMITTED" | "APPROVED" | "REJECTED" | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    request: {
                      companyId: string;
                      status: "DRAFT" | "CANCELLED" | "SUBMITTED" | "APPROVED" | "REJECTED";
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    company: {
                      name: string;
                      regNumber: string;
                      phone: string;
                      email: string;
                      serviceName: string;
                      logoUrl: string;
                      province: string | null;
                      district: string | null;
                      khoroo: string | null;
                      street: string | null;
                      socialUrls: string[] | null;
                      ceoName: string | null;
                      webUrl: string | null;
                      googleMapUrl: string | null;
                      isContract: boolean;
                      isNoat: boolean;
                      isNexus: boolean;
                      isActive: boolean;
                      branchCount: number;
                      type:
                        | "AutoService"
                        | "MiningFleet"
                        | "UrbanTransportFleet"
                        | "Long-haul/Logistics"
                        | "Emergency/Medical/Police"
                        | "CorporateFleet";
                      isFranchise: boolean;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        request: {
          post: {
            body: {};
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                status: "DRAFT" | "CANCELLED" | "SUBMITTED" | "APPROVED" | "REJECTED";
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            };
          };
        };
      } & {
        request: {
          ":id": {
            put: {
              body: {
                status?: "DRAFT" | "CANCELLED" | "SUBMITTED" | "APPROVED" | "REJECTED" | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  status: "DRAFT" | "CANCELLED" | "SUBMITTED" | "APPROVED" | "REJECTED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Зөвхөн баталгаажуулах эрхтэй.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        request: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        invoice: {};
      } & {
        invoice: {
          get: {
            body: {};
            params: {};
            query: {
              state?:
                | "DRAFT"
                | "CANCELLED"
                | "ISSUED"
                | "PARTIALLY_PAID"
                | "PAID"
                | "OVERDUE"
                | "VOID"
                | undefined;
              id?: string | undefined;
              btOrderId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    btOrderId: string;
                    amountTotal: number;
                    dateStart: string | null;
                    dateEnd: string | null;
                    state:
                      | "DRAFT"
                      | "CANCELLED"
                      | "ISSUED"
                      | "PARTIALLY_PAID"
                      | "PAID"
                      | "OVERDUE"
                      | "VOID";
                    paymentDate: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        invoice: {
          post: {
            body: {
              state?:
                | "DRAFT"
                | "CANCELLED"
                | "ISSUED"
                | "PARTIALLY_PAID"
                | "PAID"
                | "OVERDUE"
                | "VOID"
                | undefined;
              oldId?: number | null | undefined;
              dateStart?: string | null | undefined;
              dateEnd?: string | null | undefined;
              paymentDate?: string | null | undefined;
              btOrderId: string;
              amountTotal: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state:
                  | "DRAFT"
                  | "CANCELLED"
                  | "ISSUED"
                  | "PARTIALLY_PAID"
                  | "PAID"
                  | "OVERDUE"
                  | "VOID";
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                btOrderId: string;
                amountTotal: number;
                dateStart: string | null;
                dateEnd: string | null;
                paymentDate: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        invoice: {
          ":id": {
            put: {
              body: {
                state?:
                  | "DRAFT"
                  | "CANCELLED"
                  | "ISSUED"
                  | "PARTIALLY_PAID"
                  | "PAID"
                  | "OVERDUE"
                  | "VOID"
                  | undefined;
                oldId?: number | null | undefined;
                btOrderId?: string | undefined;
                amountTotal?: number | undefined;
                dateStart?: string | null | undefined;
                dateEnd?: string | null | undefined;
                paymentDate?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  btOrderId: string;
                  amountTotal: number;
                  dateStart: string | null;
                  dateEnd: string | null;
                  state:
                    | "DRAFT"
                    | "CANCELLED"
                    | "ISSUED"
                    | "PARTIALLY_PAID"
                    | "PAID"
                    | "OVERDUE"
                    | "VOID";
                  paymentDate: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        invoice: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      bt: {
        payment: {};
      } & {
        payment: {
          get: {
            body: {};
            params: {};
            query: {
              state?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REVERSED" | undefined;
              id?: string | undefined;
              btInvoiceId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    btInvoiceId: string;
                    amount: number;
                    paymentMethod: string;
                    paymentChannel: string;
                    currency: string | null;
                    state: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REVERSED";
                    note: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        payment: {
          post: {
            body: {
              state?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REVERSED" | undefined;
              oldId?: number | null | undefined;
              currency?: string | null | undefined;
              note?: string | null | undefined;
              btInvoiceId: string;
              amount: number;
              paymentMethod: string;
              paymentChannel: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REVERSED";
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                currency: string | null;
                btInvoiceId: string;
                amount: number;
                paymentMethod: string;
                paymentChannel: string;
                note: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        payment: {
          ":id": {
            put: {
              body: {
                state?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REVERSED" | undefined;
                oldId?: number | null | undefined;
                currency?: string | null | undefined;
                btInvoiceId?: string | undefined;
                amount?: number | undefined;
                paymentMethod?: string | undefined;
                paymentChannel?: string | undefined;
                note?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  btInvoiceId: string;
                  amount: number;
                  paymentMethod: string;
                  paymentChannel: string;
                  currency: string | null;
                  state: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "REVERSED";
                  note: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        payment: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      warehouse: {
        product: {};
      } & {
        product: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              companyId?: string | undefined;
              search?: string | undefined;
              productId?: string | undefined;
              type?:
                | "Сэлбэг"
                | "Тос"
                | "Дугуй"
                | "Будаг"
                | "Аккумлятор"
                | "Авто гоёл"
                | "Батерей"
                | "Задаргаа"
                | undefined;
              supplierId?: string | undefined;
              priceSell?: number | undefined;
              ids?: string[] | undefined;
              isTechdocProduct?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    product: {
                      supplierId: string;
                      productId: string | null;
                      name: string;
                      description: string | null;
                      priceSell: number;
                      priceBuy: number;
                      barCode: string | null;
                      oen: string | null;
                      partNumber: string;
                      alias: string | null;
                      companyId: string;
                      type:
                        | "Сэлбэг"
                        | "Тос"
                        | "Дугуй"
                        | "Будаг"
                        | "Аккумлятор"
                        | "Авто гоёл"
                        | "Батерей"
                        | "Задаргаа";
                      quantityUnit: number;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    supplier: {
                      name: string;
                      phone: string | null;
                      address: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        product: {
          post: {
            body: {
              oldId?: number | null | undefined;
              productId?: string | null | undefined;
              type?:
                | "Сэлбэг"
                | "Тос"
                | "Дугуй"
                | "Будаг"
                | "Аккумлятор"
                | "Авто гоёл"
                | "Батерей"
                | "Задаргаа"
                | undefined;
              description?: string | null | undefined;
              oen?: string | null | undefined;
              barCode?: string | null | undefined;
              alias?: string | null | undefined;
              quantityUnit?: number | undefined;
              name: string;
              partNumber: string;
              supplierId: string;
              priceSell: number;
              priceBuy: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                productId: string | null;
                partNumber: string;
                type:
                  | "Сэлбэг"
                  | "Тос"
                  | "Дугуй"
                  | "Будаг"
                  | "Аккумлятор"
                  | "Авто гоёл"
                  | "Батерей"
                  | "Задаргаа";
                description: string | null;
                oen: string | null;
                supplierId: string;
                priceSell: number;
                priceBuy: number;
                barCode: string | null;
                alias: string | null;
                quantityUnit: number;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        product: {
          many: {
            post: {
              body: {
                oldId?: number | null | undefined;
                productId?: string | null | undefined;
                type?:
                  | "Сэлбэг"
                  | "Тос"
                  | "Дугуй"
                  | "Будаг"
                  | "Аккумлятор"
                  | "Авто гоёл"
                  | "Батерей"
                  | "Задаргаа"
                  | undefined;
                description?: string | null | undefined;
                oen?: string | null | undefined;
                barCode?: string | null | undefined;
                alias?: string | null | undefined;
                quantityUnit?: number | undefined;
                name: string;
                partNumber: string;
                supplierId: string;
                priceSell: number;
                priceBuy: number;
              }[];
              params: {};
              query: {};
              headers: {};
              response: {
                200: AsyncGenerator<
                  {
                    percent: number;
                    count: number;
                    total: number;
                  },
                  void,
                  unknown
                >;
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        product: {
          download: {
            post: {
              body: {};
              params: {};
              query: {
                id?: string | undefined;
                companyId?: string | undefined;
                search?: string | undefined;
                productId?: string | undefined;
                type?:
                  | "Сэлбэг"
                  | "Тос"
                  | "Дугуй"
                  | "Будаг"
                  | "Аккумлятор"
                  | "Авто гоёл"
                  | "Батерей"
                  | "Задаргаа"
                  | undefined;
                supplierId?: string | undefined;
                priceSell?: number | undefined;
                ids?: string[] | undefined;
                isTechdocProduct?: boolean | undefined;
              };
              headers: {};
              response: {
                200: Response;
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                204: "Бараа олдсонгүй.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        product: {
          techdoc: {
            product: {
              put: {
                body: {
                  productId: string;
                  warehouseProductIds: string[];
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        product: {
          ":id": {
            put: {
              body: {
                companyId?: string | undefined;
                name?: string | undefined;
                oldId?: number | null | undefined;
                productId?: string | null | undefined;
                partNumber?: string | undefined;
                type?:
                  | "Сэлбэг"
                  | "Тос"
                  | "Дугуй"
                  | "Будаг"
                  | "Аккумлятор"
                  | "Авто гоёл"
                  | "Батерей"
                  | "Задаргаа"
                  | undefined;
                description?: string | null | undefined;
                oen?: string | null | undefined;
                supplierId?: string | undefined;
                priceSell?: number | undefined;
                priceBuy?: number | undefined;
                barCode?: string | null | undefined;
                alias?: string | null | undefined;
                quantityUnit?: number | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  supplierId: string;
                  productId: string | null;
                  name: string;
                  description: string | null;
                  priceSell: number;
                  priceBuy: number;
                  barCode: string | null;
                  oen: string | null;
                  partNumber: string;
                  alias: string | null;
                  companyId: string;
                  type:
                    | "Сэлбэг"
                    | "Тос"
                    | "Дугуй"
                    | "Будаг"
                    | "Аккумлятор"
                    | "Авто гоёл"
                    | "Батерей"
                    | "Задаргаа";
                  quantityUnit: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бараа олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        product: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бараа олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      warehouse: {
        warehouse: {};
      } & {
        warehouse: {
          get: {
            body: {};
            params: {};
            query: {
              branchId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  companyId: string;
                  branchId: string | null;
                  name: string;
                  description: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        warehouse: {
          post: {
            body: {
              branchId?: string | null | undefined;
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                branchId: string | null;
                companyId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        warehouse: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string | null;
                  name: string;
                  description: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Агуулах олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        warehouse: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      warehouse: {
        item: {};
      } & {
        item: {
          get: {
            body: {};
            params: {};
            query: {
              product?:
                | {
                    id?: string | undefined;
                    companyId?: string | undefined;
                    search?: string | undefined;
                    productId?: string | undefined;
                    type?:
                      | "Сэлбэг"
                      | "Тос"
                      | "Дугуй"
                      | "Будаг"
                      | "Аккумлятор"
                      | "Авто гоёл"
                      | "Батерей"
                      | "Задаргаа"
                      | undefined;
                    supplierId?: string | undefined;
                    priceSell?: number | undefined;
                    ids?: string[] | undefined;
                    isTechdocProduct?: boolean | undefined;
                  }
                | undefined;
              isActive?: boolean | undefined;
              warehouseId?: string | undefined;
              safetyStock?: number | undefined;
              shelfNumber?: string | undefined;
              isOrdered?: boolean | undefined;
              isSafetyStock?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    item: {
                      warehouseId: string;
                      productId: string;
                      quantity: number;
                      safetyStock: number;
                      shelfNumber: string | null;
                      description: string | null;
                      isOrdered: boolean;
                      order: number;
                      priceSell: number | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    supplier: {
                      name: string;
                      phone: string | null;
                      address: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    product: {
                      supplierId: string;
                      productId: string | null;
                      name: string;
                      description: string | null;
                      priceSell: number;
                      priceBuy: number;
                      barCode: string | null;
                      oen: string | null;
                      partNumber: string;
                      alias: string | null;
                      companyId: string;
                      type:
                        | "Сэлбэг"
                        | "Тос"
                        | "Дугуй"
                        | "Будаг"
                        | "Аккумлятор"
                        | "Авто гоёл"
                        | "Батерей"
                        | "Задаргаа";
                      quantityUnit: number;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        item: {
          sos: {
            get: {
              body: {};
              params: {};
              query: {};
              headers: {};
              response: {
                200: number;
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
              };
            };
          };
        };
      } & {
        item: {
          post: {
            body: {
              oldId?: number | null | undefined;
              order?: number | undefined;
              quantity?: number | undefined;
              description?: string | null | undefined;
              priceSell?: number | null | undefined;
              shelfNumber?: string | null | undefined;
              isOrdered?: boolean | undefined;
              productId: string;
              warehouseId: string;
              safetyStock: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                productId: string;
                order: number;
                quantity: number;
                description: string | null;
                priceSell: number | null;
                warehouseId: string;
                safetyStock: number;
                shelfNumber: string | null;
                isOrdered: boolean;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              409: string;
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        item: {
          many: {
            post: {
              body: {
                oldId?: number | null | undefined;
                order?: number | undefined;
                quantity?: number | undefined;
                description?: string | null | undefined;
                priceSell?: number | null | undefined;
                shelfNumber?: string | null | undefined;
                isOrdered?: boolean | undefined;
                productId: string;
                warehouseId: string;
                safetyStock: number;
              }[];
              params: {};
              query: {};
              headers: {};
              response: {
                200: AsyncGenerator<
                  | import("elysia").ElysiaCustomStatusResponse<
                      "Bad Request",
                      "Ажилтны мэдээлэл шаардлагатай.",
                      400
                    >
                  | import("elysia").ElysiaCustomStatusResponse<
                      "Not Found",
                      "Агуулахын бараа олдсонгүй.",
                      404
                    >
                  | import("elysia").ElysiaCustomStatusResponse<
                      "Bad Request",
                      "Барааны үлдэгдэл хүрэлцэхгүй байна.",
                      400
                    >
                  | {
                      type: "New Items";
                      percent: number;
                      count: number;
                      total: number;
                    }
                  | {
                      type: "Current Items";
                      percent: number;
                      count: number;
                      total: number;
                    },
                  void,
                  unknown
                >;
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        item: {
          transaction: {
            get: {
              body: {};
              params: {};
              query: {
                employeeId?: string | undefined;
                userId?: string | undefined;
                product?:
                  | {
                      id?: string | undefined;
                      companyId?: string | undefined;
                      search?: string | undefined;
                      productId?: string | undefined;
                      type?:
                        | "Сэлбэг"
                        | "Тос"
                        | "Дугуй"
                        | "Будаг"
                        | "Аккумлятор"
                        | "Авто гоёл"
                        | "Батерей"
                        | "Задаргаа"
                        | undefined;
                      supplierId?: string | undefined;
                      priceSell?: number | undefined;
                      ids?: string[] | undefined;
                      isTechdocProduct?: boolean | undefined;
                    }
                  | undefined;
                orderId?: string | undefined;
                warehouseId?: string | undefined;
                itemId?: string | undefined;
                transactionType?: "IN" | "OUT" | undefined;
                transactionKind?:
                  | "ORDER"
                  | "TRANSFER"
                  | "RETURN"
                  | "ADJUSTMENT"
                  | "REJECTION"
                  | "SALES"
                  | undefined;
                salesId?: string | undefined;
                transferId?: string | undefined;
                dateFrom?: string | undefined;
                dateTo?: string | undefined;
                minQuantity?: number | undefined;
                maxQuantity?: number | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      totalCount: number;
                      product: {
                        supplierId: string;
                        productId: string | null;
                        name: string;
                        description: string | null;
                        priceSell: number;
                        priceBuy: number;
                        barCode: string | null;
                        oen: string | null;
                        partNumber: string;
                        alias: string | null;
                        companyId: string;
                        type:
                          | "Сэлбэг"
                          | "Тос"
                          | "Дугуй"
                          | "Будаг"
                          | "Аккумлятор"
                          | "Авто гоёл"
                          | "Батерей"
                          | "Задаргаа";
                        quantityUnit: number;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      item: {
                        warehouseId: string;
                        productId: string;
                        quantity: number;
                        safetyStock: number;
                        shelfNumber: string | null;
                        description: string | null;
                        isOrdered: boolean;
                        order: number;
                        priceSell: number | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      user: {
                        name: string;
                        kind: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION";
                      } | null;
                      itemId: string;
                      productId: string | null;
                      transactionType: "IN" | "OUT";
                      transactionKind:
                        | "ORDER"
                        | "TRANSFER"
                        | "RETURN"
                        | "ADJUSTMENT"
                        | "REJECTION"
                        | "SALES";
                      quantity: number;
                      quantityBefore: number;
                      quantityAfter: number;
                      description: string | null;
                      employeeId: string;
                      userId: string;
                      salesId: string | null;
                      orderId: string | null;
                      transferId: string | null;
                      transferItemId: string | null;
                      msRecordProductId: string | null;
                      btOrderId: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        item: {
          "change-quantity": {
            post: {
              body: {
                itemId: string;
                quantityChange: number;
                transactionDetails: {
                  btOrderId?: string | null | undefined;
                  description?: string | null | undefined;
                  orderId?: string | null | undefined;
                  salesId?: string | null | undefined;
                  transferId?: string | null | undefined;
                  transferItemId?: string | null | undefined;
                  msRecordProductId?: string | null | undefined;
                  transactionType: "IN" | "OUT";
                  transactionKind:
                    | "ORDER"
                    | "TRANSFER"
                    | "RETURN"
                    | "ADJUSTMENT"
                    | "REJECTION"
                    | "SALES";
                };
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  warehouseId: string;
                  productId: string;
                  quantity: number;
                  safetyStock: number;
                  shelfNumber: string | null;
                  description: string | null;
                  isOrdered: boolean;
                  order: number;
                  priceSell: number | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Агуулахын бараа олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Ажилтны мэдээлэл шаардлагатай." | "Барааны үлдэгдэл хүрэлцэхгүй байна.";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        item: {
          order: {
            post: {
              body: {};
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
              };
            };
          };
        };
      } & {
        item: {
          transfer: {
            post: {
              body: {
                quantity: number;
                fromWarehouseId: string;
                toWarehouseId: string;
                warehouseProductId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Агуулахын бараа олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Агуулахын барааны үлдэгдэл хүрэлцэхгүй байна.";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        item: {
          ":id": {
            put: {
              body: {
                deletedAt?: string | null | undefined;
                oldId?: number | null | undefined;
                productId?: string | undefined;
                order?: number | undefined;
                description?: string | null | undefined;
                priceSell?: number | null | undefined;
                warehouseId?: string | undefined;
                safetyStock?: number | undefined;
                shelfNumber?: string | null | undefined;
                isOrdered?: boolean | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  warehouseId: string;
                  productId: string;
                  quantity: number;
                  safetyStock: number;
                  shelfNumber: string | null;
                  description: string | null;
                  isOrdered: boolean;
                  order: number;
                  priceSell: number | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Агуулахын бараа олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                409: string;
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        item: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      company: {
        company: {};
      } & {
        company: {
          get: {
            body: {};
            params: {};
            query: {
              isActive?: boolean | undefined;
              regNumber?: string | undefined;
              phone?: string | undefined;
              serviceName?: string | undefined;
              isFranchise?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    id: string;
                    name: string;
                    email: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    type:
                      | "AutoService"
                      | "MiningFleet"
                      | "UrbanTransportFleet"
                      | "Long-haul/Logistics"
                      | "Emergency/Medical/Police"
                      | "CorporateFleet";
                    isActive: boolean;
                    regNumber: string;
                    phone: string;
                    serviceName: string;
                    logoUrl: string;
                    province: string | null;
                    district: string | null;
                    khoroo: string | null;
                    street: string | null;
                    socialUrls: string[] | null;
                    ceoName: string | null;
                    webUrl: string | null;
                    googleMapUrl: string | null;
                    isContract: boolean;
                    isNoat: boolean;
                    isNexus: boolean;
                    branchCount: number;
                    isFranchise: boolean;
                  } & {
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        company: {
          post: {
            body: {
              oldId?: number | null | undefined;
              type?:
                | "AutoService"
                | "MiningFleet"
                | "UrbanTransportFleet"
                | "Long-haul/Logistics"
                | "Emergency/Medical/Police"
                | "CorporateFleet"
                | undefined;
              isActive?: boolean | undefined;
              province?: string | null | undefined;
              district?: string | null | undefined;
              khoroo?: string | null | undefined;
              street?: string | null | undefined;
              socialUrls?: string[] | null | undefined;
              ceoName?: string | null | undefined;
              webUrl?: string | null | undefined;
              googleMapUrl?: string | null | undefined;
              isContract?: boolean | undefined;
              isNoat?: boolean | undefined;
              isNexus?: boolean | undefined;
              branchCount?: number | undefined;
              isFranchise?: boolean | undefined;
              name: string;
              email: string;
              regNumber: string;
              phone: string;
              serviceName: string;
              logoUrl: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                email: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                type:
                  | "AutoService"
                  | "MiningFleet"
                  | "UrbanTransportFleet"
                  | "Long-haul/Logistics"
                  | "Emergency/Medical/Police"
                  | "CorporateFleet";
                isActive: boolean;
                regNumber: string;
                phone: string;
                serviceName: string;
                logoUrl: string;
                province: string | null;
                district: string | null;
                khoroo: string | null;
                street: string | null;
                socialUrls: string[] | null;
                ceoName: string | null;
                webUrl: string | null;
                googleMapUrl: string | null;
                isContract: boolean;
                isNoat: boolean;
                isNexus: boolean;
                branchCount: number;
                isFranchise: boolean;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        company: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                email?: string | undefined;
                oldId?: number | null | undefined;
                type?:
                  | "AutoService"
                  | "MiningFleet"
                  | "UrbanTransportFleet"
                  | "Long-haul/Logistics"
                  | "Emergency/Medical/Police"
                  | "CorporateFleet"
                  | undefined;
                isActive?: boolean | undefined;
                regNumber?: string | undefined;
                phone?: string | undefined;
                serviceName?: string | undefined;
                logoUrl?: string | undefined;
                province?: string | null | undefined;
                district?: string | null | undefined;
                khoroo?: string | null | undefined;
                street?: string | null | undefined;
                socialUrls?: string[] | null | undefined;
                ceoName?: string | null | undefined;
                webUrl?: string | null | undefined;
                googleMapUrl?: string | null | undefined;
                isContract?: boolean | undefined;
                isNoat?: boolean | undefined;
                isNexus?: boolean | undefined;
                branchCount?: number | undefined;
                isFranchise?: boolean | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  name: string;
                  email: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  type:
                    | "AutoService"
                    | "MiningFleet"
                    | "UrbanTransportFleet"
                    | "Long-haul/Logistics"
                    | "Emergency/Medical/Police"
                    | "CorporateFleet";
                  isActive: boolean;
                  regNumber: string;
                  phone: string;
                  serviceName: string;
                  logoUrl: string;
                  province: string | null;
                  district: string | null;
                  khoroo: string | null;
                  street: string | null;
                  socialUrls: string[] | null;
                  ceoName: string | null;
                  webUrl: string | null;
                  googleMapUrl: string | null;
                  isContract: boolean;
                  isNoat: boolean;
                  isNexus: boolean;
                  branchCount: number;
                  isFranchise: boolean;
                };
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        company: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        branch: {};
      } & {
        branch: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              email?: string | null | undefined;
              createdAt?: string | undefined;
              updatedAt?: string | undefined;
              deletedAt?: string | null | undefined;
              oldId?: number | null | undefined;
              isActive?: boolean | undefined;
              regNumber?: string | null | undefined;
              phone?: string | undefined;
              logoUrl?: string | undefined;
              province?: string | null | undefined;
              district?: string | null | undefined;
              khoroo?: string | null | undefined;
              street?: string | null | undefined;
              socialUrls?: string[] | null | undefined;
              ceoName?: string | null | undefined;
              googleMapUrl?: string | null | undefined;
              isNoat?: boolean | undefined;
              isFranchise?: boolean | undefined;
              packageId?: string | undefined;
              merchantId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    id: string;
                    name: string;
                    email: string | null;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    isActive: boolean;
                    regNumber: string | null;
                    phone: string;
                    logoUrl: string;
                    province: string | null;
                    district: string | null;
                    khoroo: string | null;
                    street: string | null;
                    socialUrls: string[] | null;
                    ceoName: string | null;
                    googleMapUrl: string | null;
                    isNoat: boolean;
                    isFranchise: boolean;
                    packageId: string;
                    merchantId: string;
                  } & {
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        branch: {
          me: {
            get: {
              body: {};
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      id: string;
                      name: string;
                      email: string | null;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                      isActive: boolean;
                      regNumber: string | null;
                      phone: string;
                      logoUrl: string;
                      province: string | null;
                      district: string | null;
                      khoroo: string | null;
                      street: string | null;
                      socialUrls: string[] | null;
                      ceoName: string | null;
                      googleMapUrl: string | null;
                      isNoat: boolean;
                      isFranchise: boolean;
                      packageId: string;
                      merchantId: string;
                    } & {
                      totalCount: number;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              };
            };
          };
        };
      } & {
        branch: {
          post: {
            body: {
              oldId?: number | null | undefined;
              isActive?: boolean | undefined;
              regNumber?: string | null | undefined;
              province?: string | null | undefined;
              district?: string | null | undefined;
              khoroo?: string | null | undefined;
              street?: string | null | undefined;
              socialUrls?: string[] | null | undefined;
              ceoName?: string | null | undefined;
              googleMapUrl?: string | null | undefined;
              isNoat?: boolean | undefined;
              isFranchise?: boolean | undefined;
              merchantId?: string | undefined;
              name: string;
              email: string | null;
              phone: string;
              logoUrl: string;
              packageId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                email: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                isActive: boolean;
                regNumber: string | null;
                phone: string;
                logoUrl: string;
                province: string | null;
                district: string | null;
                khoroo: string | null;
                street: string | null;
                socialUrls: string[] | null;
                ceoName: string | null;
                googleMapUrl: string | null;
                isNoat: boolean;
                isFranchise: boolean;
                packageId: string;
                merchantId: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        branch: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                email?: string | null | undefined;
                oldId?: number | null | undefined;
                isActive?: boolean | undefined;
                regNumber?: string | null | undefined;
                phone?: string | undefined;
                logoUrl?: string | undefined;
                province?: string | null | undefined;
                district?: string | null | undefined;
                khoroo?: string | null | undefined;
                street?: string | null | undefined;
                socialUrls?: string[] | null | undefined;
                ceoName?: string | null | undefined;
                googleMapUrl?: string | null | undefined;
                isNoat?: boolean | undefined;
                isFranchise?: boolean | undefined;
                packageId?: string | undefined;
                merchantId?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  name: string;
                  email: string | null;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  isActive: boolean;
                  regNumber: string | null;
                  phone: string;
                  logoUrl: string;
                  province: string | null;
                  district: string | null;
                  khoroo: string | null;
                  street: string | null;
                  socialUrls: string[] | null;
                  ceoName: string | null;
                  googleMapUrl: string | null;
                  isNoat: boolean;
                  isFranchise: boolean;
                  packageId: string;
                  merchantId: string;
                };
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        branch: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        package: {};
      } & {
        package: {
          get: {
            body: {};
            params: {};
            query: {
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    price: number;
                    rowCount: number;
                  } & {
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        package: {
          post: {
            body: {
              oldId?: number | null | undefined;
              name: string;
              price: number;
              rowCount: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                price: number;
                rowCount: number;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        package: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                price?: number | undefined;
                rowCount?: number | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  name: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  price: number;
                  rowCount: number;
                };
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        package: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        "service-kind": {};
      } & {
        "service-kind": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              branchId?: string | null | undefined;
              name?: string | undefined;
              code?: string | undefined;
              enabled?: boolean | undefined;
              serviceKindId?: string | null | undefined;
              ids?: string[] | undefined;
              isTechdocServiceKind?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    serviceKind: {
                      id: string;
                      branchId: string | null;
                      companyId: string;
                      name: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                      price: number;
                      description: string | null;
                      enabled: boolean;
                      serviceKindId: string | null;
                    };
                    techdocServiceKind: {
                      id: string;
                      name: string;
                      createdAt: string;
                      updatedAt: string;
                      code: string | null;
                      deletedAt: string | null;
                      oldId: number | null;
                      description: string | null;
                      categoryId: string | null;
                      laborTime: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "service-kind": {
          post: {
            body: {
              branchId?: string | null | undefined;
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              enabled?: boolean | undefined;
              serviceKindId?: string | null | undefined;
              name: string;
              price: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                branchId: string | null;
                companyId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                price: number;
                description: string | null;
                enabled: boolean;
                serviceKindId: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "service-kind": {
          techdoc: {
            "service-kind": {
              put: {
                body: {
                  serviceKindId: string;
                  companyServiceKindIds: string[];
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        "service-kind": {
          ":id": {
            put: {
              body: {
                branchId?: string | null | undefined;
                name?: string | undefined;
                oldId?: number | null | undefined;
                price?: number | undefined;
                description?: string | null | undefined;
                enabled?: boolean | undefined;
                serviceKindId?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  serviceKindId: string | null;
                  companyId: string;
                  branchId: string | null;
                  name: string;
                  description: string | null;
                  enabled: boolean;
                  price: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Үйлчилгээ олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "service-kind": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        employee: {};
      } & {
        employee: {
          get: {
            body: {};
            params: {};
            query: {
              branchId?: string | null | undefined;
              companyId?: string | undefined;
              search?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPages: number;
                results: {
                  companyId: string;
                  branchId: string | null;
                  firstname: string;
                  lastname: string;
                  regNumber: string | null;
                  email: string | null;
                  phone: string;
                  json: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        employee: {
          post: {
            body: {
              json?: import("drizzle-typebox").Json | undefined;
              branchId?: string | null | undefined;
              email?: string | null | undefined;
              oldId?: number | null | undefined;
              regNumber?: string | null | undefined;
              companyId: string;
              phone: string;
              firstname: string;
              lastname: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                json: unknown;
                branchId: string | null;
                companyId: string;
                email: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                regNumber: string | null;
                phone: string;
                firstname: string;
                lastname: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        employee: {
          ":id": {
            put: {
              body: {
                json?: import("drizzle-typebox").Json | undefined;
                branchId?: string | null | undefined;
                companyId?: string | undefined;
                email?: string | null | undefined;
                oldId?: number | null | undefined;
                regNumber?: string | null | undefined;
                phone?: string | undefined;
                firstname?: string | undefined;
                lastname?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string | null;
                  firstname: string;
                  lastname: string;
                  regNumber: string | null;
                  email: string | null;
                  phone: string;
                  json: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Ажилтан олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        employee: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        document: {};
      } & {
        document: {
          get: {
            body: {};
            params: {};
            query: {
              type?: string | undefined;
              category?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    name: string;
                    category: string;
                    type: string;
                    employeeId: string;
                    endDate: string;
                    file: string;
                    companyId: string;
                    json: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        document: {
          post: {
            body: {
              json?: import("drizzle-typebox").Json | undefined;
              oldId?: number | null | undefined;
              companyId: string;
              employeeId: string;
              name: string;
              type: string;
              category: string;
              endDate: string;
              file: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                json: unknown;
                companyId: string;
                employeeId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                type: string;
                category: string;
                endDate: string;
                file: string;
              };
              401: "Токен олдсонгүй";
              404:
                | "Байгууллагын мэдээлэл олдсонгүй."
                | "Салбарын мэдээлэл олдсонгүй."
                | "Ажилтан олдсонгүй эсвэл эрх хүрэхгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        document: {
          ":id": {
            put: {
              body: {
                json?: import("drizzle-typebox").Json | undefined;
                companyId?: string | undefined;
                employeeId?: string | undefined;
                name?: string | undefined;
                oldId?: number | null | undefined;
                type?: string | undefined;
                category?: string | undefined;
                endDate?: string | undefined;
                file?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  category: string;
                  type: string;
                  employeeId: string;
                  endDate: string;
                  file: string;
                  companyId: string;
                  json: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Ажилтан олдсонгүй эсвэл эрх хүрэхгүй."
                  | "Бичиг баримт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        document: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бичиг баримт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        equipment: {};
      } & {
        equipment: {
          get: {
            body: {};
            params: {};
            query: {
              companyId?: string | undefined;
              employeeId?: string | undefined;
              search?: string | undefined;
              type?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    name: string;
                    type: string;
                    serialNumber: string;
                    employeeId: string;
                    inspectionDate: string;
                    nextInspectionDate: string;
                    location: string | null;
                    companyId: string;
                    file: string;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        equipment: {
          post: {
            body: {
              oldId?: number | null | undefined;
              location?: string | null | undefined;
              companyId: string;
              employeeId: string;
              name: string;
              type: string;
              file: string;
              serialNumber: string;
              inspectionDate: string;
              nextInspectionDate: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string;
                employeeId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                type: string;
                file: string;
                serialNumber: string;
                inspectionDate: string;
                nextInspectionDate: string;
                location: string | null;
              };
              401: "Токен олдсонгүй";
              404:
                | "Байгууллагын мэдээлэл олдсонгүй."
                | "Салбарын мэдээлэл олдсонгүй."
                | "Ажилтан олдсонгүй эсвэл эрх хүрэхгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        equipment: {
          ":id": {
            put: {
              body: {
                companyId?: string | undefined;
                employeeId?: string | undefined;
                name?: string | undefined;
                oldId?: number | null | undefined;
                type?: string | undefined;
                file?: string | undefined;
                serialNumber?: string | undefined;
                inspectionDate?: string | undefined;
                nextInspectionDate?: string | undefined;
                location?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  type: string;
                  serialNumber: string;
                  employeeId: string;
                  inspectionDate: string;
                  nextInspectionDate: string;
                  location: string | null;
                  companyId: string;
                  file: string;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Ажилтан олдсонгүй эсвэл эрх хүрэхгүй."
                  | "Тоног төхөөрөмж олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        equipment: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Тоног төхөөрөмж олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        account: {};
      } & {
        account: {
          get: {
            body: {};
            params: {};
            query: {
              branchId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    account: {
                      companyId: string;
                      branchId: string | null;
                      bank: string;
                      account: string;
                      description: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        account: {
          post: {
            body: {
              branchId?: string | null | undefined;
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              companyId: string;
              account: string;
              bank: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                branchId: string | null;
                companyId: string;
                createdAt: string;
                updatedAt: string;
                account: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
                bank: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        account: {
          ":id": {
            put: {
              body: {
                branchId?: string | null | undefined;
                companyId?: string | undefined;
                account?: string | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                bank?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string | null;
                  bank: string;
                  account: string;
                  description: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Данс олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        account: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Данс олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        "billing-plan": {};
      } & {
        "billing-plan": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              companyId?: string | undefined;
              createdAt?: string | undefined;
              updatedAt?: string | undefined;
              deletedAt?: string | null | undefined;
              oldId?: number | null | undefined;
              note?: string | null | undefined;
              billingPeriod?: "MONTHLY" | "SEASONAL" | "YEARLY" | undefined;
              basePrice?: number | undefined;
              maxCarCount?: number | null | undefined;
              active?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    companyId: string;
                    billingPeriod: "MONTHLY" | "SEASONAL" | "YEARLY";
                    basePrice: number;
                    maxCarCount: number | null;
                    active: boolean;
                    note: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "billing-plan": {
          post: {
            body: {
              oldId?: number | null | undefined;
              note?: string | null | undefined;
              billingPeriod?: "MONTHLY" | "SEASONAL" | "YEARLY" | undefined;
              maxCarCount?: number | null | undefined;
              active?: boolean | undefined;
              companyId: string;
              basePrice: number;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                note: string | null;
                billingPeriod: "MONTHLY" | "SEASONAL" | "YEARLY";
                basePrice: number;
                maxCarCount: number | null;
                active: boolean;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "billing-plan": {
          ":id": {
            put: {
              body: {
                companyId?: string | undefined;
                oldId?: number | null | undefined;
                note?: string | null | undefined;
                billingPeriod?: "MONTHLY" | "SEASONAL" | "YEARLY" | undefined;
                basePrice?: number | undefined;
                maxCarCount?: number | null | undefined;
                active?: boolean | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  billingPeriod: "MONTHLY" | "SEASONAL" | "YEARLY";
                  basePrice: number;
                  maxCarCount: number | null;
                  active: boolean;
                  note: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Төлбөрийн төлөвлөгөө олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "billing-plan": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      company: {
        invoice: {};
      } & {
        invoice: {
          payment: {};
        } & {
          payment: {
            get: {
              body: {};
              params: {};
              query: {
                id?: string | undefined;
                createdAt?: string | undefined;
                updatedAt?: string | undefined;
                deletedAt?: string | null | undefined;
                oldId?: number | null | undefined;
                amount?: number | undefined;
                note?: string | null | undefined;
                paidAt?: string | undefined;
                invoiceId?: string | undefined;
                reference?: string | null | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      totalCount: number;
                      invoiceId: string;
                      amount: number;
                      paidAt: string;
                      reference: string | null;
                      note: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          payment: {
            post: {
              body: {
                oldId?: number | null | undefined;
                note?: string | null | undefined;
                reference?: string | null | undefined;
                amount: number;
                paidAt: string;
                invoiceId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  amount: number;
                  note: string | null;
                  paidAt: string;
                  invoiceId: string;
                  reference: string | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Төлбөрийн баримт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Төлбөр бүртгэх эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          payment: {
            invoice: {
              ":invoiceId": {
                get: {
                  body: {};
                  params: {
                    invoiceId: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      invoiceId: string;
                      amount: number;
                      paidAt: string;
                      reference: string | null;
                      note: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    }[];
                    401: "Токен олдсонгүй";
                    404:
                      | "Байгууллагын мэдээлэл олдсонгүй."
                      | "Салбарын мэдээлэл олдсонгүй."
                      | "Төлбөрийн баримт олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          payment: {
            ":id": {
              put: {
                body: {
                  oldId?: number | null | undefined;
                  amount?: number | undefined;
                  note?: string | null | undefined;
                  paidAt?: string | undefined;
                  invoiceId?: string | undefined;
                  reference?: string | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    invoiceId: string;
                    amount: number;
                    paidAt: string;
                    reference: string | null;
                    note: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Төлбөрийн баримт олдсонгүй."
                    | "Төлбөрийн төлбөр олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна." | "Төлбөр засах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          payment: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Төлбөрийн баримт олдсонгүй."
                    | "Төлбөрийн төлбөр олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна." | "Төлбөр устгах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        invoice: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              companyId?: string | undefined;
              createdAt?: string | undefined;
              updatedAt?: string | undefined;
              deletedAt?: string | null | undefined;
              oldId?: number | null | undefined;
              note?: string | null | undefined;
              status?: "CANCELLED" | "PENDING" | "PAID" | "OVERDUE" | undefined;
              basePrice?: number | undefined;
              billingPlanId?: string | undefined;
              periodStart?: string | undefined;
              periodEnd?: string | undefined;
              carCount?: number | undefined;
              issuedAt?: string | undefined;
              paidAt?: string | null | undefined;
              dueAt?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    invoice: {
                      companyId: string;
                      billingPlanId: string;
                      periodStart: string;
                      periodEnd: string;
                      carCount: number;
                      basePrice: number;
                      status: "CANCELLED" | "PENDING" | "PAID" | "OVERDUE";
                      issuedAt: string;
                      paidAt: string | null;
                      dueAt: string;
                      note: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    billingPlan: {
                      companyId: string;
                      billingPeriod: "MONTHLY" | "SEASONAL" | "YEARLY";
                      basePrice: number;
                      maxCarCount: number | null;
                      active: boolean;
                      note: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    company: {
                      name: string;
                      regNumber: string;
                      phone: string;
                      email: string;
                      serviceName: string;
                      logoUrl: string;
                      province: string | null;
                      district: string | null;
                      khoroo: string | null;
                      street: string | null;
                      socialUrls: string[] | null;
                      ceoName: string | null;
                      webUrl: string | null;
                      googleMapUrl: string | null;
                      isContract: boolean;
                      isNoat: boolean;
                      isNexus: boolean;
                      isActive: boolean;
                      branchCount: number;
                      type:
                        | "AutoService"
                        | "MiningFleet"
                        | "UrbanTransportFleet"
                        | "Long-haul/Logistics"
                        | "Emergency/Medical/Police"
                        | "CorporateFleet";
                      isFranchise: boolean;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        invoice: {
          generate: {
            post: {
              body: {
                note?: string | undefined;
                carCount?: number | undefined;
                companyId: string;
                billingPlanId: string;
                periodStart: string;
                dueAt: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  companyId: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  note: string | null;
                  status: "CANCELLED" | "PENDING" | "PAID" | "OVERDUE";
                  basePrice: number;
                  billingPlanId: string;
                  periodStart: string;
                  periodEnd: string;
                  carCount: number;
                  issuedAt: string;
                  paidAt: string | null;
                  dueAt: string;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Төлбөрийн төлөвлөгөө олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна." | "Төлбөрийн баримт үүсгэх эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        invoice: {
          ":id": {
            put: {
              body: {
                companyId?: string | undefined;
                oldId?: number | null | undefined;
                note?: string | null | undefined;
                status?: "CANCELLED" | "PENDING" | "PAID" | "OVERDUE" | undefined;
                basePrice?: number | undefined;
                billingPlanId?: string | undefined;
                periodStart?: string | undefined;
                periodEnd?: string | undefined;
                carCount?: number | undefined;
                issuedAt?: string | undefined;
                paidAt?: string | null | undefined;
                dueAt?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  billingPlanId: string;
                  periodStart: string;
                  periodEnd: string;
                  carCount: number;
                  basePrice: number;
                  status: "CANCELLED" | "PENDING" | "PAID" | "OVERDUE";
                  issuedAt: string;
                  paidAt: string | null;
                  dueAt: string;
                  note: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Төлбөрийн баримт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        invoice: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      permission: {};
    } & {
      permission: {
        get: {
          body: {};
          params: {};
          query: {};
          headers: {};
          response: {
            200: {
              readonly code: import("./lib/permissions").PermissionCode;
              description: string;
              requiresAdmin?: boolean;
            }[];
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            403: "Хандах эрхгүй байна.";
          };
        };
      };
    } & {
      permission: {
        post: {
          body: {
            userId: string;
            permissions: string[];
          };
          params: {};
          query: {};
          headers: {};
          response: {
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            403: "Хандах эрхгүй байна.";
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
          };
        };
      };
    } & {
      permission: {
        group: {
          get: {
            body: {};
            params: {};
            query: {
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  permissions: {
                    readonly code: import("./lib/permissions").PermissionCode;
                    description: string;
                    requiresAdmin?: boolean;
                  }[];
                  totalCount: number;
                  name: string;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      };
    } & {
      permission: {
        group: {
          post: {
            body: {
              oldId?: number | null | undefined;
              permissions?: string[] | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                permissions: string[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      };
    } & {
      permission: {
        group: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                permissions?: string[] | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  name: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  permissions: string[];
                };
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      permission: {
        group: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: string;
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      user: {};
    } & {
      user: {
        get: {
          body: {};
          params: {};
          query: {
            branchId?: string | undefined;
            banned?: boolean | null | undefined;
            pagination: {
              size: number;
              page: number;
            };
          };
          headers: {};
          response: {
            200: {
              totalCount: number;
              totalPage: number;
              result: {
                permissions: {
                  readonly code: import("./lib/permissions").PermissionCode;
                  description: string;
                  requiresAdmin?: boolean;
                }[];
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                branchId: string;
                kind: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION";
                employeeId: string | null;
                role: string | null;
                banned: boolean | null;
                banReason: string | null;
                banExpires: Date | null;
              }[];
            };
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            403: "Хандах эрхгүй байна.";
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
          };
        };
      };
    } & {
      user: {
        me: {
          get: {
            body: {};
            params: {};
            query: {};
            headers: {};
            response: {
              200: import("./lib/auth").User;
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            };
          };
        };
      };
    } & {
      user: {
        post: {
          body: {
            branchId?: string | undefined;
            kind?: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION" | undefined;
            employeeId?: string | null | undefined;
            password?: string | undefined;
            merchantId?: string | undefined;
            name: string;
            email: string;
            permissions: never[];
          };
          params: {};
          query: {};
          headers: {};
          response: {
            200: {
              id: string;
              email: string;
              name: string;
              image: string | null | undefined;
              emailVerified: boolean;
              createdAt: Date;
              updatedAt: Date;
            };
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            400: string;
            403: "Хандах эрхгүй байна.";
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
            500: "Хэрэглэгч бүртгэхэд алдаа гарлаа.";
          };
        };
      };
    } & {
      user: {
        ":id": {
          put: {
            body: {
              id?: string | undefined;
              branchId?: string | undefined;
              companyId?: string | undefined;
              kind?: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION" | undefined;
              employeeId?: string | null | undefined;
              name?: string | undefined;
              email?: string | undefined;
              emailVerified?: boolean | undefined;
              image?: string | null | undefined;
              createdAt?: Date | undefined;
              updatedAt?: Date | undefined;
              role?: string | null | undefined;
              banned?: boolean | null | undefined;
              banReason?: string | null | undefined;
              banExpires?: Date | null | undefined;
              password?: string | undefined;
              permissions: never[];
            };
            params: {
              id: string;
            };
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                branchId: string;
                kind: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION";
                employeeId: string | null;
                role: string | null;
                banned: boolean | null;
                banReason: string | null;
                banExpires: Date | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      crm: {
        "cp-order": {};
      } & {
        "cp-order": {
          item: {};
        } & {
          item: {
            employee: {};
          } & {
            employee: {
              get: {
                body: {};
                params: {};
                query: {
                  cpOrderItemId: string;
                };
                headers: {};
                response: {
                  200: {
                    cpOrderItemId: string;
                    employeeId: string;
                    amount: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            employee: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  amount?: number | undefined;
                  employeeId: string;
                  cpOrderItemId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    id: string;
                    employeeId: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    amount: number;
                    cpOrderItemId: string;
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: "Энэ үйлчилгээнд ажилтан аль хэдийн хуваарилагдсан байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            employee: {
              ":id": {
                put: {
                  body: {
                    amount?: number | undefined;
                  };
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      cpOrderItemId: string;
                      employeeId: string;
                      amount: number;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    401: "Токен олдсонгүй";
                    404:
                      | "Байгууллагын мэдээлэл олдсонгүй."
                      | "Салбарын мэдээлэл олдсонгүй."
                      | "Ажилтны мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            employee: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      id: string;
                    };
                    401: "Токен олдсонгүй";
                    404:
                      | "Байгууллагын мэдээлэл олдсонгүй."
                      | "Салбарын мэдээлэл олдсонгүй."
                      | "Ажилтны мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          item: {
            get: {
              body: {};
              params: {};
              query: {
                cpOrderId: string;
              };
              headers: {};
              response: {
                200: ({
                  product: {
                    supplierId: string;
                    productId: string | null;
                    name: string;
                    description: string | null;
                    priceSell: number;
                    priceBuy: number;
                    barCode: string | null;
                    oen: string | null;
                    partNumber: string;
                    alias: string | null;
                    companyId: string;
                    type:
                      | "Сэлбэг"
                      | "Тос"
                      | "Дугуй"
                      | "Будаг"
                      | "Аккумлятор"
                      | "Авто гоёл"
                      | "Батерей"
                      | "Задаргаа";
                    quantityUnit: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  service_kind: {
                    serviceKindId: string | null;
                    companyId: string;
                    branchId: string | null;
                    name: string;
                    description: string | null;
                    enabled: boolean;
                    price: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  employee: {
                    companyId: string;
                    branchId: string | null;
                    firstname: string;
                    lastname: string;
                    regNumber: string | null;
                    email: string | null;
                    phone: string;
                    json: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  sp_package: {
                    companyId: string;
                    companyBranchId: string | null;
                    name: string;
                    description: string | null;
                    priceTotal: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  cp_order_sp_package: {
                    cpOrderId: string;
                    spPackageId: string;
                    quantity: number;
                    priceUnit: number;
                    priceTotal: number;
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  cp_order_item: {
                    cpOrderId: string;
                    companyProductId: string | null;
                    companyServiceKindId: string | null;
                    cpOrderSpPackageId: string | null;
                    quantity: number;
                    priceUnit: number;
                    priceTotal: number;
                    name: string | null;
                    description: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  cp_order_item_employee: {
                    cpOrderItemId: string;
                    employeeId: string;
                    amount: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  discount_apply: {
                    discountId: string | null;
                    cpOrderId: string;
                    cpOrderItemId: string | null;
                    valueApplied: number;
                    priceBeforeDiscount: number;
                    priceAfterDiscount: number;
                    note: string | null;
                    authUserId: string;
                    employeeId: string;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                } & {
                  crmCpOrderEmployee: {
                    id: string;
                    employeeName: string;
                    amount: number;
                  }[];
                })[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          item: {
            post: {
              body: {
                name?: string | null | undefined;
                priceUnit?: number | undefined;
                description?: string | null | undefined;
                companyProductId?: string | null | undefined;
                companyServiceKindId?: string | null | undefined;
                cpOrderSpPackageId?: string | null | undefined;
                warehouseId?: string | undefined;
                quantity: number;
                cpOrderId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  name: string | null;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  priceTotal: number;
                  quantity: number;
                  priceUnit: number;
                  description: string | null;
                  companyProductId: string | null;
                  cpOrderId: string;
                  companyServiceKindId: string | null;
                  cpOrderSpPackageId: string | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бараа олдсонгүй."
                  | "Үйлчилгээний төрөл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Үйлчилгээний төрөл эсвэл бараа сонгоно уу.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          item: {
            ":id": {
              put: {
                body: {
                  quantity?: number | undefined;
                  priceUnit?: number | undefined;
                  description?: string | null | undefined;
                  warehouseId?: string | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    cpOrderId: string;
                    companyProductId: string | null;
                    companyServiceKindId: string | null;
                    cpOrderSpPackageId: string | null;
                    quantity: number;
                    priceUnit: number;
                    priceTotal: number;
                    name: string | null;
                    description: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Үйлчилгээ олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          item: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {
                  warehouseId?: string | undefined;
                };
                headers: {};
                response: {
                  200: {
                    cpOrderId: string;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Үйлчилгээ олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: "Багцаас үйлчилгээ устгах боломжгүй.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          payment: {};
        } & {
          payment: {
            ws: {
              subscribe: {
                body: {
                  state: "PENDING" | "PAID" | "CANCELED";
                };
                params: {};
                query: {
                  paymentId: string;
                };
                headers: {};
                response: {
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          payment: {
            post: {
              body: {
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                paymentPackageId?: string | null | undefined;
                pocketOrderNumber?: string | null | undefined;
                state:
                  | "PENDING"
                  | "EXPIRED"
                  | "PAID"
                  | "FAILED"
                  | "REFUNDED"
                  | "NOT_PAID"
                  | "DECLINED"
                  | "CANCELED"
                  | "REFUNDING";
                amount: number;
                paymentMethod:
                  | "CASH"
                  | "BANK_TRANSFER"
                  | "POS_TERMINAL"
                  | "PAYMENT_PACKAGE"
                  | "CARD";
                paymentChannel: string;
                cpOrderId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  state:
                    | "PENDING"
                    | "EXPIRED"
                    | "PAID"
                    | "FAILED"
                    | "REFUNDED"
                    | "NOT_PAID"
                    | "DECLINED"
                    | "CANCELED"
                    | "REFUNDING";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  amount: number;
                  paymentMethod:
                    | "CASH"
                    | "BANK_TRANSFER"
                    | "POS_TERMINAL"
                    | "PAYMENT_PACKAGE"
                    | "CARD";
                  paymentChannel: string;
                  description: string | null;
                  cpOrderId: string;
                  paymentPackageId: string | null;
                  invoiceNumber: string | null;
                  pocketOrderNumber: string | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          payment: {
            ":id": {
              put: {
                body: {
                  description?: string | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Нэхэмжлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          payment: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          payment: {
            storepay: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  paymentPackageId?: string | null | undefined;
                  pocketOrderNumber?: string | null | undefined;
                  amount: number;
                  phone: number;
                  cpOrderId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    state:
                      | "PENDING"
                      | "EXPIRED"
                      | "PAID"
                      | "FAILED"
                      | "REFUNDED"
                      | "NOT_PAID"
                      | "DECLINED"
                      | "CANCELED"
                      | "REFUNDING";
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    amount: number;
                    paymentMethod:
                      | "CASH"
                      | "BANK_TRANSFER"
                      | "POS_TERMINAL"
                      | "PAYMENT_PACKAGE"
                      | "CARD";
                    paymentChannel: string;
                    description: string | null;
                    cpOrderId: string;
                    paymentPackageId: string | null;
                    invoiceNumber: string | null;
                    pocketOrderNumber: string | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Төлбөрийн тохиргоо олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: string;
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                  500: "Сервер алдаа гарлаа";
                };
              };
            };
          };
        } & {
          payment: {
            storepay: {
              ":id": {
                get: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    404: "Төлбөрийн тохиргоо олдсонгүй." | "Төлбөрийн мэдээлэл олдсонгүй.";
                    400: string;
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                    500: "Сервер алдаа гарлаа";
                  };
                };
              };
            };
          };
        } & {
          payment: {
            ubpay: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  paymentPackageId?: string | null | undefined;
                  pocketOrderNumber?: string | null | undefined;
                  state:
                    | "PENDING"
                    | "EXPIRED"
                    | "PAID"
                    | "FAILED"
                    | "REFUNDED"
                    | "NOT_PAID"
                    | "DECLINED"
                    | "CANCELED"
                    | "REFUNDING";
                  amount: number;
                  paymentMethod:
                    | "CASH"
                    | "BANK_TRANSFER"
                    | "POS_TERMINAL"
                    | "PAYMENT_PACKAGE"
                    | "CARD";
                  paymentChannel: string;
                  cpOrderId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    qrCode: string;
                    state:
                      | "PENDING"
                      | "EXPIRED"
                      | "PAID"
                      | "FAILED"
                      | "REFUNDED"
                      | "NOT_PAID"
                      | "DECLINED"
                      | "CANCELED"
                      | "REFUNDING";
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    amount: number;
                    paymentMethod:
                      | "CASH"
                      | "BANK_TRANSFER"
                      | "POS_TERMINAL"
                      | "PAYMENT_PACKAGE"
                      | "CARD";
                    paymentChannel: string;
                    description: string | null;
                    cpOrderId: string;
                    paymentPackageId: string | null;
                    invoiceNumber: string | null;
                    pocketOrderNumber: string | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Төлбөрийн тохиргоо олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: string;
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                  500: "Сервер алдаа гарлаа";
                };
              };
            };
          };
        } & {
          payment: {
            ubpay: {
              test: {
                ":id": {
                  post: {
                    body: {};
                    params: {
                      id: string;
                    };
                    query: {};
                    headers: {};
                    response: {
                      200: string;
                      422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                      };
                    };
                  };
                };
              };
            };
          };
        } & {
          payment: {
            ubpay: {
              ":id": {
                post: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    404: "Төлбөрийн тохиргоо олдсонгүй." | "Төлбөрийн мэдээлэл олдсонгүй.";
                    400: string;
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                    500: "Сервер алдаа гарлаа";
                  };
                };
              };
            };
          };
        } & {
          payment: {
            qpay: {
              ":id": {
                get: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    404: "Төлбөрийн тохиргоо олдсонгүй." | "Төлбөрийн мэдээлэл олдсонгүй.";
                    400: string;
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                    500: "Сервер алдаа гарлаа";
                  };
                };
              };
            };
          };
        } & {
          payment: {
            qpay: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  paymentPackageId?: string | null | undefined;
                  pocketOrderNumber?: string | null | undefined;
                  state:
                    | "PENDING"
                    | "EXPIRED"
                    | "PAID"
                    | "FAILED"
                    | "REFUNDED"
                    | "NOT_PAID"
                    | "DECLINED"
                    | "CANCELED"
                    | "REFUNDING";
                  amount: number;
                  paymentMethod:
                    | "CASH"
                    | "BANK_TRANSFER"
                    | "POS_TERMINAL"
                    | "PAYMENT_PACKAGE"
                    | "CARD";
                  paymentChannel: string;
                  cpOrderId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    qrCode: string;
                    state:
                      | "PENDING"
                      | "EXPIRED"
                      | "PAID"
                      | "FAILED"
                      | "REFUNDED"
                      | "NOT_PAID"
                      | "DECLINED"
                      | "CANCELED"
                      | "REFUNDING";
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    amount: number;
                    paymentMethod:
                      | "CASH"
                      | "BANK_TRANSFER"
                      | "POS_TERMINAL"
                      | "PAYMENT_PACKAGE"
                      | "CARD";
                    paymentChannel: string;
                    description: string | null;
                    cpOrderId: string;
                    paymentPackageId: string | null;
                    invoiceNumber: string | null;
                    pocketOrderNumber: string | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Төлбөрийн тохиргоо олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: string;
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                  500: "Сервер алдаа гарлаа";
                };
              };
            };
          };
        } & {
          payment: {
            pocket: {
              ":id": {
                get: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    400: string;
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                    500: "Сервер алдаа гарлаа";
                  };
                };
              };
            };
          };
        } & {
          payment: {
            pocket: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  paymentPackageId?: string | null | undefined;
                  pocketOrderNumber?: string | null | undefined;
                  state:
                    | "PENDING"
                    | "EXPIRED"
                    | "PAID"
                    | "FAILED"
                    | "REFUNDED"
                    | "NOT_PAID"
                    | "DECLINED"
                    | "CANCELED"
                    | "REFUNDING";
                  amount: number;
                  paymentMethod:
                    | "CASH"
                    | "BANK_TRANSFER"
                    | "POS_TERMINAL"
                    | "PAYMENT_PACKAGE"
                    | "CARD";
                  paymentChannel: string;
                  cpOrderId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  [x: number]: {};
                };
              };
            };
          };
        } & {
          payment: {
            pocket: {
              webhook: {
                post: {
                  body: {
                    orderNumber: string;
                  };
                  params: {};
                  query: {};
                  headers: {};
                  response: {
                    400: string;
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                    500: "Сервер алдаа гарлаа";
                  };
                };
              };
            };
          };
        } & {
          payment: {
            "payment-data": {
              get: {
                body: {};
                params: {};
                query: {
                  date?: string | undefined;
                  companyId?: string | undefined;
                  channel?: string | undefined;
                };
                headers: {};
                response: {
                  200: {
                    payments: {
                      cp_order: {
                        companyId: string;
                        companyBranchId: string;
                        customerId: string | null;
                        vehicleId: string | null;
                        orderId: string;
                        state: "CREATED" | "PROGRESSING" | "COMPLETE";
                        isNoat: boolean | null;
                        timeCompleted: string | null;
                        km: number;
                        type: "Service" | "ProductSell";
                        description: string | null;
                        nextServiceDate: string | null;
                        isQualityCheck: boolean;
                        repeatedOrderId: string | null;
                        repeatedCheckList: unknown;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      cp_order_payment: {
                        cpOrderId: string;
                        paymentPackageId: string | null;
                        paymentMethod:
                          | "CASH"
                          | "BANK_TRANSFER"
                          | "POS_TERMINAL"
                          | "PAYMENT_PACKAGE"
                          | "CARD";
                        paymentChannel: string;
                        amount: number;
                        state:
                          | "PENDING"
                          | "EXPIRED"
                          | "PAID"
                          | "FAILED"
                          | "REFUNDED"
                          | "NOT_PAID"
                          | "DECLINED"
                          | "CANCELED"
                          | "REFUNDING";
                        invoiceNumber: string | null;
                        description: string | null;
                        pocketOrderNumber: string | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                    }[];
                    totalAmount: string | number;
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          payment: {
            info: {
              get: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    payment: {
                      accessToken: string | null;
                      refreshToken: string | null;
                      companyId: string;
                      expiresIn: number | null;
                      refreshExpiresIn: number | null;
                      branchId: string | null;
                      type: "StorePay" | "Qpay" | "MinuPos" | "UbPay";
                      sub: unknown;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    company: {
                      name: string;
                      regNumber: string;
                      phone: string;
                      email: string;
                      serviceName: string;
                      logoUrl: string;
                      province: string | null;
                      district: string | null;
                      khoroo: string | null;
                      street: string | null;
                      socialUrls: string[] | null;
                      ceoName: string | null;
                      webUrl: string | null;
                      googleMapUrl: string | null;
                      isContract: boolean;
                      isNoat: boolean;
                      isNexus: boolean;
                      isActive: boolean;
                      branchCount: number;
                      type:
                        | "AutoService"
                        | "MiningFleet"
                        | "UrbanTransportFleet"
                        | "Long-haul/Logistics"
                        | "Emergency/Medical/Police"
                        | "CorporateFleet";
                      isFranchise: boolean;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    branch: {
                      name: string;
                      phone: string;
                      logoUrl: string;
                      email: string | null;
                      regNumber: string | null;
                      province: string | null;
                      district: string | null;
                      khoroo: string | null;
                      street: string | null;
                      socialUrls: string[] | null;
                      ceoName: string | null;
                      googleMapUrl: string | null;
                      isNoat: boolean;
                      isActive: boolean;
                      packageId: string;
                      merchantId: string;
                      isFranchise: boolean;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                };
              };
            };
          };
        } & {
          payment: {
            info: {
              post: {
                body:
                  | {
                      branchId?: string | undefined;
                      companyId: string;
                      sub: {
                        password: string;
                        username: string;
                        appUserName: string;
                        appPassword: string;
                        storeId: string;
                      };
                      type: "StorePay";
                    }
                  | {
                      branchId?: string | undefined;
                      companyId: string;
                      sub: {
                        clientId: string;
                        clientSecret: string;
                      };
                      type: "UbPay";
                    }
                  | {
                      branchId?: string | undefined;
                      companyId: string;
                      sub: {
                        password: string;
                        username: string;
                        invoiceCode: string;
                      };
                      type: "Qpay";
                    };
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    accessToken: string | null;
                    id: string;
                    branchId: string | null;
                    companyId: string;
                    sub: unknown;
                    createdAt: string;
                    updatedAt: string;
                    refreshToken: string | null;
                    deletedAt: string | null;
                    oldId: number | null;
                    type: "StorePay" | "Qpay" | "MinuPos" | "UbPay";
                    expiresIn: number | null;
                    refreshExpiresIn: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          payment: {
            info: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          get: {
            body: {};
            params: {};
            query: {
              state?: "CREATED" | "PROGRESSING" | "COMPLETE" | undefined;
              model?: string | undefined;
              id?: string | undefined;
              branchId?: string | undefined;
              createdAt?: string | undefined;
              oldId?: number | undefined;
              type?: "Service" | "ProductSell" | undefined;
              phone?: string | undefined;
              vehicleId?: string | undefined;
              licensePlate?: string | undefined;
              vin?: string | undefined;
              orderId?: string | undefined;
              timeCompleted?: string | undefined;
              isPaid?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  order: {
                    companyId: string;
                    companyBranchId: string;
                    customerId: string | null;
                    vehicleId: string | null;
                    orderId: string;
                    state: "CREATED" | "PROGRESSING" | "COMPLETE";
                    isNoat: boolean | null;
                    timeCompleted: string | null;
                    km: number;
                    type: "Service" | "ProductSell";
                    description: string | null;
                    nextServiceDate: string | null;
                    isQualityCheck: boolean;
                    repeatedOrderId: string | null;
                    repeatedCheckList: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  vehicle: {
                    customerId: string | null;
                    vehicleKindId: string;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    companyId: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  make: {
                    vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                    parentId: string | null;
                    name: string;
                    description: string | null;
                    yearStart: number | null;
                    yearEnd: number | null;
                    imagePath: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  model: {
                    vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                    parentId: string | null;
                    name: string;
                    description: string | null;
                    yearStart: number | null;
                    yearEnd: number | null;
                    imagePath: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  customer: {
                    companyId: string | null;
                    firstname: string | null;
                    lastname: string | null;
                    phoneNumber: string;
                    email: string | null;
                    regNum: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  isDeleteAble: unknown;
                  totalAmount: number;
                  paidAmount: number;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "cp-order": {
          post: {
            body: {
              phone?: string | undefined;
              licensePlate?: string | undefined;
              vin?: string | undefined;
              vehicleKindId?: string | undefined;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  order: {
                    companyId: string;
                    companyBranchId: string;
                    customerId: string | null;
                    vehicleId: string | null;
                    orderId: string;
                    state: "CREATED" | "PROGRESSING" | "COMPLETE";
                    isNoat: boolean | null;
                    timeCompleted: string | null;
                    km: number;
                    type: "Service" | "ProductSell";
                    description: string | null;
                    nextServiceDate: string | null;
                    isQualityCheck: boolean;
                    repeatedOrderId: string | null;
                    repeatedCheckList: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  vehicle: {
                    customerId: string | null;
                    vehicleKindId: string;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    companyId: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  make: {
                    vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                    parentId: string | null;
                    name: string;
                    description: string | null;
                    yearStart: number | null;
                    yearEnd: number | null;
                    imagePath: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  model: {
                    vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                    parentId: string | null;
                    name: string;
                    description: string | null;
                    yearStart: number | null;
                    yearEnd: number | null;
                    imagePath: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  customer: {
                    companyId: string | null;
                    firstname: string | null;
                    lastname: string | null;
                    phoneNumber: string;
                    email: string | null;
                    regNum: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  isDeleteAble: unknown;
                  totalAmount: number;
                  paidAmount: number;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              400:
                | "Машины дугаар болон VIN хоёроос нэгийг нь оруулна уу."
                | "Машины VIN оруулсан бол машины төрөл оруулна уу.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
              502: string;
            };
          };
        };
      } & {
        "cp-order": {
          sell: {
            post: {
              body: {
                customerId?: string | undefined;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  state: "CREATED" | "PROGRESSING" | "COMPLETE";
                  id: string;
                  companyId: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  customerId: string | null;
                  type: "Service" | "ProductSell";
                  description: string | null;
                  isNoat: boolean | null;
                  companyBranchId: string;
                  vehicleId: string | null;
                  km: number;
                  orderId: string;
                  timeCompleted: string | null;
                  nextServiceDate: string | null;
                  isQualityCheck: boolean;
                  repeatedOrderId: string | null;
                  repeatedCheckList: unknown;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          package: {
            post: {
              body: {
                warehouseId?: string | undefined;
                quantity: number;
                spPackageId: string;
                cpOrderId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Багцийн үйлчилгээ олдсонгүй."
                  | "Засвар үйлчилгээ олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Суурь багцад бараа эсвэл үйлчилгээ байхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          package: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Багц олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          complete: {
            post: {
              body: {
                id: string;
                km: number;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  companyBranchId: string;
                  customerId: string | null;
                  vehicleId: string | null;
                  orderId: string;
                  state: "CREATED" | "PROGRESSING" | "COMPLETE";
                  isNoat: boolean | null;
                  timeCompleted: string | null;
                  km: number;
                  type: "Service" | "ProductSell";
                  description: string | null;
                  nextServiceDate: string | null;
                  isQualityCheck: boolean;
                  repeatedOrderId: string | null;
                  repeatedCheckList: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Засвар үйлчилгээ олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          delete: {
            post: {
              body: {};
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              };
            };
          };
        };
      } & {
        "cp-order": {
          ":id": {
            put: {
              body: {
                state?: "CREATED" | "PROGRESSING" | "COMPLETE" | undefined;
                companyId?: string | undefined;
                createdAt?: string | undefined;
                oldId?: number | null | undefined;
                customerId?: string | null | undefined;
                type?: "Service" | "ProductSell" | undefined;
                description?: string | null | undefined;
                isNoat?: boolean | null | undefined;
                companyBranchId?: string | undefined;
                vehicleId?: string | null | undefined;
                km?: number | undefined;
                orderId?: string | undefined;
                timeCompleted?: string | null | undefined;
                nextServiceDate?: string | null | undefined;
                isQualityCheck?: boolean | undefined;
                repeatedOrderId?: string | null | undefined;
                repeatedCheckList?: import("drizzle-typebox").Json | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  companyBranchId: string;
                  customerId: string | null;
                  vehicleId: string | null;
                  orderId: string;
                  state: "CREATED" | "PROGRESSING" | "COMPLETE";
                  isNoat: boolean | null;
                  timeCompleted: string | null;
                  km: number;
                  type: "Service" | "ProductSell";
                  description: string | null;
                  nextServiceDate: string | null;
                  isQualityCheck: boolean;
                  repeatedOrderId: string | null;
                  repeatedCheckList: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Засвар үйлчилгээ олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Засвар үйлчилгээ олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Үйлчилгээ хоосон биш байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "cp-order": {
          ":id": {
            payment: {
              get: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    payments: {
                      cpOrderId: string;
                      paymentPackageId: string | null;
                      paymentMethod:
                        | "CASH"
                        | "BANK_TRANSFER"
                        | "POS_TERMINAL"
                        | "PAYMENT_PACKAGE"
                        | "CARD";
                      paymentChannel: string;
                      amount: number;
                      state:
                        | "PENDING"
                        | "EXPIRED"
                        | "PAID"
                        | "FAILED"
                        | "REFUNDED"
                        | "NOT_PAID"
                        | "DECLINED"
                        | "CANCELED"
                        | "REFUNDING";
                      invoiceNumber: string | null;
                      description: string | null;
                      pocketOrderNumber: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    }[];
                    totalAmount: number;
                    paidAmount: number;
                    totalAppliedDiscount: number;
                    discounts: {
                      apply: {
                        discountId: string | null;
                        cpOrderId: string;
                        cpOrderItemId: string | null;
                        valueApplied: number;
                        priceBeforeDiscount: number;
                        priceAfterDiscount: number;
                        note: string | null;
                        authUserId: string;
                        employeeId: string;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      discount: {
                        companyId: string;
                        name: string;
                        description: string | null;
                        applyType: "ORDER" | "ITEM";
                        discountType: "PERCENTAGE" | "FIXED";
                        amount: number;
                        state: "CREATED" | "ACTIVE" | "ARCHIVED";
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      item: {
                        cpOrderId: string;
                        companyProductId: string | null;
                        companyServiceKindId: string | null;
                        cpOrderSpPackageId: string | null;
                        quantity: number;
                        priceUnit: number;
                        priceTotal: number;
                        name: string | null;
                        description: string | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                    }[];
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        "sp-package": {};
      } & {
        "sp-package": {
          service: {};
        } & {
          service: {
            get: {
              body: {};
              params: {};
              query: {
                spPackageId: string;
              };
              headers: {};
              response: {
                200: {
                  kind: {
                    serviceKindId: string | null;
                    companyId: string;
                    branchId: string | null;
                    name: string;
                    description: string | null;
                    enabled: boolean;
                    price: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  spPackageId: string;
                  kindId: string;
                  quantity: number;
                  priceUnit: number;
                  priceTotal: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          service: {
            post: {
              body: {
                oldId?: number | null | undefined;
                priceTotal?: number | undefined;
                quantity: number;
                priceUnit: number;
                spPackageId: string;
                kindId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  priceTotal: number;
                  quantity: number;
                  priceUnit: number;
                  spPackageId: string;
                  kindId: string;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          service: {
            many: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  priceTotal?: number | undefined;
                  quantity: number;
                  priceUnit: number;
                  spPackageId: string;
                  kindId: string;
                }[];
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: "Үйлчилгээ оруулах мэдээлэл байхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          service: {
            ":id": {
              put: {
                body: {
                  oldId?: number | null | undefined;
                  priceTotal?: number | undefined;
                  quantity?: number | undefined;
                  priceUnit?: number | undefined;
                  spPackageId?: string | undefined;
                  kindId?: string | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    spPackageId: string;
                    kindId: string;
                    quantity: number;
                    priceUnit: number;
                    priceTotal: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Үйлчилгээ олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          service: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        "sp-package": {
          product: {};
        } & {
          product: {
            get: {
              body: {};
              params: {};
              query: {
                spPackageId: string;
              };
              headers: {};
              response: {
                200: {
                  warehouseProductTable: {
                    supplierId: string;
                    productId: string | null;
                    name: string;
                    description: string | null;
                    priceSell: number;
                    priceBuy: number;
                    barCode: string | null;
                    oen: string | null;
                    partNumber: string;
                    alias: string | null;
                    companyId: string;
                    type:
                      | "Сэлбэг"
                      | "Тос"
                      | "Дугуй"
                      | "Будаг"
                      | "Аккумлятор"
                      | "Авто гоёл"
                      | "Батерей"
                      | "Задаргаа";
                    quantityUnit: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  spPackageId: string;
                  companyProductId: string;
                  quantity: number;
                  priceUnit: number;
                  priceTotal: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          product: {
            post: {
              body: {
                oldId?: number | null | undefined;
                quantity: number;
                priceUnit: number;
                spPackageId: string;
                companyProductId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  priceTotal: number;
                  quantity: number;
                  priceUnit: number;
                  spPackageId: string;
                  companyProductId: string;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          product: {
            many: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  quantity: number;
                  priceUnit: number;
                  spPackageId: string;
                  companyProductId: string;
                }[];
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: "Бүтээгдэхүүн оруулах мэдээлэл байхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          product: {
            ":id": {
              put: {
                body: {
                  oldId?: number | null | undefined;
                  priceTotal?: number | undefined;
                  quantity?: number | undefined;
                  priceUnit?: number | undefined;
                  spPackageId?: string | undefined;
                  companyProductId?: string | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    spPackageId: string;
                    companyProductId: string;
                    quantity: number;
                    priceUnit: number;
                    priceTotal: number;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Үйлчилгээний багцын бүтээгдэхүүн олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          product: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        "sp-package": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              priceTotal?: number | undefined;
              companyBranchId?: string | null | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  branch: {
                    name: string;
                    phone: string;
                    logoUrl: string;
                    email: string | null;
                    regNumber: string | null;
                    province: string | null;
                    district: string | null;
                    khoroo: string | null;
                    street: string | null;
                    socialUrls: string[] | null;
                    ceoName: string | null;
                    googleMapUrl: string | null;
                    isNoat: boolean;
                    isActive: boolean;
                    packageId: string;
                    merchantId: string;
                    isFranchise: boolean;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  companyId: string;
                  companyBranchId: string | null;
                  name: string;
                  description: string | null;
                  priceTotal: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "sp-package": {
          post: {
            body: {
              oldId?: number | null | undefined;
              priceTotal?: number | undefined;
              description?: string | null | undefined;
              companyBranchId?: string | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                priceTotal: number;
                description: string | null;
                companyBranchId: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "sp-package": {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                priceTotal?: number | undefined;
                description?: string | null | undefined;
                companyBranchId?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  companyBranchId: string | null;
                  name: string;
                  description: string | null;
                  priceTotal: number;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Багцийн үйлчилгээ олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "sp-package": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        vehicle: {
          get: {
            body: unknown;
            params: {};
            query: {
              licensePlate: string;
            };
            headers: unknown;
            response: {
              200: {
                plate_no: string;
                cabin_no: string;
                imported_date: string;
                build_year: string;
                mark_name: string;
                model_name: string;
                purpose_name: string;
                color_name: string;
                engine_model_name: string;
                fuel_type_name: string;
                capacity?: string;
                owner_id: string;
                borrower_id: null;
              };
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
              502: string;
            };
          };
        };
      } & {
        vehicle: {
          many: {
            post: {
              body: {
                licensePlate: string[];
              };
              params: {};
              query: unknown;
              headers: unknown;
              response: {
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        vehicle: {
          get: {
            post: {
              body: {
                licensePlate: string[];
              };
              params: {};
              query: unknown;
              headers: unknown;
              response: {
                200: {
                  id: string;
                  licensePlate: string | null;
                  yearImported: number | null;
                  yearManufactured: number | null;
                  vin: string | null;
                  model: string | null;
                  gas: string | null;
                  cc: string | null;
                }[];
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        vehicle: {
          fleet: {};
        };
      } & {
        vehicle: {
          fleet: {
            get: {
              body: {};
              params: {};
              query: {
                id?: string | undefined;
                licensePlate?: string | undefined;
                vin?: string | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: {
                    vehicle: {
                      customerId: string | null;
                      vehicleKindId: string;
                      vin: string | null;
                      licensePlate: string | null;
                      color: string | null;
                      engineCc: string | null;
                      cylinder: string | null;
                      gasType: string | null;
                      transmissionType: string | null;
                      vehicleType: string | null;
                      yearManufacture: number | null;
                      yearImport: number | null;
                      steering: string | null;
                      engineCode: string | null;
                      transmissionCode: string | null;
                      driveTrain: string | null;
                      km: number;
                      customData: unknown;
                      companyId: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    make: {
                      vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                      parentId: string | null;
                      name: string;
                      description: string | null;
                      yearStart: number | null;
                      yearEnd: number | null;
                      imagePath: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    model: {
                      vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                      parentId: string | null;
                      name: string;
                      description: string | null;
                      yearStart: number | null;
                      yearEnd: number | null;
                      imagePath: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                  }[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        vehicle: {
          fleet: {
            post: {
              body: {
                customerId?: string | undefined;
                licensePlate?: string | undefined;
                vin?: string | undefined;
                vehicleKindId?: string | undefined;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  companyId: string | null;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  customerId: string | null;
                  licensePlate: string | null;
                  vin: string | null;
                  color: string | null;
                  engineCc: string | null;
                  cylinder: string | null;
                  gasType: string | null;
                  transmissionType: string | null;
                  vehicleType: string | null;
                  yearManufacture: number | null;
                  yearImport: number | null;
                  steering: string | null;
                  engineCode: string | null;
                  transmissionCode: string | null;
                  driveTrain: string | null;
                  km: number;
                  customData: unknown;
                  vehicleKindId: string;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400:
                  | "Машины дугаар болон VIN хоёроос нэгийг нь оруулна уу."
                  | "Машины VIN оруулсан бол машины төрөл оруулна уу.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
                502: string;
              };
            };
          };
        };
      } & {
        vehicle: {
          fleet: {
            ":id": {
              get: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    vehicle: {
                      customerId: string | null;
                      vehicleKindId: string;
                      vin: string | null;
                      licensePlate: string | null;
                      color: string | null;
                      engineCc: string | null;
                      cylinder: string | null;
                      gasType: string | null;
                      transmissionType: string | null;
                      vehicleType: string | null;
                      yearManufacture: number | null;
                      yearImport: number | null;
                      steering: string | null;
                      engineCode: string | null;
                      transmissionCode: string | null;
                      driveTrain: string | null;
                      km: number;
                      customData: unknown;
                      companyId: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    customer: {
                      companyId: string | null;
                      firstname: string | null;
                      lastname: string | null;
                      phoneNumber: string;
                      email: string | null;
                      regNum: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    make: {
                      vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                      parentId: string | null;
                      name: string;
                      description: string | null;
                      yearStart: number | null;
                      yearEnd: number | null;
                      imagePath: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    model: {
                      vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                      parentId: string | null;
                      name: string;
                      description: string | null;
                      yearStart: number | null;
                      yearEnd: number | null;
                      imagePath: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Тээврийн хэрэгсэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        vehicle: {
          fleet: {
            ":id": {
              put: {
                body: {
                  companyId?: string | null | undefined;
                  oldId?: number | null | undefined;
                  customerId?: string | null | undefined;
                  licensePlate?: string | null | undefined;
                  vin?: string | null | undefined;
                  color?: string | null | undefined;
                  engineCc?: string | null | undefined;
                  cylinder?: string | null | undefined;
                  gasType?: string | null | undefined;
                  transmissionType?: string | null | undefined;
                  vehicleType?: string | null | undefined;
                  yearManufacture?: number | null | undefined;
                  yearImport?: number | null | undefined;
                  steering?: string | null | undefined;
                  engineCode?: string | null | undefined;
                  transmissionCode?: string | null | undefined;
                  driveTrain?: string | null | undefined;
                  km?: number | undefined;
                  customData?: import("drizzle-typebox").Json | undefined;
                  vehicleKindId?: string | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    customerId: string | null;
                    vehicleKindId: string;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    companyId: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Тээврийн хэрэгсэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        vehicle: {
          fleet: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    customerId: string | null;
                    vehicleKindId: string;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    companyId: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Тээврийн хэрэгсэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        customer: {};
      } & {
        customer: {
          get: {
            body: {};
            params: {};
            query: {
              phone?: string | undefined;
              cpOrderSegment?: "new" | "regular" | "loyal" | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  customer: {
                    companyId: string | null;
                    firstname: string | null;
                    lastname: string | null;
                    phoneNumber: string;
                    email: string | null;
                    regNum: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  vehicles: {
                    id: string;
                    companyId: string | null;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    customerId: string | null;
                    licensePlate: string | null;
                    vin: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    vehicleKindId: string;
                  }[];
                  cpOrders: {
                    id: string;
                    createdAt: string;
                    customerId: string;
                    type: "Service" | "ProductSell";
                  }[];
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        customer: {
          post: {
            body: {
              companyId?: string | null | undefined;
              email?: string | null | undefined;
              oldId?: number | null | undefined;
              firstname?: string | null | undefined;
              lastname?: string | null | undefined;
              regNum?: string | null | undefined;
              phoneNumber: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                companyId: string | null;
                email: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                firstname: string | null;
                lastname: string | null;
                phoneNumber: string;
                regNum: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        customer: {
          ":id": {
            put: {
              body: {
                companyId?: string | null | undefined;
                email?: string | null | undefined;
                oldId?: number | null | undefined;
                firstname?: string | null | undefined;
                lastname?: string | null | undefined;
                phoneNumber?: string | undefined;
                regNum?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string | null;
                  firstname: string | null;
                  lastname: string | null;
                  phoneNumber: string;
                  email: string | null;
                  regNum: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Хэрэглэгч олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        dashboard: {};
      } & {
        dashboard: {
          admin: {};
        } & {
          admin: {
            "vehicle-count": {
              get: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  200: number;
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                };
              };
            };
          };
        } & {
          admin: {
            "ub-cab-inspection-count": {
              get: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  200: number;
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                };
              };
            };
          };
        } & {
          admin: {
            "warehouse-product-count": {
              get: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  200: number;
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                };
              };
            };
          };
        } & {
          admin: {
            "warehouse-item-amount": {
              get: {
                body: {};
                params: {};
                query: {
                  isFranchise?: boolean | undefined;
                  warehouseId?: string | undefined;
                  productType?:
                    | "Сэлбэг"
                    | "Тос"
                    | "Дугуй"
                    | "Будаг"
                    | "Аккумлятор"
                    | "Авто гоёл"
                    | "Батерей"
                    | "Задаргаа"
                    | undefined;
                };
                headers: {};
                response: {
                  200: number;
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          admin: {
            "vehicle-model-list": {
              get: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    model: string;
                    count: number;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                };
              };
            };
          };
        } & {
          admin: {
            "cp-order-item-total-amount-by-month": {
              get: {
                body: {};
                params: {};
                query: {
                  branchId?: string | undefined;
                  isFranchise?: boolean | undefined;
                };
                headers: {};
                response: {
                  200: {
                    amount: number;
                    month: string;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          admin: {
            "cp-order-count-by-month": {
              get: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    count: number;
                    month: string;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "car-count": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  count: number;
                  month: string;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "cp-order-count": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  count: number;
                  month: string;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "cp-order-service-count": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  count: number;
                  month: string;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "cp-order-total-amount": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  amount: number;
                  month: string;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "most-sold-products": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  quantity: number;
                  product: {
                    id: string;
                    name: string;
                    partNumber: string;
                  };
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "most-sold-services": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  quantity: number;
                  service: {
                    id: string;
                    name: string;
                  };
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "most-sold-vehicles": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  quantity: number;
                  vehicleKind: {
                    id: string;
                    name: string;
                  };
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        dashboard: {
          "daily-sales": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  amount: number;
                  date: string;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        discount: {};
      } & {
        discount: {
          get: {
            body: {};
            params: {};
            query: {
              state?: "CREATED" | "ACTIVE" | "ARCHIVED" | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  discount: {
                    state: "CREATED" | "ACTIVE" | "ARCHIVED";
                    id: string;
                    companyId: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    amount: number;
                    description: string | null;
                    applyType: "ORDER" | "ITEM";
                    discountType: "PERCENTAGE" | "FIXED";
                  };
                  conditions: {
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    discountId: string;
                    conditionType:
                      | "MIN_TOTAL"
                      | "PRODUCT_CATEGORY"
                      | "CUSTOMER_GROUP"
                      | "PAYMENT_METHOD"
                      | "DATE_RANGE"
                      | "ITEM_QUANTITY"
                      | "COUPON_CODE";
                    conditionValue: unknown;
                  }[];
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        discount: {
          post: {
            body: {
              state?: "CREATED" | "ACTIVE" | "ARCHIVED" | undefined;
              oldId?: number | null | undefined;
              amount?: number | undefined;
              description?: string | null | undefined;
              companyId: string;
              name: string;
              applyType: "ORDER" | "ITEM";
              discountType: "PERCENTAGE" | "FIXED";
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state: "CREATED" | "ACTIVE" | "ARCHIVED";
                id: string;
                companyId: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                amount: number;
                description: string | null;
                applyType: "ORDER" | "ITEM";
                discountType: "PERCENTAGE" | "FIXED";
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        discount: {
          ":id": {
            put: {
              body: {
                state?: "CREATED" | "ACTIVE" | "ARCHIVED" | undefined;
                companyId?: string | undefined;
                name?: string | undefined;
                oldId?: number | null | undefined;
                amount?: number | undefined;
                description?: string | null | undefined;
                applyType?: "ORDER" | "ITEM" | undefined;
                discountType?: "PERCENTAGE" | "FIXED" | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  name: string;
                  description: string | null;
                  applyType: "ORDER" | "ITEM";
                  discountType: "PERCENTAGE" | "FIXED";
                  amount: number;
                  state: "CREATED" | "ACTIVE" | "ARCHIVED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Хөнгөлөлт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        discount: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  state: "CREATED" | "ACTIVE" | "ARCHIVED";
                  id: string;
                  companyId: string;
                  name: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  amount: number;
                  description: string | null;
                  applyType: "ORDER" | "ITEM";
                  discountType: "PERCENTAGE" | "FIXED";
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Хөнгөлөлт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        discount: {
          condition: {
            post: {
              body: {
                oldId?: number | null | undefined;
                discountId: string;
                conditionType:
                  | "MIN_TOTAL"
                  | "PRODUCT_CATEGORY"
                  | "CUSTOMER_GROUP"
                  | "PAYMENT_METHOD"
                  | "DATE_RANGE"
                  | "ITEM_QUANTITY"
                  | "COUPON_CODE";
                conditionValue: import("drizzle-typebox").Json &
                  (
                    | {
                        timeStart: string;
                        timeEnd: string;
                      }
                    | {
                        cpOrderItemId?: string | undefined;
                        amount: number;
                      }
                    | {
                        categoryId: string;
                      }
                    | {
                        groupId: string;
                      }
                    | {
                        cpOrderItemId?: string | undefined;
                        minQuantity: number;
                      }
                    | {
                        code: string;
                      }
                    | {
                        paymentMethod: string;
                      }
                  );
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  discountId: string;
                  conditionType:
                    | "MIN_TOTAL"
                    | "PRODUCT_CATEGORY"
                    | "CUSTOMER_GROUP"
                    | "PAYMENT_METHOD"
                    | "DATE_RANGE"
                    | "ITEM_QUANTITY"
                    | "COUPON_CODE";
                  conditionValue: unknown;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Хөнгөлөлт олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        discount: {
          condition: {
            ":id": {
              put: {
                body: {
                  oldId?: number | null | undefined;
                  discountId?: string | undefined;
                  conditionType?:
                    | "MIN_TOTAL"
                    | "PRODUCT_CATEGORY"
                    | "CUSTOMER_GROUP"
                    | "PAYMENT_METHOD"
                    | "DATE_RANGE"
                    | "ITEM_QUANTITY"
                    | "COUPON_CODE"
                    | undefined;
                  conditionValue?:
                    | (import("drizzle-typebox").Json &
                        (
                          | {
                              timeStart: string;
                              timeEnd: string;
                            }
                          | {
                              cpOrderItemId?: string | undefined;
                              amount: number;
                            }
                          | {
                              categoryId: string;
                            }
                          | {
                              groupId: string;
                            }
                          | {
                              cpOrderItemId?: string | undefined;
                              minQuantity: number;
                            }
                          | {
                              code: string;
                            }
                          | {
                              paymentMethod: string;
                            }
                        ))
                    | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    discountId: string;
                    conditionType:
                      | "MIN_TOTAL"
                      | "PRODUCT_CATEGORY"
                      | "CUSTOMER_GROUP"
                      | "PAYMENT_METHOD"
                      | "DATE_RANGE"
                      | "ITEM_QUANTITY"
                      | "COUPON_CODE";
                    conditionValue: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Хөнгөлөлтийн нөхцөл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        discount: {
          condition: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                    discountId: string;
                    conditionType:
                      | "MIN_TOTAL"
                      | "PRODUCT_CATEGORY"
                      | "CUSTOMER_GROUP"
                      | "PAYMENT_METHOD"
                      | "DATE_RANGE"
                      | "ITEM_QUANTITY"
                      | "COUPON_CODE";
                    conditionValue: unknown;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Хөнгөлөлтийн нөхцөл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        discount: {
          apply: {
            post: {
              body: {
                oldId?: number | null | undefined;
                note?: string | null | undefined;
                cpOrderItemId?: string | null | undefined;
                discountId?: string | null | undefined;
                cpOrderId: string;
                valueApplied: number;
                priceBeforeDiscount: number;
                priceAfterDiscount: number;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  id: string;
                  employeeId: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  note: string | null;
                  authUserId: string;
                  cpOrderId: string;
                  cpOrderItemId: string | null;
                  discountId: string | null;
                  valueApplied: number;
                  priceBeforeDiscount: number;
                  priceAfterDiscount: number;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400: "Хэрэглэгчийн ажилтан ID олдсонгүй.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        discount: {
          apply: {
            ":id": {
              put: {
                body: {
                  employeeId?: string | undefined;
                  oldId?: number | null | undefined;
                  note?: string | null | undefined;
                  authUserId?: string | undefined;
                  cpOrderId?: string | undefined;
                  cpOrderItemId?: string | null | undefined;
                  discountId?: string | null | undefined;
                  valueApplied?: number | undefined;
                  priceBeforeDiscount?: number | undefined;
                  priceAfterDiscount?: number | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    discountId: string | null;
                    cpOrderId: string;
                    cpOrderItemId: string | null;
                    valueApplied: number;
                    priceBeforeDiscount: number;
                    priceAfterDiscount: number;
                    note: string | null;
                    authUserId: string;
                    employeeId: string;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Хөнгөлөлтийн хэрэглээ олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        discount: {
          apply: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Хөнгөлөлтийн хэрэглээ олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        inspection: {};
      } & {
        inspection: {
          ubcab: {
            get: {
              body: {};
              params: {};
              query: {
                licensePlate?: string | undefined;
              };
              headers: {};
              response: {
                200: {
                  company: {
                    id: string;
                    name: string;
                    serviceName: string;
                    logoUrl: string;
                  } | null;
                  vehicle: {
                    licensePlate: string | null;
                    vin: string | null;
                    model: string | null;
                  };
                  employee: {
                    firstname: string;
                    lastname: string;
                  } | null;
                  inspection: {
                    inspection:
                      | {
                          type: string;
                          values: {
                            description: string;
                            question: string;
                            answer: string;
                          }[];
                        }[]
                      | null;
                    createdAt: string;
                    expireAt: Date;
                    status: "CANCELLED" | "APPROVED" | "CREATED";
                  };
                }[];
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        inspection: {
          get: {
            body: {};
            params: {};
            query: {
              search?: string | undefined;
              status?: "CANCELLED" | "APPROVED" | "CREATED" | undefined;
              licensePlate?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  inspection: {
                    companyId: string;
                    branchId: string;
                    vehicleId: string;
                    inspection:
                      | {
                          type: string;
                          values: {
                            description: string;
                            question: string;
                            answer: string;
                          }[];
                        }[]
                      | null;
                    employeeId: string | null;
                    expireAt: Date;
                    experience: string | null;
                    rank: string | null;
                    licensePlate: string;
                    description: string | null;
                    status: "CANCELLED" | "APPROVED" | "CREATED";
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  vehicle: {
                    customerId: string | null;
                    vehicleKindId: string;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    companyId: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  employee: {
                    firstname: string;
                    lastname: string;
                  } | null;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        inspection: {
          post: {
            body: {
              employeeId?: string | undefined;
              description?: string | undefined;
              licensePlate: string;
              inspection: {
                type: string;
                values: {
                  description: string;
                  question: string;
                  answer: string;
                }[];
              }[];
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                branchId: string;
                companyId: string;
                employeeId: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                status: "CANCELLED" | "APPROVED" | "CREATED";
                description: string | null;
                vehicleId: string;
                licensePlate: string;
                inspection:
                  | {
                      type: string;
                      values: {
                        description: string;
                        question: string;
                        answer: string;
                      }[];
                    }[]
                  | null;
                expireAt: Date;
                experience: string | null;
                rank: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              400:
                | "Машины дугаар болон VIN хоёроос нэгийг нь оруулна уу."
                | "Машины VIN оруулсан бол машины төрөл оруулна уу.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
              502: string;
            };
          };
        };
      } & {
        inspection: {
          admin: {
            get: {
              body: {};
              params: {};
              query: {
                companyId?: string | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: {
                    company: {
                      id: string;
                      name: string;
                      serviceName: string;
                      logoUrl: string;
                    } | null;
                    vehicle: {
                      licensePlate: string | null;
                      vin: string | null;
                      model: string | null;
                    };
                    employee: {
                      firstname: string;
                      lastname: string;
                    } | null;
                    inspection: {
                      inspection:
                        | {
                            type: string;
                            values: {
                              description: string;
                              question: string;
                              answer: string;
                            }[];
                          }[]
                        | null;
                      createdAt: string;
                      expireAt: Date;
                      status: "CANCELLED" | "APPROVED" | "CREATED";
                    };
                    totalCount: number;
                  }[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        inspection: {
          ":id": {
            get: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string;
                  vehicleId: string;
                  inspection:
                    | {
                        type: string;
                        values: {
                          description: string;
                          question: string;
                          answer: string;
                        }[];
                      }[]
                    | null;
                  employeeId: string | null;
                  expireAt: Date;
                  experience: string | null;
                  rank: string | null;
                  licensePlate: string;
                  description: string | null;
                  status: "CANCELLED" | "APPROVED" | "CREATED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Үзлэг олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        inspection: {
          ":id": {
            post: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Үзлэг олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        inspection: {
          ":id": {
            put: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string;
                  vehicleId: string;
                  inspection:
                    | {
                        type: string;
                        values: {
                          description: string;
                          question: string;
                          answer: string;
                        }[];
                      }[]
                    | null;
                  employeeId: string | null;
                  expireAt: Date;
                  experience: string | null;
                  rank: string | null;
                  licensePlate: string;
                  description: string | null;
                  status: "CANCELLED" | "APPROVED" | "CREATED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Үзлэг олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        inspection: {
          ":id": {
            patch: {
              body: {
                employeeId?: string | undefined;
                description?: string | undefined;
                licensePlate?: string | undefined;
                inspection?:
                  | {
                      type: string;
                      values: {
                        description: string;
                        question: string;
                        answer: string;
                      }[];
                    }[]
                  | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string;
                  branchId: string;
                  vehicleId: string;
                  inspection:
                    | {
                        type: string;
                        values: {
                          description: string;
                          question: string;
                          answer: string;
                        }[];
                      }[]
                    | null;
                  employeeId: string | null;
                  expireAt: Date;
                  experience: string | null;
                  rank: string | null;
                  licensePlate: string;
                  description: string | null;
                  status: "CANCELLED" | "APPROVED" | "CREATED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        inspection: {
          ":id": {
            "service-order": {
              post: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    cpOrderId: string;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Бараа олдсонгүй."
                    | "Үйлчилгээний төрөл олдсонгүй."
                    | "Үзлэг олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: string;
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                  500: "Алдаа гарлаа. Дахин оролдоно уу.";
                  502: string;
                };
              };
            };
          };
        };
      };
    } & {
      crm: {
        reports: {};
      } & {
        reports: {
          sales: {
            get: {
              body: {};
              params: {};
              query: {
                state?: "CREATED" | "PROGRESSING" | "COMPLETE" | undefined;
                employeeId?: string | undefined;
                companyBranchId?: string | undefined;
                endDate?: string | undefined;
                startDate?: string | undefined;
                includeItems?: boolean | undefined;
                includePayments?: boolean | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  order: {
                    companyId: string;
                    companyBranchId: string;
                    customerId: string | null;
                    vehicleId: string | null;
                    orderId: string;
                    state: "CREATED" | "PROGRESSING" | "COMPLETE";
                    isNoat: boolean | null;
                    timeCompleted: string | null;
                    km: number;
                    type: "Service" | "ProductSell";
                    description: string | null;
                    nextServiceDate: string | null;
                    isQualityCheck: boolean;
                    repeatedOrderId: string | null;
                    repeatedCheckList: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  customer: {
                    companyId: string | null;
                    firstname: string | null;
                    lastname: string | null;
                    phoneNumber: string;
                    email: string | null;
                    regNum: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  vehicle: {
                    customerId: string | null;
                    vehicleKindId: string;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    companyId: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  vehicleKind: {
                    vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                    parentId: string | null;
                    name: string;
                    description: string | null;
                    yearStart: number | null;
                    yearEnd: number | null;
                    imagePath: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                  totalAmount: number;
                  paidAmount: number;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            summary: {
              get: {
                body: {};
                params: {};
                query: {
                  companyBranchId?: string | undefined;
                  endDate?: string | undefined;
                  startDate?: string | undefined;
                };
                headers: {};
                response: {
                  200: {
                    totalOrders: number;
                    totalRevenue: number;
                    totalPaidAmount: number;
                    totalPendingAmount: number;
                    averageOrderValue: number;
                    ordersCompleted: number;
                    ordersPending: number;
                    ordersCancelled: number;
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            "by-period": {
              get: {
                body: {};
                params: {};
                query: {
                  companyBranchId?: string | undefined;
                  endDate?: string | undefined;
                  startDate?: string | undefined;
                  groupBy: "month" | "day" | "week" | "year";
                };
                headers: {};
                response: {
                  200: {
                    totalOrders: number;
                    totalRevenue: number;
                    totalPaidAmount: number;
                    period: string;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            "by-employee": {
              get: {
                body: {};
                params: {};
                query: {
                  companyBranchId?: string | undefined;
                  endDate?: string | undefined;
                  startDate?: string | undefined;
                  pagination: {
                    size: number;
                    page: number;
                  };
                };
                headers: {};
                response: {
                  200: {
                    totalCount: number;
                    employeeId: string;
                    employeeName: string;
                    totalOrders: number;
                    totalRevenue: number;
                    totalCommission: number;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          payments: {
            get: {
              body: {};
              params: {};
              query: {
                state?: string | undefined;
                method?: string | undefined;
                companyBranchId?: string | undefined;
                endDate?: string | undefined;
                startDate?: string | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  payment: {
                    cpOrderId: string;
                    paymentPackageId: string | null;
                    paymentMethod:
                      | "CASH"
                      | "BANK_TRANSFER"
                      | "POS_TERMINAL"
                      | "PAYMENT_PACKAGE"
                      | "CARD";
                    paymentChannel: string;
                    amount: number;
                    state:
                      | "PENDING"
                      | "EXPIRED"
                      | "PAID"
                      | "FAILED"
                      | "REFUNDED"
                      | "NOT_PAID"
                      | "DECLINED"
                      | "CANCELED"
                      | "REFUNDING";
                    invoiceNumber: string | null;
                    description: string | null;
                    pocketOrderNumber: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  order: {
                    companyId: string;
                    companyBranchId: string;
                    customerId: string | null;
                    vehicleId: string | null;
                    orderId: string;
                    state: "CREATED" | "PROGRESSING" | "COMPLETE";
                    isNoat: boolean | null;
                    timeCompleted: string | null;
                    km: number;
                    type: "Service" | "ProductSell";
                    description: string | null;
                    nextServiceDate: string | null;
                    isQualityCheck: boolean;
                    repeatedOrderId: string | null;
                    repeatedCheckList: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  customer: {
                    companyId: string | null;
                    firstname: string | null;
                    lastname: string | null;
                    phoneNumber: string;
                    email: string | null;
                    regNum: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  } | null;
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            csv: {
              get: {
                body: {};
                params: {};
                query: {
                  state?: "CREATED" | "PROGRESSING" | "COMPLETE" | undefined;
                  employeeId?: string | undefined;
                  method?: string | undefined;
                  companyBranchId?: string | undefined;
                  endDate?: string | undefined;
                  limit?: number | undefined;
                  startDate?: string | undefined;
                };
                headers: {};
                response: {
                  200: string;
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            summary: {
              csv: {
                get: {
                  body: {};
                  params: {};
                  query: {
                    companyBranchId?: string | undefined;
                    endDate?: string | undefined;
                    startDate?: string | undefined;
                  };
                  headers: {};
                  response: {
                    200: string;
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            "by-period": {
              csv: {
                get: {
                  body: {};
                  params: {};
                  query: {
                    companyBranchId?: string | undefined;
                    endDate?: string | undefined;
                    startDate?: string | undefined;
                    groupBy: "month" | "day" | "week" | "year";
                  };
                  headers: {};
                  response: {
                    200: string;
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          sales: {
            "by-employee": {
              csv: {
                get: {
                  body: {};
                  params: {};
                  query: {
                    state?: "CREATED" | "PROGRESSING" | "COMPLETE" | undefined;
                    employeeId?: string | undefined;
                    method?: string | undefined;
                    companyBranchId?: string | undefined;
                    endDate?: string | undefined;
                    limit?: number | undefined;
                    startDate?: string | undefined;
                  };
                  headers: {};
                  response: {
                    200: string;
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          payments: {
            csv: {
              get: {
                body: {};
                params: {};
                query: {
                  state?: "CREATED" | "PROGRESSING" | "COMPLETE" | undefined;
                  employeeId?: string | undefined;
                  method?: string | undefined;
                  companyBranchId?: string | undefined;
                  endDate?: string | undefined;
                  limit?: number | undefined;
                  startDate?: string | undefined;
                };
                headers: {};
                response: {
                  200: string;
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        reports: {
          "cp-order": {
            get: {
              body: {};
              params: {};
              query: {
                branchId?: string | undefined;
                employeeId?: string | undefined;
                partNumber?: string | undefined;
                type?: "Service" | "Product" | undefined;
                phoneNumber?: string | undefined;
                licensePlate?: string | undefined;
                endDate?: string | undefined;
                productName?: string | undefined;
                startDate?: string | undefined;
                orderType?: "Service" | "ProductSell" | undefined;
                serviceKindName?: string | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      createdAt: string | null;
                      orderId: string | null;
                      phone: string | null;
                      licensePlate: string | null;
                      name: string | null;
                      partNumber: string | null;
                      employeeName: unknown;
                      quantity: number;
                      priceBuy: number | null;
                      price: number;
                      discount: unknown;
                      priceAfterDiscount: number | null;
                      totalPrice: unknown;
                      totalPriceNoat: unknown;
                      totalCount: number;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      techdoc: {
        supplier: {};
      } & {
        supplier: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              byCompany?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: {
                  name: string;
                  phone: string | null;
                  address: string | null;
                  image: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                }[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        supplier: {
          post: {
            body: {
              image?: string | null | undefined;
              oldId?: number | null | undefined;
              phone?: string | null | undefined;
              address?: string | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                image: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                phone: string | null;
                address: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        supplier: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                image?: string | null | undefined;
                oldId?: number | null | undefined;
                phone?: string | null | undefined;
                address?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  phone: string | null;
                  address: string | null;
                  image: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Нийлүүлэгч олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        supplier: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        vehicleKind: {};
      } & {
        vehicleKind: {
          get: {
            body: {};
            params: {};
            query: {
              name?: string | undefined;
              vehicleKindEnum?: "MAKE" | "MODEL_GROUP" | "MODEL" | undefined;
              parentId?: string | null | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    kind: {
                      vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                      parentId: string | null;
                      name: string;
                      description: string | null;
                      yearStart: number | null;
                      yearEnd: number | null;
                      imagePath: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    parent: {
                      vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                      parentId: string | null;
                      name: string;
                      description: string | null;
                      yearStart: number | null;
                      yearEnd: number | null;
                      imagePath: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        vehicleKind: {
          post: {
            body: {
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              parentId?: string | null | undefined;
              yearStart?: number | null | undefined;
              yearEnd?: number | null | undefined;
              imagePath?: string | null | undefined;
              name: string;
              vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
                vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                parentId: string | null;
                yearStart: number | null;
                yearEnd: number | null;
                imagePath: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        vehicleKind: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                vehicleKindEnum?: "MAKE" | "MODEL_GROUP" | "MODEL" | undefined;
                parentId?: string | null | undefined;
                yearStart?: number | null | undefined;
                yearEnd?: number | null | undefined;
                imagePath?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                  parentId: string | null;
                  name: string;
                  description: string | null;
                  yearStart: number | null;
                  yearEnd: number | null;
                  imagePath: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Vehicle kind not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        "product-category": {};
      } & {
        "product-category": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    name: string;
                    description: string | null;
                    image: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "product-category": {
          post: {
            body: {
              image?: string | null | undefined;
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                image: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "product-category": {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                image?: string | null | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  description: string | null;
                  image: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бүтээгдэхүүний ангилал олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "product-category": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        "product-kind": {};
      } & {
        "product-kind": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              productCategoryId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    category: {
                      name: string;
                      description: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                    productCategoryId: string;
                    name: string;
                    description: string | null;
                    image: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "product-kind": {
          post: {
            body: {
              image?: string | null | undefined;
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              name: string;
              productCategoryId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                image: string | null;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
                productCategoryId: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "product-kind": {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                image?: string | null | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                productCategoryId?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  productCategoryId: string;
                  name: string;
                  description: string | null;
                  image: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бүтээгдэхүүний төрөл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "product-kind": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        "product-kind-relate": {};
      } & {
        "product-kind-relate": {
          get: {
            body: {};
            params: {};
            query: {
              productKindOneId?: string | undefined;
              productKindTwoId?: string | undefined;
              relateType?:
                | "INCLUDE"
                | "EXCLUDE"
                | "ALTERNATIVE"
                | "EQUIVALENT"
                | "ACCESSORY"
                | "COMPONENT"
                | "DEPENDENCY"
                | "UPGRADE"
                | "DERIVED"
                | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    productKindOne: {
                      productCategoryId: string;
                      name: string;
                      description: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    productKindTwo: {
                      productCategoryId: string;
                      name: string;
                      description: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                    productKindOneId: string;
                    productKindTwoId: string;
                    relateType:
                      | "INCLUDE"
                      | "EXCLUDE"
                      | "ALTERNATIVE"
                      | "EQUIVALENT"
                      | "ACCESSORY"
                      | "COMPONENT"
                      | "DEPENDENCY"
                      | "UPGRADE"
                      | "DERIVED";
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "product-kind-relate": {
          post: {
            body: {
              oldId?: number | null | undefined;
              productKindOneId: string;
              productKindTwoId: string;
              relateType:
                | "INCLUDE"
                | "EXCLUDE"
                | "ALTERNATIVE"
                | "EQUIVALENT"
                | "ACCESSORY"
                | "COMPONENT"
                | "DEPENDENCY"
                | "UPGRADE"
                | "DERIVED";
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                productKindOneId: string;
                productKindTwoId: string;
                relateType:
                  | "INCLUDE"
                  | "EXCLUDE"
                  | "ALTERNATIVE"
                  | "EQUIVALENT"
                  | "ACCESSORY"
                  | "COMPONENT"
                  | "DEPENDENCY"
                  | "UPGRADE"
                  | "DERIVED";
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "product-kind-relate": {
          ":id": {
            put: {
              body: {
                oldId?: number | null | undefined;
                productKindOneId?: string | undefined;
                productKindTwoId?: string | undefined;
                relateType?:
                  | "INCLUDE"
                  | "EXCLUDE"
                  | "ALTERNATIVE"
                  | "EQUIVALENT"
                  | "ACCESSORY"
                  | "COMPONENT"
                  | "DEPENDENCY"
                  | "UPGRADE"
                  | "DERIVED"
                  | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  productKindOneId: string;
                  productKindTwoId: string;
                  relateType:
                    | "INCLUDE"
                    | "EXCLUDE"
                    | "ALTERNATIVE"
                    | "EQUIVALENT"
                    | "ACCESSORY"
                    | "COMPONENT"
                    | "DEPENDENCY"
                    | "UPGRADE"
                    | "DERIVED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бүтээгдэхүүний холбоос олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "product-kind-relate": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        product: {};
      } & {
        product: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              uomId?: string | undefined;
              partNumber?: string | undefined;
              productKindId?: string | undefined;
              oen?: string | undefined;
              supplierId?: string | undefined;
              isBt?: boolean | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    product: {
                      name: string;
                      partNumber: string;
                      oen: string[] | null;
                      description: string | null;
                      supplierId: string;
                      pictureList: string[];
                      uomId: string;
                      uomQuantity: number;
                      productKindId: string;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    supplier: {
                      name: string;
                      phone: string | null;
                      address: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    uom: {
                      uomCategoryId: string;
                      code: string | null;
                      name: string;
                      description: string | null;
                      symbol: string | null;
                      isBaseUnit: boolean;
                      baseFactor: number | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    productKind: {
                      productCategoryId: string;
                      name: string;
                      description: string | null;
                      image: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                    btRequestItem: {
                      requestId: string;
                      productId: string;
                      status: "CANCELLED" | "PENDING" | "APPROVED" | "REJECTED";
                      type: "WAREHOUSE" | "ORDER";
                      unit: "MOQ" | "PACKAGE";
                      quantity: number;
                      currency: string;
                      price: number;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        product: {
          post: {
            body: {
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              oen?: string[] | null | undefined;
              pictureList?: string[] | undefined;
              uomQuantity?: number | undefined;
              name: string;
              uomId: string;
              partNumber: string;
              productKindId: string;
              supplierId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                uomId: string;
                partNumber: string;
                description: string | null;
                productKindId: string;
                oen: string[] | null;
                supplierId: string;
                pictureList: string[];
                uomQuantity: number;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        product: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                uomId?: string | undefined;
                partNumber?: string | undefined;
                description?: string | null | undefined;
                productKindId?: string | undefined;
                oen?: string[] | null | undefined;
                supplierId?: string | undefined;
                pictureList?: string[] | undefined;
                uomQuantity?: number | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  partNumber: string;
                  oen: string[] | null;
                  description: string | null;
                  supplierId: string;
                  pictureList: string[];
                  uomId: string;
                  uomQuantity: number;
                  productKindId: string;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бүтээгдэхүүн олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        product: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        "service-kind-category": {};
      } & {
        "service-kind-category": {
          get: {
            body: {};
            params: {};
            query: {
              parentId?: string | null | undefined;
            };
            headers: {};
            response: {
              200: {
                name: string;
                code: string;
                description: string | null;
                parentId: string | null;
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
              }[];
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "service-kind-category": {
          post: {
            body: {};
            params: {};
            query: {};
            headers: {};
            response: {
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
            };
          };
        };
      } & {
        "service-kind-category": {
          ":id": {
            put: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "service-kind-category": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      techdoc: {
        "service-kind": {};
      } & {
        "service-kind": {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              name?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    name: string;
                    description: string | null;
                    categoryId: string | null;
                    code: string | null;
                    laborTime: number | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "service-kind": {
          post: {
            body: {
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              categoryId?: string | null | undefined;
              laborTime?: number | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                code: string | null;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
                categoryId: string | null;
                laborTime: number | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              409: string;
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "service-kind": {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                categoryId?: string | null | undefined;
                laborTime?: number | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  description: string | null;
                  categoryId: string | null;
                  code: string | null;
                  laborTime: number | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Үйлчилгээний төрөл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "service-kind": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      fleet: {
        inspection: {
          "field-group": {};
        } & {
          "field-group": {
            get: {
              body: {};
              params: {};
              query: {
                name?: string | undefined;
                code?: string | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: {
                    totalCount: number;
                    code: string | null;
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  }[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          "field-group": {
            post: {
              body: {
                code?: string | null | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                name: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          "field-group": {
            ":id": {
              put: {
                body: {
                  name?: string | undefined;
                  code?: string | null | undefined;
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          "field-group": {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          "field-group": {
            ":id": {
              field: {
                get: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      groupId: string;
                      code: string | null;
                      description: string | null;
                      version: string | null;
                      isActive: boolean;
                      metadata: unknown;
                      required: boolean;
                      fieldGroup: string | null;
                      sortIndex: number | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    }[];
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        inspection: {
          field: {};
        } & {
          field: {
            post: {
              body: {
                code?: string | null | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                isActive?: boolean | undefined;
                version?: string | null | undefined;
                metadata?: import("drizzle-typebox").Json | undefined;
                required?: boolean | undefined;
                fieldGroup?: string | null | undefined;
                sortIndex?: number | null | undefined;
                groupId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          field: {
            ":id": {
              put: {
                body: {
                  code?: string | null | undefined;
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  isActive?: boolean | undefined;
                  version?: string | null | undefined;
                  metadata?: import("drizzle-typebox").Json | undefined;
                  required?: boolean | undefined;
                  fieldGroup?: string | null | undefined;
                  sortIndex?: number | null | undefined;
                  groupId: string;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          field: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        inspection: {
          "field-result": {};
        } & {
          "field-result": {
            get: {
              body: {};
              params: {};
              query: {
                inspectionId: string;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      totalCount: number;
                      inspectionId: string;
                      templateFieldId: string;
                      result: string | null;
                      numeric: number | null;
                      comment: string | null;
                      severityLevel: number | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          "field-result": {
            "create-or-update": {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  result?: string | null | undefined;
                  numeric?: number | null | undefined;
                  comment?: string | null | undefined;
                  severityLevel?: number | null | undefined;
                  inspectionId: string;
                  templateFieldId: string;
                }[];
                params: {};
                query: {};
                headers: {};
                response: {
                  200: {
                    inspectionId: string;
                    templateFieldId: string;
                    result: string | null;
                    numeric: number | null;
                    comment: string | null;
                    severityLevel: number | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400:
                    | "Хяналтын үр дүн оруулах мэдээлэл байхгүй байна."
                    | "Бүх үр дүн нь ижил хяналтын үзлэгт хамаарах ёстой.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          "field-result": {
            inspection: {
              ":id": {
                all: {
                  delete: {
                    body: {};
                    params: {
                      id: string;
                    };
                    query: {};
                    headers: {};
                    response: {
                      401: "Токен олдсонгүй";
                      404:
                        | "Байгууллагын мэдээлэл олдсонгүй."
                        | "Салбарын мэдээлэл олдсонгүй."
                        | "Хяналтын үзлэг олдсонгүй.";
                      402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                      422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        inspection: {
          template: {};
        } & {
          template: {
            get: {
              body: {};
              params: {};
              query: {
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      totalCount: number;
                      companyId: string | null;
                      name: string;
                      description: string | null;
                      version: string | null;
                      isActive: boolean;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          template: {
            post: {
              body: {
                companyId?: string | null | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                isActive?: boolean | undefined;
                version?: string | null | undefined;
                name: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: string;
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              get: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    companyId: string | null;
                    name: string;
                    description: string | null;
                    version: string | null;
                    isActive: boolean;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Үзлэгийн загвар олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              put: {
                body: {
                  companyId?: string | null | undefined;
                  name?: string | undefined;
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  isActive?: boolean | undefined;
                  version?: string | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Үзлэгийн загвар олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              field: {
                get: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      templateId: string;
                      fieldGroupId: string | null;
                      fieldGroup: string | null;
                      fieldId: string | null;
                      code: string | null;
                      description: string | null;
                      fieldType: "BOOLEAN" | "NUMERIC" | "TEXT" | "DATE" | "RATE" | "MULTI_CHOICE";
                      required: boolean;
                      metadata: unknown;
                      sortIndex: number | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    }[];
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          template: {
            field: {
              ":id": {
                put: {
                  body: {
                    code?: string | null | undefined;
                    oldId?: number | null | undefined;
                    description?: string | null | undefined;
                    metadata?: import("drizzle-typebox").Json | undefined;
                    required?: boolean | undefined;
                    fieldGroup?: string | null | undefined;
                    sortIndex?: number | null | undefined;
                    templateId?: string | undefined;
                    fieldGroupId?: string | null | undefined;
                    fieldId?: string | null | undefined;
                    fieldType?:
                      | "BOOLEAN"
                      | "NUMERIC"
                      | "TEXT"
                      | "DATE"
                      | "RATE"
                      | "MULTI_CHOICE"
                      | undefined;
                  };
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              field: {
                post: {
                  body: {
                    code?: string | null | undefined;
                    oldId?: number | null | undefined;
                    description?: string | null | undefined;
                    metadata?: import("drizzle-typebox").Json | undefined;
                    required?: boolean | undefined;
                    fieldGroup?: string | null | undefined;
                    sortIndex?: number | null | undefined;
                    fieldGroupId?: string | null | undefined;
                    fieldId?: string | null | undefined;
                    fieldType: "BOOLEAN" | "NUMERIC" | "TEXT" | "DATE" | "RATE" | "MULTI_CHOICE";
                  };
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          template: {
            field: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        };
      } & {
        inspection: {
          schedule: {};
        } & {
          schedule: {
            get: {
              body: {};
              params: {};
              query: {
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      schedule: {
                        companyId: string;
                        machineId: string;
                        templateId: string;
                        daysInterval: number | null;
                        timeNextDue: Date | null;
                        isActive: boolean;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      machine: {
                        companyId: string | null;
                        machineKindId: string;
                        customerId: string | null;
                        name: string | null;
                        assetCode: string | null;
                        vin: string | null;
                        licensePlate: string | null;
                        color: string | null;
                        engineCc: string | null;
                        cylinder: string | null;
                        gasType: string | null;
                        transmissionType: string | null;
                        vehicleType: string | null;
                        yearManufacture: number | null;
                        yearImport: number | null;
                        steering: string | null;
                        engineCode: string | null;
                        transmissionCode: string | null;
                        driveTrain: string | null;
                        km: number;
                        customData: unknown;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      totalCount: number;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          schedule: {
            post: {
              body: {
                oldId?: number | null | undefined;
                isActive?: boolean | undefined;
                daysInterval?: number | null | undefined;
                timeNextDue?: Date | null | undefined;
                templateId: string;
                machineId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          schedule: {
            ":id": {
              put: {
                body: {
                  companyId?: string | undefined;
                  oldId?: number | null | undefined;
                  isActive?: boolean | undefined;
                  templateId?: string | undefined;
                  machineId?: string | undefined;
                  daysInterval?: number | null | undefined;
                  timeNextDue?: Date | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          schedule: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        inspection: {};
      } & {
        inspection: {
          get: {
            body: {};
            params: {};
            query: {
              state?: "COMPLETED" | "CREATED" | "SCHEDULED" | "IN_PROGRESS" | undefined;
              id?: string | undefined;
              endDate?: string | undefined;
              templateId?: string | undefined;
              machineId?: string | undefined;
              stateResult?:
                | "FAILED"
                | "NOT_INSPECTED"
                | "PASSED"
                | "RETURNED"
                | "WAIVED"
                | undefined;
              startDate?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    inspection: {
                      machineId: string;
                      templateId: string;
                      employeeInspectedId: string;
                      userInspectedId: string;
                      hours: number | null;
                      mileageKm: number | null;
                      state: "COMPLETED" | "CREATED" | "SCHEDULED" | "IN_PROGRESS";
                      stateResult:
                        | "FAILED"
                        | "NOT_INSPECTED"
                        | "PASSED"
                        | "RETURNED"
                        | "WAIVED"
                        | null;
                      timeScheduled: Date | null;
                      timeCompleted: Date | null;
                      note: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    machine: {
                      companyId: string | null;
                      machineKindId: string;
                      customerId: string | null;
                      name: string | null;
                      assetCode: string | null;
                      vin: string | null;
                      licensePlate: string | null;
                      color: string | null;
                      engineCc: string | null;
                      cylinder: string | null;
                      gasType: string | null;
                      transmissionType: string | null;
                      vehicleType: string | null;
                      yearManufacture: number | null;
                      yearImport: number | null;
                      steering: string | null;
                      engineCode: string | null;
                      transmissionCode: string | null;
                      driveTrain: string | null;
                      km: number;
                      customData: unknown;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                    template: {
                      name: string;
                    } | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        inspection: {
          post: {
            body: {
              state?: "COMPLETED" | "CREATED" | "SCHEDULED" | "IN_PROGRESS" | undefined;
              oldId?: number | null | undefined;
              note?: string | null | undefined;
              timeCompleted?: Date | null | undefined;
              hours?: number | null | undefined;
              mileageKm?: number | null | undefined;
              stateResult?:
                | "FAILED"
                | "NOT_INSPECTED"
                | "PASSED"
                | "RETURNED"
                | "WAIVED"
                | null
                | undefined;
              timeScheduled?: Date | null | undefined;
              templateId: string;
              machineId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              400: "Ажилтны мэдээлэл шаардлагатай.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        inspection: {
          ":id": {
            put: {
              body: {
                state?: "COMPLETED" | "CREATED" | "SCHEDULED" | "IN_PROGRESS" | undefined;
                oldId?: number | null | undefined;
                note?: string | null | undefined;
                timeCompleted?: Date | null | undefined;
                templateId?: string | undefined;
                machineId?: string | undefined;
                employeeInspectedId?: string | undefined;
                userInspectedId?: string | undefined;
                hours?: number | null | undefined;
                mileageKm?: number | null | undefined;
                stateResult?:
                  | "FAILED"
                  | "NOT_INSPECTED"
                  | "PASSED"
                  | "RETURNED"
                  | "WAIVED"
                  | null
                  | undefined;
                timeScheduled?: Date | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  machineId: string;
                  templateId: string;
                  employeeInspectedId: string;
                  userInspectedId: string;
                  hours: number | null;
                  mileageKm: number | null;
                  state: "COMPLETED" | "CREATED" | "SCHEDULED" | "IN_PROGRESS";
                  stateResult: "FAILED" | "NOT_INSPECTED" | "PASSED" | "RETURNED" | "WAIVED" | null;
                  timeScheduled: Date | null;
                  timeCompleted: Date | null;
                  note: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Хяналтын үзлэг олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      fleet: {
        pm: {
          template: {};
        } & {
          template: {
            product: {};
          } & {
            product: {
              get: {
                body: {};
                params: {};
                query: {
                  pmTemplateId: string;
                  pagination: {
                    size: number;
                    page: number;
                  };
                };
                headers: {};
                response: {
                  200: {
                    totalCount: number;
                    totalPage: number;
                    result: Omit<
                      {
                        product: {
                          pmTemplateId: string;
                          productKindId: string;
                          quantity: number | null;
                          uomId: string;
                          id: string;
                          createdAt: string;
                          updatedAt: string;
                          deletedAt: string | null;
                          oldId: number | null;
                        };
                        productKind: {
                          productCategoryId: string;
                          name: string;
                          description: string | null;
                          image: string | null;
                          id: string;
                          createdAt: string;
                          updatedAt: string;
                          deletedAt: string | null;
                          oldId: number | null;
                        } | null;
                        uom: {
                          uomCategoryId: string;
                          code: string | null;
                          name: string;
                          description: string | null;
                          symbol: string | null;
                          isBaseUnit: boolean;
                          baseFactor: number | null;
                          id: string;
                          createdAt: string;
                          updatedAt: string;
                          deletedAt: string | null;
                          oldId: number | null;
                        } | null;
                        totalCount: number;
                      },
                      "totalCount"
                    >[];
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            product: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  quantity?: number | null | undefined;
                  uomId: string;
                  pmTemplateId: string;
                  productKindId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            product: {
              ":id": {
                put: {
                  body: {
                    oldId?: number | null | undefined;
                    uomId?: string | undefined;
                    quantity?: number | null | undefined;
                    pmTemplateId?: string | undefined;
                    productKindId?: string | undefined;
                  };
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            product: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    403: "Хандах эрхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          template: {
            get: {
              body: {};
              params: {};
              query: {
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      template: {
                        machineKindId: string;
                        companyId: string | null;
                        operationAmount: number | null;
                        uomId: string;
                        serviceKindId: string;
                        name: string;
                        description: string | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      machineKind: {
                        vehicleKindEnum: "MAKE" | "MODEL_GROUP" | "MODEL";
                        parentId: string | null;
                        name: string;
                        description: string | null;
                        yearStart: number | null;
                        yearEnd: number | null;
                        imagePath: string | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      uom: {
                        uomCategoryId: string;
                        code: string | null;
                        name: string;
                        description: string | null;
                        symbol: string | null;
                        isBaseUnit: boolean;
                        baseFactor: number | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      serviceKind: {
                        serviceKindId: string | null;
                        companyId: string;
                        branchId: string | null;
                        name: string;
                        description: string | null;
                        enabled: boolean;
                        price: number;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      totalCount: number;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          template: {
            post: {
              body: {
                companyId?: string | null | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                operationAmount?: number | null | undefined;
                name: string;
                uomId: string;
                serviceKindId: string;
                machineKindId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              put: {
                body: {
                  companyId?: string | null | undefined;
                  name?: string | undefined;
                  oldId?: number | null | undefined;
                  uomId?: string | undefined;
                  description?: string | null | undefined;
                  serviceKindId?: string | undefined;
                  machineKindId?: string | undefined;
                  operationAmount?: number | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          template: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        pm: {
          plan: {};
        } & {
          plan: {
            machine: {};
          } & {
            machine: {
              get: {
                body: {};
                params: {};
                query: {
                  pmPlanId: string;
                  pagination: {
                    size: number;
                    page: number;
                  };
                };
                headers: {};
                response: {
                  200: {
                    totalCount: number;
                    totalPage: number;
                    result: Omit<
                      {
                        totalCount: number;
                        pmPlanId: string;
                        pmTemplateId: string;
                        machineId: string;
                        employeeCreatedId: string;
                        userCreatedId: string;
                        note: string | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      },
                      "totalCount"
                    >[];
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            machine: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  note?: string | null | undefined;
                  machineId: string;
                  pmTemplateId: string;
                  pmPlanId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  400: "Ажилтны мэдээлэл шаардлагатай.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            machine: {
              many: {
                post: {
                  body: {
                    oldId?: number | null | undefined;
                    note?: string | null | undefined;
                    machineId: string;
                    pmTemplateId: string;
                    pmPlanId: string;
                    employeeCreatedId: string;
                    userCreatedId: string;
                  }[];
                  params: {};
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                      note: string | null;
                      machineId: string;
                      pmTemplateId: string;
                      pmPlanId: string;
                      employeeCreatedId: string;
                      userCreatedId: string;
                    }[];
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    400: "Машины мэдээлэл оруулах мэдээлэл байхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            machine: {
              ":id": {
                put: {
                  body: {
                    oldId?: number | null | undefined;
                    note?: string | null | undefined;
                    machineId?: string | undefined;
                    pmTemplateId?: string | undefined;
                    pmPlanId?: string | undefined;
                    employeeCreatedId?: string | undefined;
                    userCreatedId?: string | undefined;
                  };
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            machine: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          plan: {
            product: {};
          } & {
            product: {
              get: {
                body: {};
                params: {};
                query: {
                  pmPlanId: string;
                  pagination: {
                    size: number;
                    page: number;
                  };
                };
                headers: {};
                response: {
                  200: {
                    totalCount: number;
                    totalPage: number;
                    result: Omit<
                      {
                        product: {
                          pmPlanId: string;
                          productKindId: string;
                          uomId: string;
                          quantity: number | null;
                          pmQuantity: string | null;
                          id: string;
                          createdAt: string;
                          updatedAt: string;
                          deletedAt: string | null;
                          oldId: number | null;
                        };
                        productKind: {
                          productCategoryId: string;
                          name: string;
                          description: string | null;
                          image: string | null;
                          id: string;
                          createdAt: string;
                          updatedAt: string;
                          deletedAt: string | null;
                          oldId: number | null;
                        } | null;
                        uom: {
                          uomCategoryId: string;
                          code: string | null;
                          name: string;
                          description: string | null;
                          symbol: string | null;
                          isBaseUnit: boolean;
                          baseFactor: number | null;
                          id: string;
                          createdAt: string;
                          updatedAt: string;
                          deletedAt: string | null;
                          oldId: number | null;
                        } | null;
                        totalCount: number;
                      },
                      "totalCount"
                    >[];
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            product: {
              post: {
                body: {
                  oldId?: number | null | undefined;
                  quantity?: number | null | undefined;
                  pmQuantity?: string | null | undefined;
                  uomId: string;
                  productKindId: string;
                  pmPlanId: string;
                };
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            product: {
              many: {
                post: {
                  body: {
                    oldId?: number | null | undefined;
                    quantity?: number | null | undefined;
                    pmQuantity?: string | null | undefined;
                    uomId: string;
                    productKindId: string;
                    pmPlanId: string;
                  }[];
                  params: {};
                  query: {};
                  headers: {};
                  response: {
                    200: {
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                      uomId: string;
                      quantity: number | null;
                      productKindId: string;
                      pmPlanId: string;
                      pmQuantity: string | null;
                    }[];
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    400: "Бүтээгдэхүүний мэдээлэл оруулах мэдээлэл байхгүй байна.";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            product: {
              ":id": {
                put: {
                  body: {
                    oldId?: number | null | undefined;
                    uomId?: string | undefined;
                    quantity?: number | null | undefined;
                    productKindId?: string | undefined;
                    pmPlanId?: string | undefined;
                    pmQuantity?: string | null | undefined;
                  };
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            product: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          plan: {
            get: {
              body: {};
              params: {};
              query: {
                id?: string | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      totalCount: number;
                      companyId: string;
                      name: string;
                      description: string | null;
                      dateStart: Date | null;
                      dateEnd: Date | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          plan: {
            post: {
              body: {
                machineId: string;
                pmTemplateId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Pm Template олдсонгүй."
                  | "Машин олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                400:
                  | "Ажилтны мэдээлэл шаардлагатай."
                  | "Машины төрөл хэрэглэгчийн машин төрөлтэй тэнцүү байхгүй.";
                403: "Хандах эрхгүй байна.";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          plan: {
            ":id": {
              put: {
                body: {
                  companyId?: string | undefined;
                  name?: string | undefined;
                  oldId?: number | null | undefined;
                  dateStart?: Date | null | undefined;
                  dateEnd?: Date | null | undefined;
                  description?: string | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    companyId: string;
                    name: string;
                    description: string | null;
                    dateStart: Date | null;
                    dateEnd: Date | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          plan: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  403: "Хандах эрхгүй байна.";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      };
    } & {
      fleet: {
        machine: {};
      } & {
        machine: {
          get: {
            body: {};
            params: {};
            query: {
              id?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    companyId: string | null;
                    machineKindId: string;
                    customerId: string | null;
                    name: string | null;
                    assetCode: string | null;
                    vin: string | null;
                    licensePlate: string | null;
                    color: string | null;
                    engineCc: string | null;
                    cylinder: string | null;
                    gasType: string | null;
                    transmissionType: string | null;
                    vehicleType: string | null;
                    yearManufacture: number | null;
                    yearImport: number | null;
                    steering: string | null;
                    engineCode: string | null;
                    transmissionCode: string | null;
                    driveTrain: string | null;
                    km: number;
                    customData: unknown;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        machine: {
          post: {
            body: {
              companyId?: string | null | undefined;
              name?: string | null | undefined;
              oldId?: number | null | undefined;
              customerId?: string | null | undefined;
              licensePlate?: string | null | undefined;
              assetCode?: string | null | undefined;
              vin?: string | null | undefined;
              color?: string | null | undefined;
              engineCc?: string | null | undefined;
              cylinder?: string | null | undefined;
              gasType?: string | null | undefined;
              transmissionType?: string | null | undefined;
              vehicleType?: string | null | undefined;
              yearManufacture?: number | null | undefined;
              yearImport?: number | null | undefined;
              steering?: string | null | undefined;
              engineCode?: string | null | undefined;
              transmissionCode?: string | null | undefined;
              driveTrain?: string | null | undefined;
              km?: number | undefined;
              customData?: import("drizzle-typebox").Json | undefined;
              machineKindId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        machine: {
          ":id": {
            put: {
              body: {
                companyId?: string | null | undefined;
                name?: string | null | undefined;
                oldId?: number | null | undefined;
                customerId?: string | null | undefined;
                licensePlate?: string | null | undefined;
                machineKindId?: string | undefined;
                assetCode?: string | null | undefined;
                vin?: string | null | undefined;
                color?: string | null | undefined;
                engineCc?: string | null | undefined;
                cylinder?: string | null | undefined;
                gasType?: string | null | undefined;
                transmissionType?: string | null | undefined;
                vehicleType?: string | null | undefined;
                yearManufacture?: number | null | undefined;
                yearImport?: number | null | undefined;
                steering?: string | null | undefined;
                engineCode?: string | null | undefined;
                transmissionCode?: string | null | undefined;
                driveTrain?: string | null | undefined;
                km?: number | undefined;
                customData?: import("drizzle-typebox").Json | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  companyId: string | null;
                  machineKindId: string;
                  customerId: string | null;
                  name: string | null;
                  assetCode: string | null;
                  vin: string | null;
                  licensePlate: string | null;
                  color: string | null;
                  engineCc: string | null;
                  cylinder: string | null;
                  gasType: string | null;
                  transmissionType: string | null;
                  vehicleType: string | null;
                  yearManufacture: number | null;
                  yearImport: number | null;
                  steering: string | null;
                  engineCode: string | null;
                  transmissionCode: string | null;
                  driveTrain: string | null;
                  km: number;
                  customData: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        machine: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      fleet: {
        ms: {
          record: {
            product: {};
          } & {
            product: {
              get: {
                body: {};
                params: {};
                query: {
                  recordId: string;
                };
                headers: {};
                response: {
                  200: {
                    msRecordId: string;
                    companyProductId: string | null;
                    uomId: string;
                    quantity: number | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          } & {
            product: {
              post: {
                body: {};
                params: {};
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                };
              };
            };
          } & {
            product: {
              ":id": {
                put: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          } & {
            product: {
              ":id": {
                delete: {
                  body: {};
                  params: {
                    id: string;
                  };
                  query: {};
                  headers: {};
                  response: {
                    401: "Токен олдсонгүй";
                    404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                    402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                    422: {
                      type: "validation";
                      on: string;
                      summary?: string;
                      message?: string;
                      found?: unknown;
                      property?: string;
                      expected?: string;
                    };
                  };
                };
              };
            };
          };
        } & {
          record: {};
        } & {
          record: {
            get: {
              body: {};
              params: {};
              query: {
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      totalCount: number;
                      machineId: string;
                      serviceKindId: string;
                      pmPlanId: string | null;
                      pmPlanMachineId: string | null;
                      woTaskId: string | null;
                      employeeTechnicianId: string;
                      state: string;
                      note: string | null;
                      timeCompleted: Date | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          record: {
            post: {
              body: {
                oldId?: number | null | undefined;
                note?: string | null | undefined;
                timeCompleted?: Date | null | undefined;
                pmPlanId?: string | null | undefined;
                pmPlanMachineId?: string | null | undefined;
                woTaskId?: string | null | undefined;
                state: string;
                serviceKindId: string;
                machineId: string;
                employeeTechnicianId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          record: {
            ":id": {
              put: {
                body: {
                  state?: string | undefined;
                  oldId?: number | null | undefined;
                  note?: string | null | undefined;
                  serviceKindId?: string | undefined;
                  timeCompleted?: Date | null | undefined;
                  machineId?: string | undefined;
                  pmPlanId?: string | null | undefined;
                  pmPlanMachineId?: string | null | undefined;
                  woTaskId?: string | null | undefined;
                  employeeTechnicianId?: string | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          record: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      };
    } & {
      fleet: {
        "work-order": {};
      } & {
        "work-order": {
          task: {};
        } & {
          task: {
            get: {
              body: {};
              params: {};
              query: {
                workOrderId?: string | undefined;
                isWorkOrderId?: boolean | undefined;
                pagination: {
                  size: number;
                  page: number;
                };
              };
              headers: {};
              response: {
                200: {
                  totalCount: number;
                  totalPage: number;
                  result: Omit<
                    {
                      task: {
                        machineId: string | null;
                        sourceType: string | null;
                        priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED" | null;
                        workOrderId: string | null;
                        templateId: string | null;
                        serviceKindId: string | null;
                        companyServiceKindId: string | null;
                        description: string | null;
                        manHour: number | null;
                        state: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED";
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      };
                      serviceKind: {
                        name: string;
                        description: string | null;
                        categoryId: string | null;
                        code: string | null;
                        laborTime: number | null;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      companyServiceKind: {
                        serviceKindId: string | null;
                        companyId: string;
                        branchId: string | null;
                        name: string;
                        description: string | null;
                        enabled: boolean;
                        price: number;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      machine: {
                        companyId: string | null;
                        machineKindId: string;
                        customerId: string | null;
                        name: string | null;
                        assetCode: string | null;
                        vin: string | null;
                        licensePlate: string | null;
                        color: string | null;
                        engineCc: string | null;
                        cylinder: string | null;
                        gasType: string | null;
                        transmissionType: string | null;
                        vehicleType: string | null;
                        yearManufacture: number | null;
                        yearImport: number | null;
                        steering: string | null;
                        engineCode: string | null;
                        transmissionCode: string | null;
                        driveTrain: string | null;
                        km: number;
                        customData: unknown;
                        id: string;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                      } | null;
                      totalCount: number;
                    },
                    "totalCount"
                  >[];
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          task: {
            post: {
              body: {
                state?: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED" | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                serviceKindId?: string | null | undefined;
                companyServiceKindId?: string | null | undefined;
                templateId?: string | null | undefined;
                machineId?: string | null | undefined;
                sourceType?: string | null | undefined;
                priority?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED" | null | undefined;
                workOrderId?: string | null | undefined;
                manHour?: number | null | undefined;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  state: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED";
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                  description: string | null;
                  serviceKindId: string | null;
                  companyServiceKindId: string | null;
                  templateId: string | null;
                  machineId: string | null;
                  sourceType: string | null;
                  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED" | null;
                  workOrderId: string | null;
                  manHour: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        } & {
          task: {
            ":id": {
              put: {
                body: {
                  state?: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED" | undefined;
                  oldId?: number | null | undefined;
                  description?: string | null | undefined;
                  serviceKindId?: string | null | undefined;
                  companyServiceKindId?: string | null | undefined;
                  templateId?: string | null | undefined;
                  machineId?: string | null | undefined;
                  sourceType?: string | null | undefined;
                  priority?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED" | null | undefined;
                  workOrderId?: string | null | undefined;
                  manHour?: number | null | undefined;
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        } & {
          task: {
            ":id": {
              delete: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        "work-order": {
          get: {
            body: {};
            params: {};
            query: {
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    wo: {
                      machineId: string;
                      sourceType: string | null;
                      type: "CORRECTIVE" | "PREVENTIVE";
                      priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED";
                      state: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED";
                      dateClosed: Date | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    machine: {
                      companyId: string | null;
                      machineKindId: string;
                      customerId: string | null;
                      name: string | null;
                      assetCode: string | null;
                      vin: string | null;
                      licensePlate: string | null;
                      color: string | null;
                      engineCc: string | null;
                      cylinder: string | null;
                      gasType: string | null;
                      transmissionType: string | null;
                      vehicleType: string | null;
                      yearManufacture: number | null;
                      yearImport: number | null;
                      steering: string | null;
                      engineCode: string | null;
                      transmissionCode: string | null;
                      driveTrain: string | null;
                      km: number;
                      customData: unknown;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    } | null;
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "work-order": {
          post: {
            body: {
              state?: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED" | undefined;
              oldId?: number | null | undefined;
              sourceType?: string | null | undefined;
              dateClosed?: Date | null | undefined;
              type: "CORRECTIVE" | "PREVENTIVE";
              machineId: string;
              priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED";
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                state: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED";
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                type: "CORRECTIVE" | "PREVENTIVE";
                machineId: string;
                sourceType: string | null;
                priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED";
                dateClosed: Date | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        "work-order": {
          ":id": {
            put: {
              body: {
                state?: "COMPLETED" | "IN_PROGRESS" | "OPEN" | "CLOSED" | undefined;
                oldId?: number | null | undefined;
                type?: "CORRECTIVE" | "PREVENTIVE" | undefined;
                machineId?: string | undefined;
                sourceType?: string | null | undefined;
                priority?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "PLANNED" | undefined;
                dateClosed?: Date | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "work-order": {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      uom: {};
    } & {
      uom: {
        category: {};
      } & {
        category: {
          get: {
            body: {};
            params: {};
            query: {
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    name: string;
                    description: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        category: {
          post: {
            body: {
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        category: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  description: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        category: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      uom: {
        conversion: {};
      } & {
        conversion: {
          get: {
            body: {};
            params: {};
            query: {
              uomOneId?: string | undefined;
              uomTwoId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    totalCount: number;
                    uomOneId: string;
                    uomTwoId: string;
                    factor: number | null;
                    isActive: boolean;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        conversion: {
          post: {
            body: {
              oldId?: number | null | undefined;
              factor?: number | null | undefined;
              isActive?: boolean | undefined;
              uomOneId: string;
              uomTwoId: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                uomOneId: string;
                uomTwoId: string;
                factor: number | null;
                isActive: boolean;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        conversion: {
          ":id": {
            put: {
              body: {
                oldId?: number | null | undefined;
                uomOneId?: string | undefined;
                uomTwoId?: string | undefined;
                factor?: number | null | undefined;
                isActive?: boolean | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  uomOneId: string;
                  uomTwoId: string;
                  factor: number | null;
                  isActive: boolean;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        conversion: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      uom: {
        get: {
          body: {};
          params: {};
          query: {
            uomCategoryId?: string | undefined;
            pagination: {
              size: number;
              page: number;
            };
          };
          headers: {};
          response: {
            200: {
              totalCount: number;
              totalPage: number;
              result: Omit<
                {
                  totalCount: number;
                  uomCategoryId: string;
                  code: string | null;
                  name: string;
                  description: string | null;
                  symbol: string | null;
                  isBaseUnit: boolean;
                  baseFactor: number | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                },
                "totalCount"
              >[];
            };
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            403: "Хандах эрхгүй байна.";
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
          };
        };
      };
    } & {
      uom: {
        post: {
          body: {
            symbol?: string | null | undefined;
            code?: string | null | undefined;
            oldId?: number | null | undefined;
            description?: string | null | undefined;
            isBaseUnit?: boolean | undefined;
            baseFactor?: number | null | undefined;
            name: string;
            uomCategoryId: string;
          };
          params: {};
          query: {};
          headers: {};
          response: {
            200: {
              symbol: string | null;
              id: string;
              name: string;
              createdAt: string;
              updatedAt: string;
              code: string | null;
              deletedAt: string | null;
              oldId: number | null;
              description: string | null;
              uomCategoryId: string;
              isBaseUnit: boolean;
              baseFactor: number | null;
            };
            401: "Токен олдсонгүй";
            404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
            402: "Системийн төлбөр хийгдээгүй байна. 88046194";
            403: "Хандах эрхгүй байна.";
            422: {
              type: "validation";
              on: string;
              summary?: string;
              message?: string;
              found?: unknown;
              property?: string;
              expected?: string;
            };
          };
        };
      };
    } & {
      uom: {
        ":id": {
          put: {
            body: {
              symbol?: string | null | undefined;
              name?: string | undefined;
              code?: string | null | undefined;
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              uomCategoryId?: string | undefined;
              isBaseUnit?: boolean | undefined;
              baseFactor?: number | null | undefined;
            };
            params: {
              id: string;
            };
            query: {};
            headers: {};
            response: {
              200: {
                uomCategoryId: string;
                code: string | null;
                name: string;
                description: string | null;
                symbol: string | null;
                isBaseUnit: boolean;
                baseFactor: number | null;
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      };
    } & {
      uom: {
        ":id": {
          delete: {
            body: {};
            params: {
              id: string;
            };
            query: {};
            headers: {};
            response: {
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              403: "Хандах эрхгүй байна.";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      };
    };
  } & {
    api: {
      notification: {
        device: {};
      } & {
        device: {
          get: {
            body: {};
            params: {};
            query: {
              isActive?: boolean | undefined;
              authUserId?: string | undefined;
              platform?: "IOS" | "ANDROID" | "WEB" | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    device: {
                      authUserId: string;
                      nmToken: string | null;
                      platform: "IOS" | "ANDROID" | "WEB";
                      isActive: boolean;
                      timeLastActive: string;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        device: {
          post: {
            body: {
              oldId?: number | null | undefined;
              isActive?: boolean | undefined;
              nmToken?: string | null | undefined;
              timeLastActive?: string | undefined;
              authUserId: string;
              platform: "IOS" | "ANDROID" | "WEB";
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                isActive: boolean;
                authUserId: string;
                nmToken: string | null;
                platform: "IOS" | "ANDROID" | "WEB";
                timeLastActive: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        device: {
          ":id": {
            put: {
              body: {
                oldId?: number | null | undefined;
                isActive?: boolean | undefined;
                authUserId?: string | undefined;
                nmToken?: string | null | undefined;
                platform?: "IOS" | "ANDROID" | "WEB" | undefined;
                timeLastActive?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  authUserId: string;
                  nmToken: string | null;
                  platform: "IOS" | "ANDROID" | "WEB";
                  isActive: boolean;
                  timeLastActive: string;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Device not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        device: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  authUserId: string;
                  nmToken: string | null;
                  platform: "IOS" | "ANDROID" | "WEB";
                  isActive: boolean;
                  timeLastActive: string;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Device not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      notification: {
        channel: {};
      } & {
        channel: {
          get: {
            body: {};
            params: {};
            query: {
              name?: string | undefined;
              nmKey?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    channel: {
                      name: string;
                      description: string | null;
                      nmKey: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        channel: {
          post: {
            body: {
              oldId?: number | null | undefined;
              description?: string | null | undefined;
              nmKey?: string | null | undefined;
              name: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                description: string | null;
                nmKey: string | null;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              409: string;
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        channel: {
          ":id": {
            "auth-users": {
              get: {
                body: {};
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    user: {
                      id: string;
                      name: string;
                      email: string;
                      emailVerified: boolean;
                      image: string | null;
                      createdAt: Date;
                      updatedAt: Date;
                      companyId: string;
                      branchId: string;
                      kind: "ADMIN" | "COMPANY_ADMIN" | "CUSTOMER" | "INSPECTION";
                      employeeId: string | null;
                      role: string | null;
                      banned: boolean | null;
                      banReason: string | null;
                      banExpires: Date | null;
                    };
                    channel_auth_user: {
                      nmChannelId: string;
                      authUserId: string;
                      enabled: boolean;
                    };
                  }[];
                  401: "Токен олдсонгүй";
                  404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      } & {
        channel: {
          ":id": {
            put: {
              body: {
                name?: string | undefined;
                oldId?: number | null | undefined;
                description?: string | null | undefined;
                nmKey?: string | null | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  name: string;
                  description: string | null;
                  nmKey: string | null;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Бүртгэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                409: string;
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        channel: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      notification: {
        notification: {};
      } & {
        notification: {
          get: {
            body: {};
            params: {};
            query: {
              nmChannelId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    notification: {
                      nmChannelId: string;
                      title: string;
                      body: string;
                      data: unknown;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    channel: {
                      name: string;
                      description: string | null;
                      nmKey: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        notification: {
          post: {
            body: {
              data?: import("drizzle-typebox").Json | undefined;
              oldId?: number | null | undefined;
              body: string;
              nmChannelId: string;
              title: string;
            };
            params: {};
            query: {};
            headers: {};
            response: {
              200: {
                body: string;
                id: string;
                data: unknown;
                createdAt: string;
                updatedAt: string;
                deletedAt: string | null;
                oldId: number | null;
                nmChannelId: string;
                title: string;
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        notification: {
          send: {
            post: {
              body: {
                data?: {} | undefined;
                body: string;
                nmChannelId: string;
                title: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200:
                  | {
                      notification: {
                        body: string;
                        id: string;
                        data: unknown;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                        nmChannelId: string;
                        title: string;
                      };
                      sent: number;
                      failed: number;
                      message: string;
                      totalDevices?: undefined;
                    }
                  | {
                      notification: {
                        body: string;
                        id: string;
                        data: unknown;
                        createdAt: string;
                        updatedAt: string;
                        deletedAt: string | null;
                        oldId: number | null;
                        nmChannelId: string;
                        title: string;
                      };
                      sent: number;
                      failed: number;
                      totalDevices: number;
                      message?: undefined;
                    };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Channel not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        notification: {
          ":id": {
            put: {
              body: {
                body?: string | undefined;
                data?: import("drizzle-typebox").Json | undefined;
                oldId?: number | null | undefined;
                nmChannelId?: string | undefined;
                title?: string | undefined;
              };
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                200: {
                  nmChannelId: string;
                  title: string;
                  body: string;
                  data: unknown;
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  deletedAt: string | null;
                  oldId: number | null;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Notification not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        notification: {
          ":id": {
            delete: {
              body: {};
              params: {
                id: string;
              };
              query: {};
              headers: {};
              response: {
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      };
    } & {
      notification: {
        message: {};
      } & {
        message: {
          get: {
            body: {};
            params: {};
            query: {
              state?: "DELIVERED" | "PENDING" | "FAILED" | "SENT" | "READ" | undefined;
              nmNotificationId?: string | undefined;
              nmDeviceId?: string | undefined;
              pagination: {
                size: number;
                page: number;
              };
            };
            headers: {};
            response: {
              200: {
                totalCount: number;
                totalPage: number;
                result: Omit<
                  {
                    message: {
                      nmNotificationId: string;
                      nmDeviceId: string;
                      providerMessageId: string;
                      state: "DELIVERED" | "PENDING" | "FAILED" | "SENT" | "READ";
                      timeSent: string | null;
                      timeDelivered: string | null;
                      timeRead: string | null;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    notification: {
                      nmChannelId: string;
                      title: string;
                      body: string;
                      data: unknown;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    device: {
                      authUserId: string;
                      nmToken: string | null;
                      platform: "IOS" | "ANDROID" | "WEB";
                      isActive: boolean;
                      timeLastActive: string;
                      id: string;
                      createdAt: string;
                      updatedAt: string;
                      deletedAt: string | null;
                      oldId: number | null;
                    };
                    totalCount: number;
                  },
                  "totalCount"
                >[];
              };
              401: "Токен олдсонгүй";
              404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
              402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              422: {
                type: "validation";
                on: string;
                summary?: string;
                message?: string;
                found?: unknown;
                property?: string;
                expected?: string;
              };
            };
          };
        };
      } & {
        message: {
          ":id": {
            state: {
              put: {
                body: {
                  timeDelivered?: string | undefined;
                  timeRead?: string | undefined;
                  state: "DELIVERED" | "READ";
                };
                params: {
                  id: string;
                };
                query: {};
                headers: {};
                response: {
                  200: {
                    nmNotificationId: string;
                    nmDeviceId: string;
                    providerMessageId: string;
                    state: "DELIVERED" | "PENDING" | "FAILED" | "SENT" | "READ";
                    timeSent: string | null;
                    timeDelivered: string | null;
                    timeRead: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                  401: "Токен олдсонгүй";
                  404:
                    | "Байгууллагын мэдээлэл олдсонгүй."
                    | "Салбарын мэдээлэл олдсонгүй."
                    | "Message not found";
                  402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                  422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                  };
                };
              };
            };
          };
        };
      };
    } & {
      notification: {
        "channel-auth-user": {};
      } & {
        "channel-auth-user": {
          subscribe: {
            post: {
              body: {
                enabled?: boolean | undefined;
                authUserId: string;
                nmChannelId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  authUserId: string;
                  nmChannelId: string;
                  enabled: boolean;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Channel not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "channel-auth-user": {
          unsubscribe: {
            post: {
              body: {
                authUserId: string;
                nmChannelId: string;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  nmChannelId: string;
                  authUserId: string;
                  enabled: boolean;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Subscription not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "channel-auth-user": {
          update: {
            put: {
              body: {
                authUserId: string;
                nmChannelId: string;
                enabled: boolean;
              };
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  nmChannelId: string;
                  authUserId: string;
                  enabled: boolean;
                };
                401: "Токен олдсонгүй";
                404:
                  | "Байгууллагын мэдээлэл олдсонгүй."
                  | "Салбарын мэдээлэл олдсонгүй."
                  | "Subscription not found";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
                422: {
                  type: "validation";
                  on: string;
                  summary?: string;
                  message?: string;
                  found?: unknown;
                  property?: string;
                  expected?: string;
                };
              };
            };
          };
        };
      } & {
        "channel-auth-user": {
          "my-channels": {
            get: {
              body: {};
              params: {};
              query: {};
              headers: {};
              response: {
                200: {
                  subscription: {
                    nmChannelId: string;
                    authUserId: string;
                    enabled: boolean;
                  };
                  channel: {
                    name: string;
                    description: string | null;
                    nmKey: string | null;
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    deletedAt: string | null;
                    oldId: number | null;
                  };
                }[];
                401: "Токен олдсонгүй";
                404: "Байгууллагын мэдээлэл олдсонгүй." | "Салбарын мэдээлэл олдсонгүй.";
                402: "Системийн төлбөр хийгдээгүй байна. 88046194";
              };
            };
          };
        };
      };
    };
  },
  {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
  },
  {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
  } & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
  } & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
  } & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
  }
>;
export type App = typeof app;
