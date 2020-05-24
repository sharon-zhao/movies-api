
  curl "http://localhost:4741/movies/${ID}" \
    --include \
    --request PATCH \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${TOKEN}" \
    --data '{
      "movie": {
        "title": "'"${TITLE}"'",
        "director": "'"${DIRECTORID}"'"
      }
    }'
