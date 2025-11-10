import { goto, validateResponse } from "../utils/request-helper";

export function homePageTest(): boolean {
  const response = goto("/", "home_html");
  return validateResponse(response, 200, "home_html");
}
