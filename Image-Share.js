var images = new Mongo.Collection("images");


if (Meteor.isClient) {
  Session.set('imageLimit', 8);
  lastScrollTop = 0;
  $(window).scroll(function(event){
    // test if we are near the bottom of the window
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      // where are we in the page?
      var scrollTop = $(this).scrollTop();
      // test if we are going down
      if (scrollTop > lastScrollTop){
        // yes we are heading down...
       Session.set("imageLimit", Session.get("imageLimit") + 4);
      }

      lastScrollTop = scrollTop;
    }

  });
  Accounts.ui.config({
    requestPermissions: {},
    requestOfflineToken: {},
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL",
  });

    Template.images.helpers({
      images:function(){
        if (Session.get('userFilter')) {
          return images.find(
                  {createdby:Session.get('userFilter')}, {sort:{created:-1, rating:-1}});
        } else {
          return images.find(
                  {}, {
                    sort:{created:-1, rating:-1},
                    limit:Session.get('imageLimit')
                    });
        }},
      getUser:function(user_id){
        var user = Meteor.users.findOne({_id:user_id});
        if(user){
          return user.username;
        }else{
          return "anon";
        }
      },
      filtring_images:function(){
        return Session.get('userFilter');
      }
    });
    Template.images.events({
      "click .js-img": function(event, template){
        $(event.target).css("width","50%");
      },
      "click .js-set-user-filter": function(event, template){
        Session.set('userFilter', this.createdby);
      },"click .js-remove-filter": function(event, template){
        Session.set('userFilter', null);
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
     },
     "click .js-show-img-form":function(event){
       $("#img_form_modal").modal("show");
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

    Template.body.helpers({ username:function(){
      if(Meteor.user()){
        return Meteor.user().username;
      }
    }
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
          created:new Date(),
          createdby:Meteor.user()._id
        });
         $("#img_form_modal").modal("hide");
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
