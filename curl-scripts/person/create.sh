
curl 'http://localhost:4741/persons' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "person": {
      "firstName": "'"${FIRSTNAME}"'",
      "lastName": "'"${LASTNAME}"'"
    }
  }'
