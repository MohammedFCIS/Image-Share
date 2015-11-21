images = new Mongo.Collection("images");
images.allow({
  insert:function(usrId,doc){
    if (Meteor.user()) {
      if (Meteor.user() != userId) {
        return false;
      }else {
        return true;
      }
    }

    return false;
  }

});
