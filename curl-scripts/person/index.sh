# sh
curl "http://localhost:4741/persons" \
 --include \
 --request GET \
 --header "Authorization: Bearer ${TOKEN}"
