# ID=1 sh curl-scripts/show.sh how to run in ternimal
curl "http://localhost:4741/comments/${MOVIEID}/${COMMENTID}" \
 --include \
 --header "Authorization: Bearer ${TOKEN}" 
