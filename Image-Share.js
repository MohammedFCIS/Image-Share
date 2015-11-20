var images = new Mongo.Collection("images");


if (Meteor.isClient) {
    Template.images.helpers({images:images.find(
      {}, {sort:{rating:-1}}
    )});
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

    Template.image_add_form.helpers({
      create: function(){

      },
      rendered: function(){

      },
      destroyed: function(){

      },
    });

    Template.image_add_form.events({
      "submit .js-add-img": function(event, template){
        var img_src,img_alt;
        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;
        event.target.img_src.value = "";
        event.target.img_alt.value = "";
        images.insert({
          img_src:img_src,
          img_alt:img_alt,
          created:new Date()
        });

        return false;
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
