# Application Title: Personal movie collection library, which can make you create update delete and show your movies.

## Important Links

- [Other Repo](www.link.com)
- [Deployed API](www.link.com)
- [Deployed Client](www.link.com)

## Planning Story

The reason why I wanted to do this project is that I like to see movies, especially the Marvel movies. This project contains a lot of tricky problems.
Fist, the methods upload delete of the comment are not similar as the methods of movie and person, since the comment is subelement of movie. All the action of comment should under the parent scope of movie, if you want to delete the comment only by id of comment, you have to loop the movies object then filter the comment id. However, we only learned how to use forEach in array, how to loop object is tough problem.
Second, change the background using upload image is the other challenge. The images upload to s3 database, in the beginning I am not quite understand how to use this database, so I don't know how to get the data. I recheck the step of upload image to figure out how to use it then write the router of getting image on the back-end.

### User Stories
- Sign up, sign in, changepassword of my own account.
- I want to see all my movies in the library, and can add comment to each movie.
- I can delete update and show some specific element
- I'd like to put image on each book as coversheet.

### Technologies Used
- mongoose
- mongodb, heroku, AWS

### Unsolved Problems

Add image on each book


#### Wireframe:
- https://user-images.githubusercontent.com/62820094/82355432-3171a480-99d0-11ea-9d91-d8843d5f6db0.jpeg
- https://user-images.githubusercontent.com/62820094/82355466-3fbfc080-99d0-11ea-8316-cc2067f121d6.jpeg
- https://user-images.githubusercontent.com/62820094/82355495-477f6500-99d0-11ea-91b1-1b08a183003c.jpeg
