#!/bin/sh
set -ex
psql "$DATABASE_URL" -f ./prisma/seed_data.sql
