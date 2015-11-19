var images = new Mongo.Collection("images");


if (Meteor.isClient) {
    var image_date = [
        {
        img_src: "bass.jpg",
        img_alt:"base"
        },
        {
        img_src: "beard.jpg",
        img_alt:"beard.jpg"
        },
        {
        img_src: "laptops.jpg",
        img_alt:"laptops.jpg"
        }
    ];
    Template.images.helpers({images:images.find()});
    Template.images.events({
      "click .js-img": function(event, template){
        $(event.target).css("width","50%");
      },
      "click .js-del-btn":function(event, template){
          
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
