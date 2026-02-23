#!/bin/bash

# Exit on error
set -e

# Get the directory where this script is located.
# This ensures we find the SQL file even if run from the project root.
SCRIPT_DIR=$(dirname "$0")
SQL_SEED_FILE="$SCRIPT_DIR/seed.sql"

echo "--- D&D Mapp: Database Seeding ---"

if [ ! -f "$SQL_SEED_FILE" ]; then
    echo "Error: Seed file '$SQL_SEED_FILE' not found."
    exit 1
fi

echo "Connecting to: $DB_HOST:$DB_PORT (Database: $DB_NAME)"

# Execute the SQL script using the injected environment variables
# We use the -e flag to catch execution errors within the SQL itself
mariadb -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$SQL_SEED_FILE"

if [ $? -eq 0 ]; then
  echo "Successfully seeded '$DB_NAME' using $SQL_SEED_FILE"
else
    echo "Error: SQL execution failed."
    exit 1
fi
