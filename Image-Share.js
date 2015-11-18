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
    Template.images.helpers({images:image_date});
}

if (Meteor.isServer) {

}
