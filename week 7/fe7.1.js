use enron;
db.messages.aggregate([{
  $project : {
  	headers : 1
  }
}, {
  $unwind : "$headers.To"
}, {
  $match : {
  	"headers.From" : "andrew.fastow@enron.com",
  	"headers.To" : "jeff.skilling@enron.com"
  }
}, {
  $group : {
  	"_id" : 0,
  	"number_of_email_sent" : { $sum : 1 }
  }
}]);