import { post } from "../../utils/fetch.ts";

export const get_files = (p: any = {}) =>
  post("/general/upload_daily_file_list", p);
export const delete_file = (p: any = {}) =>
  post("/general/upload_daily_file_delete", p);
