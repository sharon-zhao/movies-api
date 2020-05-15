
curl "http://localhost:4741/comments" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'",
      "movie_id": "'"${MOVIEID}"'",
      "commenter":"'"${PERSONID}"'"
    }
  }'
