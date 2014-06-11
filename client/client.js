// create marker collection
Markers = new Meteor.Collection('markers');

Meteor.subscribe('markers');

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/leaflet/images';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

  map.on('dblclick', function(event) {
    Markers.insert({latlng: event.latlng});
  });

  var query = Markers.find();
  query.observeChanges({
    added: function(id, fields) {
       console.log("insert marker at: ", JSON.stringify(fields.latlng));
      var marker = L.marker(fields.latlng).addTo(map)
        .on('click', function(event) {
           console.log("remove marker: ", id);
          //map.removeLayer(marker);
          //Markers.remove({_id: id});
          marker.bindPopup('+13033445678 <br>Yes, I want in. Please sign me up.')
      .openPopup();
        });
        
        marker.bindPopup('+13033445678 <br>Yes, I want in. Please sign me up.')
    .openPopup();
    
    } 
  });
};


Template.requestInviteBanner.events = {
    "click .open-modal" : function(e,t) {
    e.preventDefault();
    $("#requestInviteModal").modal("show");
    }
};

Template.requestInviteModal.events({
  'submit form': function(event) { // also tried just 'submit', both work for me!
    console.log('Submitting form!');
    event.preventDefault();
    $('#requestInviteModal').modal('hide')
    invitee = {};
    invitee.email = email.value;
    invitee.phone = phone.value;   
    console.log('form value: ' + invitee);
    Meteor.call('addInvitees', invitee, function(error, id) {
          if (error) {
            return console.log("Error..........");
          } else {
            //Do smth
          }
        });
      event.stopPropagation();
    return true;
  }
});




