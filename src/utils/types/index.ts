/* eslint-disable @typescript-eslint/no-explicit-any */
export type GetTreatyType<T extends () => any> = NonNullable<Awaited<ReturnType<T>>["data"]>;
export type GetBodyType<T extends (...a: any) => any> = Parameters<T>[0];

// type Post = GetBodyType<(typeof apiClient.api.company)["service-kind"]["post"]>;
