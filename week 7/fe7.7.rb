require 'rubygems'
require 'mongo'

connection = Mongo::Connection.new "localhost", 27017
db = connection.db "photos"
non_orphans = [] # Placeholder for images with no corresponding album

# Push the non_orphan images(regardless of redundancy)
# to the non_orphan's array to be used for the query
db.collection("albums").find.to_a.each do|album|
  album['images'].each { |e| non_orphans << e }
end

# Weed out duplicates in the non_orphan array
non_orphans.flatten.uniq!

# Remove the orphan images
db.collection("images").remove('_id' => { '$nin' => non_orphans } )
puts 'Orphan images successfully removed!'
puts "Total images count is : #{non_orphans.length}"