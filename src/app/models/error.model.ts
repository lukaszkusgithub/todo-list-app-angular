/**
 * Model representing an error while fetching the task list.
 */
export type ListFetchingError = {
  status: number; // HTTP status code indicating the error type
  message: string; // Error message describing what went wrong
};
