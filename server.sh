#!/bin/bash

# Skrypt zarządzający serwerem deweloperskim Astro
# Użycie: ./server.sh [start|stop|restart|status|logs|open|attach]

SESSION_NAME="portfolio-server"
WORKDIR="/Users/paulakordevych/Desktop/Projekty/Portfolio test"

show_help() {
    echo "Użycie: ./server.sh [komenda]"
    echo ""
    echo "Komendy:"
    echo "  start   - Uruchom serwer Astro"
    echo "  stop    - Zatrzymaj serwer"
    echo "  restart - Zrestartuj serwer"
    echo "  status  - Sprawdź status serwera"
    echo "  logs    - Pokaż logi serwera"
    echo "  open    - Otwórz stronę w przeglądarce"
    echo "  attach  - Dołącz do sesji tmux (Ctrl+B, D aby wyjść)"
    echo "  help    - Pokaż tę pomoc"
}

case "${1:-help}" in
    start)
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "Serwer już działa! Użyj './server.sh logs' aby zobaczyć logi."
            exit 0
        fi
        
        echo "Uruchamianie serwera Astro..."
        cd "$WORKDIR"
        tmux new-session -d -s "$SESSION_NAME" "npm run dev"
        sleep 3
        
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "Serwer uruchomiony!"
            echo "Strona dostępna pod adresem: http://localhost:3000"
            echo "Użyj './server.sh open' aby otworzyć w przeglądarce"
            echo "Użyj './server.sh logs' aby zobaczyć logi"
        else
            echo "BŁĄD: Nie udało się uruchomić serwera"
            exit 1
        fi
        ;;
    
    stop)
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            tmux kill-session -t "$SESSION_NAME"
            echo "Serwer zatrzymany."
        else
            echo "Serwer nie jest uruchomiony."
        fi
        ;;
    
    restart)
        $0 stop
        sleep 1
        $0 start
        ;;
    
    status)
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "Serwer jest URUCHOMIONY"
            echo "Adres: http://localhost:3000"
            echo "Sesja tmux: $SESSION_NAME"
        else
            echo "Serwer jest ZATRZYMANY"
        fi
        ;;
    
    logs)
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            tmux attach-session -t "$SESSION_NAME"
        else
            echo "Serwer nie jest uruchomiony. Użyj './server.sh start'"
        fi
        ;;
    
    attach)
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            tmux attach-session -t "$SESSION_NAME"
        else
            echo "Serwer nie jest uruchomiony. Użyj './server.sh start'"
        fi
        ;;
    
    open)
        if command -v open >/dev/null 2>&1; then
            open "http://localhost:3000"
        elif command -v xdg-open >/dev/null 2>&1; then
            xdg-open "http://localhost:3000"
        else
            echo "Otwórz ręcznie: http://localhost:3000"
        fi
        ;;
    
    help|--help|-h)
        show_help
        ;;
    
    *)
        echo "Nieznana komenda: $1"
        show_help
        exit 1
        ;;
esac
