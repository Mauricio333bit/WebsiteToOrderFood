const eventService = require("../services/eventsService");
module.exports = {
  createEvent: async (req, res) => {
    try {
      const { event } = req.body;
      const { restaurantId } = req.params;
      const createdEvent = await eventService.createEvent(event, restaurantId);
      res.status(201).json(createdEvent);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  findAllEvents: async (req, res) => {
    try {
      const allEvents = await eventService.findAllEvents();
      res.status(200).json(allEvents);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  findRestaurantsEvents: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const events = await eventService.findRestaurantsEvents(restaurantId);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params;
      await eventService.deleteEvent(eventId);
      res.status(204).json({ message: "Event deleted" });
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
};
