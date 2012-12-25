use enron;
db.messages.aggregate([{
  $project : {
  	headers : 1
  }
}, {
  $unwind : "$headers.To"
}, {
  $group : {
  	"_id" : {
  		"From" : "$headers.From",
  		"To" : "$headers.To"
  	},
  	"number_of_messages" : { $sum : 1 }
  }
}, {
  $sort : {
  	"number_of_messages" : -1
  }
}, {
  $limit : 3
}]);