import { AsyncLocalStorage } from "node:async_hooks";

type RequestContext = {
  requestId: string;
};

const requestContext = new AsyncLocalStorage<RequestContext>();

export const runWithRequestContext = <T>(context: RequestContext, fn: () => T): T =>
  requestContext.run(context, fn);

export const getRequestId = (): string | undefined =>
  requestContext.getStore()?.requestId;
