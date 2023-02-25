import { NextResponse } from "next/server";
import withDatabaseConnection from "./withDatabaseConnect";

export function defaultMiddleware() {
  return NextResponse.next();
}

export default withDatabaseConnection(defaultMiddleware);