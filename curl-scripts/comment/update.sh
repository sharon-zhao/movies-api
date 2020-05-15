
  curl "http://localhost:4741/comments/${MOVIEID}/${COMMENTID}" \
    --include \
    --request PATCH \
    --header "Content-Type: application/json" \
    --data '{
      "comments": {
        "title": "'"${TITLE}"'",
        "body": "'"${BODY}"'"
      }
    }'
