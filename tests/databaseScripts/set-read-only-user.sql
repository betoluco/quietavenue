\connect quietavenue
CREATE ROLE readaccess;
GRANT CONNECT ON DATABASE quietavenue TO readaccess;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readaccess;
-- add password DBProxy-password-secret created by secrets manager in the template.yaml
CREATE USER read_user WITH PASSWORD 'M30Z7BFllfWD7jB5HEiAHQRb28qQy2'; -- the password has to be in single quotes ''
GRANT readaccess TO read_user;