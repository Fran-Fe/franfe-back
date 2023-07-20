#!/bin/sh

APP_MIGRATION_SCRIPT_NAME=app_migration.sql
APP_MIGRATION_SCRIPT=test/db/${APP_MIGRATION_SCRIPT_NAME}

A=`ls migrations/real_queries | wc -l`

if [ ${A} -eq 0 ]; then
  echo "----------------------------------------------------"
  echo "Migration Script is Null!"
  echo "----------------------------------------------------"
  exit 0
fi

if [ -f $APP_MIGRATION_SCRIPT ]; then
  rm -f $APP_MIGRATION_SCRIPT
  echo "Delete Before Migration Script"
fi

FILE_LIST=`ls migrations/real_queries/*`

for item in ${FILE_LIST[@]}
do
  cat $item >> $APP_MIGRATION_SCRIPT
  echo "" >> $APP_MIGRATION_SCRIPT
  echo "" >> $APP_MIGRATION_SCRIPT
done
