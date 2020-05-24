curl "http://localhost:4741/movies/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \
