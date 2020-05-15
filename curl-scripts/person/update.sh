
  curl "http://localhost:4741/persons/${ID}" \
    --include \
    --request PATCH \
    --header "Content-Type: application/json" \
    --data '{
      "person": {
        "firstName": "'"${FIRSTNAME}"'",
        "lastName": "'"${LASTNAME}"'"
      }
    }'
