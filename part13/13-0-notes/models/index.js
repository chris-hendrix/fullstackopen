const Note = require('./note')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const UserNote = require('./user_note')

Note.belongsTo(User)
User.hasMany(Note)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Note, { through: UserNote, as: 'marked_notes' })
Note.belongsToMany(User, { through: UserNote, as: 'users_marked' })

module.exports = {
  Note, User, Team, Membership, UserNote
}