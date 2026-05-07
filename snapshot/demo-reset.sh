#!/bin/sh
# Nakliye demo reset — JSON db'yi seed snapshot'tan geri yükler.
set -e

SEED=/opt/snapshot/seed.json
TARGET=/app/data/db.json

if [ ! -f "$SEED" ]; then
    echo "[nakliye-reset] seed yok: $SEED" >&2
    exit 0
fi

# Lock — paralel reset'i önle
LOCK=/tmp/nakliye-demo-reset.lock
if [ -f "$LOCK" ]; then
    AGE=$(( $(date +%s) - $(stat -c %Y "$LOCK" 2>/dev/null || echo 0) ))
    [ "$AGE" -lt 30 ] && exit 0
fi
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT

cp "$SEED" "$TARGET"
echo "[nakliye-reset] $(date) tamamlandı"
