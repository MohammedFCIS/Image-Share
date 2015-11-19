var images = new Mongo.Collection("images");


if (Meteor.isClient) {
    Template.images.helpers({images:images.find()});
    Template.images.events({
      "click .js-img": function(event, template){
        $(event.target).css("width","50%");
      },
      "click .js-del-btn":function(event, template){
          var img_id = this._id;
          $("#"+img_id).hide('slow', function(){
            images.remove({_id:img_id});
          });
      },
     "click .js-rate":function(event, template){
       var rating = $(event.currentTarget).data('userrating');
       var img_id = this.id;
       images.update({_id:img_id}, {$set:{
         rating:rating
       }});
     }

    });

}

if (Meteor.isServer) {
  Meteor.startup(function(){
    if (images.find().count() == 0) {
          for (var i = 1; i < 23; i++) {
               images.insert({
                  img_src:"img_"+i+".jpg",
                  img_alt:"img_"+i
                });
          }
    }

  });
}
