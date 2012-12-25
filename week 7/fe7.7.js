use photos;
db.images.aggregate([{
  $group : {
  	'_id' : 0,
  	'sum_of_id_fields' : { $sum : '$_id' }
  }
}]);