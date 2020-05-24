
curl 'http://localhost:4741/movies' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
   --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "movie": {
      "title": "'"${TITLE}"'",
      "director": "'"${PERSONID}"'",
      "author": "'"${ID}"'"
    }
  }'
