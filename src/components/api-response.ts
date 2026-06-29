type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function normalizePaginatedResponse<T extends { result?: unknown[] }>(
  value: unknown,
  fallback: Partial<T> = {}
): T {
  if (Array.isArray(value)) {
    return {
      ...fallback,
      result: value,
    } as T;
  }

  const record = isRecord(value) ? value : {};

  return {
    ...fallback,
    ...record,
    result: Array.isArray(record.result) ? record.result : [],
  } as T;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Серверийн алдаа гарлаа. Дахин оролдоно уу."
) {
  const candidates: unknown[] = [];

  if (isNonEmptyString(error)) {
    candidates.push(error);
  }

  if (isRecord(error)) {
    candidates.push(error.value, error.message);

    if (isRecord(error.error)) {
      candidates.push(error.error.value, error.error.message);
    }
  }

  const message = candidates.find(isNonEmptyString)?.trim();

  if (!message) {
    return fallback;
  }

  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage === "internal server error" ||
    normalizedMessage.includes("internal server error")
  ) {
    return fallback;
  }

  return message;
}
