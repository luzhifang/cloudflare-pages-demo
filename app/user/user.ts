// user.ts

export default interface User {
  id: number;
  resolution: string;
  local_language: string;
  m1: string;
  oaid: string;
  channel: string;
  app_version: string;
  app_name: string;
  pkg_name: string;
  device_id: string;
  platform: string;
  os_version: string;
  created_at: Date;
}
