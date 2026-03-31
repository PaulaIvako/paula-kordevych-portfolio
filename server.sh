#!/bin/bash
# Skrypt do zarządzania serwerem portfolio

cd "$(dirname "$0")"

case "$1" in
  start)
    if tmux has-session -t portfolio-server 2>/dev/null; then
      echo "Serwer już działa w sesji tmux 'portfolio-server'"
      echo "Strona: http://localhost:3000/"
    else
      echo "Uruchamianie serwera..."
      tmux new-session -d -s portfolio-server "npm run dev"
      sleep 3
      echo "Serwer uruchomiony!"
      echo "Strona: http://localhost:3000/"
      echo ""
      echo "Komendy:"
      echo "  ./server.sh stop     - zatrzymaj serwer"
      echo "  ./server.sh logs     - zobacz logi"
      echo "  ./server.sh attach   - wejdź do sesji (Ctrl+B, D aby wyjść)"
    fi
    ;;
  
  stop)
    if tmux has-session -t portfolio-server 2>/dev/null; then
      tmux kill-session -t portfolio-server
      echo "Serwer zatrzymany"
    else
      echo "Serwer nie jest uruchomiony"
    fi
    ;;
  
  logs)
    if tmux has-session -t portfolio-server 2>/dev/null; then
      tmux capture-pane -t portfolio-server -p | tail -30
    else
      echo "Serwer nie jest uruchomiony"
    fi
    ;;
  
  attach)
    if tmux has-session -t portfolio-server 2>/dev/null; then
      echo "Wchodzenie do sesji... (Ctrl+B, D aby wyjść)"
      sleep 1
      tmux attach -t portfolio-server
    else
      echo "Serwer nie jest uruchomiony. Uruchom: ./server.sh start"
    fi
    ;;
  
  open)
    open http://localhost:3000/
    ;;
  
  status)
    if tmux has-session -t portfolio-server 2>/dev/null; then
      echo "Serwer działa ✓"
      echo "Strona: http://localhost:3000/"
      echo "Sesja tmux: portfolio-server"
    else
      echo "Serwer nie działa ✗"
    fi
    ;;
  
  *)
    echo "Użycie: ./server.sh {start|stop|logs|attach|open|status}"
    echo ""
    echo "Komendy:"
    echo "  start   - uruchom serwer"
    echo "  stop    - zatrzymaj serwer"
    echo "  logs    - pokaż ostatnie logi"
    echo "  attach  - wejdź do sesji (Ctrl+B, D aby wyjść)"
    echo "  open    - otwórz stronę w przeglądarce"
    echo "  status  - sprawdź status serwera"
    ;;
esac