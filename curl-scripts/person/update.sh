
  curl "http://localhost:4741/persons/${ID}" \
    --include \
    --request PATCH \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${TOKEN}" \
    --data '{
      "person": {
        "firstName": "'"${FIRSTNAME}"'",
        "lastName": "'"${LASTNAME}"'"
      }
    }'
