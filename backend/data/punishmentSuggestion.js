const express = require("express");
// Punishment suggestions based on complaint type
const punishmentSuggestions = {
    Noise: [
      "Make chai for everyone for a week",
      "Clean the common area for 3 days",
      "Buy pizza for movie night",
    ],
    Cleanliness: [
      "Deep clean the kitchen this weekend",
      "Take out trash for the next week",
      "Clean all bathrooms this weekend",
    ],
    Bills: [
      "Pay the next internet bill solo",
      "Cover the water bill this month",
      "Buy household supplies this month",
    ],
    Pets: [
      "Take care of all pets for a week",
      "Clean the pet area for two weeks",
      "Buy premium pet food this month",
    ],
    Other: [
      "Cook dinner for everyone this weekend",
      "Do everyone's laundry once",
      "Organize a flat movie night with snacks",
    ],
  };
  module.exports = punishmentSuggestions;