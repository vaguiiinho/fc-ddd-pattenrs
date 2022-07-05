# ddd-pattenrs

docker run -d --name ddd-patterns -v ~/workspace/estudo/fullcycle/ddd-pattenrs/:/app -w /app node tail -f /dev/null

npm run test src/domain/event/@shared/event-dispatcher.spec.ts
