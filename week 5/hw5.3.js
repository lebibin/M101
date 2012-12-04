use hw5;
db.grades.aggregate([{
  $unwind : "$scores"
}, {
  $match : {
  	"scores.type" : { $in : [ "exam", "homework" ] }
  }
}, {
  $group : {
  	"_id" : {
  		"student_id" : "$student_id",
  		"class_id" : "$class_id"
  	},
  	"stud_avg" : { $avg : "$scores.score" }
  }
}, {
  $group : {
  	"_id" : "$_id.class_id",
  	"class_avg" : { $avg : "$stud_avg" }
  }
}, {
  $sort : {
  	class_avg : -1
  }
}, {
  $limit : 1
}]);