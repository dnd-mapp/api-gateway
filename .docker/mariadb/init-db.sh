#!/bin/bash

set -e

# These variables are used to ensure the script is
# consistent with your documentation and .env
DB_NAME=${DB_NAME:-dma_api_dev}
DB_SHADOW_NAME="${DB_NAME}_shadow"
DB_USER=${DB_USER:-root}
DB_PASS=$(cat "/run/secrets/mariadb_user_password")
MARIADB_ROOT_PASSWORD=$(cat "/run/secrets/mariadb_root_password")

echo "Starting Database Initialization..."

mariadb -u root -p"$MARIADB_ROOT_PASSWORD" <<-EOSQL
    -- Create the main and shadow databases
    CREATE DATABASE IF NOT EXISTS \`$DB_NAME\`;
    CREATE DATABASE IF NOT EXISTS \`$DB_SHADOW_NAME\`;

    -- Create the user if it doesn't exist and set password
    CREATE USER IF NOT EXISTS '$DB_USER'@'%' IDENTIFIED BY '$DB_PASS';

    -- Grant privileges
    GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'%';
    GRANT ALL PRIVILEGES ON \`$DB_SHADOW_NAME\`.* TO '$DB_USER'@'%';

    FLUSH PRIVILEGES;
EOSQL

echo "Database and User setup completed successfully."
