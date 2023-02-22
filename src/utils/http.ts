import { HttpStatusCode } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

function getExceptionStatus(exception: unknown) {
  return exception instanceof ApiError
    ? exception.statusCode
    : HttpStatusCode.InternalServerError;
}

function getExceptionMessage(exception: unknown) {
  return isError(exception) ? exception.message : `Internal Server Error`;
}

function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined;
}

function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}
