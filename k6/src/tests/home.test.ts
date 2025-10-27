import { goto, validateResponse } from "../utils/request-helper.js";

export function homePageTest(): boolean {
  const response = goto("/", "home_html");
  return validateResponse(response, 200, "home_html");
}
