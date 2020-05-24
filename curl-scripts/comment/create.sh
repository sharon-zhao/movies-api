
curl "http://localhost:4741/comments" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'",
      "movie_id": "'"${MOVIEID}"'"
    }
  }'
