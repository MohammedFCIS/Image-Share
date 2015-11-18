if (Meteor.isClient) {
    var image_date = {
        img_src: "bass.jpg",
        img_alt:"base"
    };
    Template.images.helpers(image_date);
}

if (Meteor.isServer) {

}
