\connect quietavenue
CREATE ROLE readaccess;
GRANT CONNECT ON DATABASE quietavenue TO readaccess;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readaccess;
-- add password DBProxy-password-secret created by secrets manager in the template.yaml
CREATE USER read_user WITH PASSWORD 'gmVABGVPOR44JoXn1rXziVq4yKk12R'; -- the password has to be in single quotes ''
GRANT readaccess TO read_user; -- The user name (read_user) has to be the same used in `samconfig.toml`