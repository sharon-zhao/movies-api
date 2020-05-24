
curl 'http://localhost:4741/persons' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "person": {
      "firstName": "'"${FIRSTNAME}"'",
      "lastName": "'"${LASTNAME}"'",
      "author": "'"${ID}"'"
    }
  }'
