import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

var set = Ember.set;

export default Ember.Service.extend({
  init: function() {
    set(this, 'cache', {});

    // adding message service
    var owner = getOwner(this);
    var messages = owner.lookup("service:validations/messages");
    if (messages === undefined) {
      // there is no specific message service, load the default one
      messages = owner.lookup("ember-validations@service:validations/messages");
    }
    set(this, 'messages', messages)
  }
});
