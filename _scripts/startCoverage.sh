docker compose -f docker-compose.yaml -f docker-compose.test.yaml up -d
docker exec -it quizzer_test_server bash -c "npm install && npm run coverage"
