#!/bin/sh

API="http://localhost:4741"
URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Directorization: Bearer ${TOKEN}"

echo
