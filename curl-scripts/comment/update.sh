
  curl "http://localhost:4741/comments/${BOOKID}/${COMMENTID}" \
    --include \
    --request PATCH \
    --header "Content-Type: application/json" \
    --data '{
      "comments": {
        "title": "'"${TITLE}"'",
        "body": "'"${BODY}"'"
      }
    }'
