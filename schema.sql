-- schema.sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resolution VARCHAR(50),
  local_language VARCHAR(10),
  m1 VARCHAR(255),
  oaid VARCHAR(255),
  channel VARCHAR(50),
  app_version VARCHAR(20),
  app_name VARCHAR(100),
  pkg_name VARCHAR(100),
  device_id VARCHAR(100),
  platform VARCHAR(20),
  os_version VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
