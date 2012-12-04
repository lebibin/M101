use zips;
db.zips.aggregate([{
  $project : {
  	"first_char" : { $substr : ["$city", 0, 1]},
  	"zip_code" : "$_id",
  	"pop" : 1
  }
}, {
  $match : {
  	first_char : /^\d$/
  }
}, {
  $group : {
  	"_id" : "$zip_code",
  	"sum_total_by_zip_code" : { $sum : "$pop" }
  }
}, {
  $group : {
  	"_id" : 0,
  	"sum_total" : { $sum : "$sum_total_by_zip_code" }
  }
}]);