#!/bin/bash

# Skrypt do uruchamiania serwera deweloperskiego

cd "$(dirname "$0")"

# Sprawdź czy serwer już działa
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "Serwer już działa na porcie 3000"
    open http://localhost:3000/
    exit 0
fi

# Uruchom serwer w tle
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

# Poczekaj na uruchomienie
echo "Uruchamianie serwera..."
sleep 3

# Sprawdź czy serwer działa
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "Serwer działa na http://localhost:3000/"
    echo "PID serwera: $SERVER_PID"
    echo "Aby zatrzymać serwer: kill $SERVER_PID"
    open http://localhost:3000/
else
    echo "Błąd przy uruchamianiu serwera"
    exit 1
fi