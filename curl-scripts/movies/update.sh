
  curl "http://localhost:4741/movies/${ID}" \
    --include \
    --request PATCH \
    --header "Content-Type: application/json" \
    --data '{
      "movie": {
        "title": "'"${TITLE}"'",
        "director": "'"${AUTHOR}"'"
      }
    }'
