export const hasErrorField = (
  error: unknown,
): error is { data: { error: string } } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object"
  )
}