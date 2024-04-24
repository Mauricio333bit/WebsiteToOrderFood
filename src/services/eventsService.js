const { ExplainVerbosity } = require("mongodb");
const Event = require("../models/eventModel");
const Restaurant = require("../models/restaurantModel");
const { findRestaurantsIngredients } = require("./ingredientsService");
const { findById } = require("../models/categoryModel");
module.exports = {
  async createEvent(event, restaurantId) {
    try {
      const restaurant = Restaurant.findById(restaurantId);

      const newEvent = await new Event({
        img: event.img,
        startedAt: event.startedAt,
        endsAt: event.endsAt,
        restaurant: restaurantId,
        location: event.location,
      });
      await newEvent.save();
      return newEvent;
    } catch (error) {
      throw new Error("Failed to add the event.");
    }
  },
  async findAllEvents() {
    try {
      const events = await Event.find();
      return events;
    } catch (error) {
      throw new Error("Failed to find events" + error.message);
    }
  },
  async findRestaurantsEvents(restaurantId) {
    try {
      const restaurantEvents = await Event.find({ restaurant: restaurantId });
      return restaurantEvents;
    } catch (error) {
      throw new Error(
        "Filed to find events for restaurant id: " + restaurantId
      );
    }
  },
  async deleteEvent(eventId) {
    try {
      const deleteEvent = await Event.findByIdAndDelete(eventId);
      return deleteEvent;
    } catch (error) {
      throw new Error("Failed to delete event id: " + eventId);
    }
  },
  async findById(eventId) {
    try {
      const event = await Event.findById(eventId);
      return event;
    } catch (error) {
      throw new Error("Failed to find event with id: " + eventId);
    }
  },
};
