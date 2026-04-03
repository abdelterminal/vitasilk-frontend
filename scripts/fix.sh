#!/bin/bash
# Vitasilk — Quick Fix Script
# Usage: ./fix.sh [ssl|gateway|deploy|logs|status]

SITE_DIR="/docker/vitasilk"
FRONTEND="vitasilk-frontend-1"
BACKEND="vitasilk-backend-1"

case "$1" in

  ssl)
    echo "[fix] Clearing stale SSL certs and restarting Traefik..."
    docker stop n8n-traefik-1
    docker run --rm -v traefik_data:/letsencrypt alpine rm -f /letsencrypt/acme.json
    docker start n8n-traefik-1
    echo "[fix] Done. Wait 30 seconds for certs to re-issue, then check the site."
    ;;

  gateway)
    echo "[fix] Force-recreating containers to fix Bad Gateway..."
    cd "$SITE_DIR"
    docker compose up -d --force-recreate
    echo "[fix] Done."
    ;;

  deploy)
    echo "[fix] Pulling latest code and redeploying..."
    cd "$SITE_DIR"
    git -C vitasilk-frontend pull
    git -C vitasilk-backend pull
    docker compose up -d --build --force-recreate
    echo "[fix] Done."
    ;;

  logs)
    TARGET=${2:-frontend}
    if [ "$TARGET" = "backend" ]; then
      docker logs "$BACKEND" --tail 80
    elif [ "$TARGET" = "traefik" ]; then
      docker logs n8n-traefik-1 --tail 50
    else
      docker logs "$FRONTEND" --tail 80
    fi
    ;;

  status)
    echo "[status] Running containers:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "NAME|vitasilk|traefik"
    ;;

  restart)
    TARGET=${2:-all}
    if [ "$TARGET" = "frontend" ]; then
      docker restart "$FRONTEND" && echo "[fix] Frontend restarted."
    elif [ "$TARGET" = "backend" ]; then
      docker restart "$BACKEND" && echo "[fix] Backend restarted."
    elif [ "$TARGET" = "traefik" ]; then
      docker restart n8n-traefik-1 && echo "[fix] Traefik restarted."
    else
      docker restart "$FRONTEND" "$BACKEND" && echo "[fix] Frontend + backend restarted."
    fi
    ;;

  *)
    echo ""
    echo "Vitasilk Fix Script"
    echo "-------------------"
    echo "Usage: ./fix.sh <command> [option]"
    echo ""
    echo "Commands:"
    echo "  ssl              Clear stale SSL certs + restart Traefik (fixes Gateway Timeout)"
    echo "  gateway          Force-recreate containers (fixes Bad Gateway after deploy)"
    echo "  deploy           Pull latest code + rebuild + force-recreate"
    echo "  logs             Show frontend logs (default)"
    echo "  logs backend     Show backend logs"
    echo "  logs traefik     Show Traefik logs"
    echo "  status           Show running containers"
    echo "  restart          Restart frontend + backend"
    echo "  restart frontend Restart frontend only"
    echo "  restart backend  Restart backend only"
    echo "  restart traefik  Restart Traefik only"
    echo ""
    ;;

esac
