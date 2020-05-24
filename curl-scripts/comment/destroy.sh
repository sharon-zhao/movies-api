# curl "http://localhost:4741/comments/${MOVIEID}/${COMMENTID}" \
#   --include \
#   --request DELETE
curl "http://localhost:4741/comments/${COMMENTID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" 
