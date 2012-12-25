use blog;
db.posts.update({
  // substitute this with 'permalink' variable
  //
  // 'permalink' : permalink
  'permalink' : 'TLxrBfyxTZjqOKqxgnUP'
}, {
  // 'comments.0.num_likes' has the 0 index explicitly defined
  // revise this accordingly in the blog.py file
  // 'comment_ordinal' contains the index of the comment liked
  // never thought it was that simple, overthinking does backfire
  //
  // '$inc' : { 'comments.' + str(ordinal) + '.num_likes' : 1}
  '$inc' : { 'comments.0.num_likes' : 1 }
});