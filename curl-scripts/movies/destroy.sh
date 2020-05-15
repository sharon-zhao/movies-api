curl "http://localhost:4741/books/${ID}" \
  --include \
  --request DELETE \
  # --header "Content-Type: application/json" \
  # --data '{
  #   "book": {
  #     "title": "'"${TITLE}"'",
  #     "author": "'"${AUTHOR}"'"
  #   }
  # }'
