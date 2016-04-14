import Ember from 'ember';
import { module, test } from 'qunit';
import Presence from 'ember-validations/validators/local/presence';
import Mixin from 'ember-validations/mixin';
import buildContainer from '../../../helpers/build-container';

var model, Model, options, validator, container;
var set = Ember.set;
var run = Ember.run;

module('Presence Validator', {
  setup: function() {
    container = buildContainer();
    Model = Ember.Object.extend(Mixin, {
      container: container
    });
    run(function() {
      model = Model.create();
    });
  }
});

test('when value is not empty', function(assert) {
  options = { message: 'failed validation' };
  run(function() {
    validator = Presence.create({model: model, property: 'attribute', options: options, container: container});
    set(model, 'attribute', 'not empty');
  });
  assert.deepEqual(validator.errors, []);
});

test('when value is empty', function(assert) {
  options = { message: 'failed validation' };
  run(function() {
    validator = Presence.create({model: model, property: 'attribute', options: options, container: container});
    set(model, 'attribute', '');
  });
  assert.deepEqual(validator.errors, ['failed validation']);
});

test('when options is true', function(assert) {
  options = true;
  run(function() {
    validator = Presence.create({model: model, property: 'attribute', options: options, container: container});
    set(model, 'attribute', '');
  });
  assert.deepEqual(validator.errors, ["can't be blank"]);
});

test('when value is blank', function(assert) {
  options = { message: 'failed validation' };
  run(function() {
    validator = Presence.create({model: model, property: 'attribute', options: options, container: container});
    model.set('attribute', ' ');
  });
  assert.deepEqual(validator.errors, ['failed validation']);
});
