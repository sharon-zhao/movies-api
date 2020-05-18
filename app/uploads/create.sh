
API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --form "file=@dog.jpg"\
  --form "title=Spudtacular"

echo
