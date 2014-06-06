SMSTexts = new Meteor.Collection('smstexts');

Router.configure({
    layout: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.map(function () {

    this.route('smstexts', {
        template: 'smstexts',
        path: '/',
        data: {
            smstexts: function () {
                return SMSTexts.find({}, { sort: {time: -1}});
            }
        }
    });

    this.route('smsin', {
        template: 'smsin',
        path: '/api/twiml/sms',
        where: 'server',
        action: function () {
          //this.body.request.time = now();
          var text = this.request.body;
          text.time = Date.now();
            SMSTexts.insert(text);
            console.log('header: ' + JSON.stringify(this.request.headers) + '\nbody: '
                + JSON.stringify(this.request.body));
            this.response.end(JSON.stringify(this.request.body));
        }
    });

});


if (Meteor.isClient) {
    App = {
        subs: {
            smstexts: Meteor.subscribe('smstexts')
        }
    } 
}


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
    
    Meteor.publish('smstexts', function () {
        return SMSTexts.find({}, {
            sort: {
                order: 1
            }
        });
    });
    Meteor.publish('smstext', function () {
        return SMSTexts.find({
            _id: id
        });
    });
    
}