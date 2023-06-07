import Step from "./stepModel.js";
import User from "./userModel.js";
import Event from "./eventModel.js";
import Match from "./matchModel.js";

Event.belongsToMany(User, {through: 'events_users'});
User.belongsToMany(Event, {through: 'events_users'});

Event.hasMany(Step, {onDelete: 'CASCADE'});
Step.belongsTo(Event);

Step.hasMany(Match, {onDelete: 'CASCADE'});
Match.belongsTo(Step);

Match.belongsTo(User, {as: 'player1'});
Match.belongsTo(User, {as: 'player2'});

export default {}