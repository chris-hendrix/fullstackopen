const { Note, User, Team, Membership, UserNote } = require('../models')
const { rollbackMigration, runMigrations } = require('./db')

const userData = [
  {
    username: 'chendrix1123@gmail.com',
    name: 'Chris',
    notes: [
      {
        content: 'Relational databases rule the world',
        important: true,
        date: null
      }
    ]
  },
  {
    username: 'tomado@gmail.com',
    name: 'Tom',
    notes: [
      {
        content: 'MongoDB is webscale',
        important: false,
        date: null
      }
    ]
  },
  {
    username: 'kbacon@gmail.com',
    name: 'Keven',
    notes: []
  }
]

const nTeams = 2

const createSampleData = async () => {
  const getTeamName = (i) => `Team ${i % nTeams + 1}`

  // create teams
  Array(nTeams).fill().forEach(async (_, i) => {
    const team = { name: getTeamName(i) }
    if (await Team.findOne({ where: team })) return
    await Team.create(team)
  })

  // create users, memberships, notes
  userData.forEach(async ({ username, name, notes }, i) => {
    if (await User.findOne({ where: { username, name } })) return
    const teamName = getTeamName(i % nTeams + 1)
    const team = await Team.findOne({ where: { name: teamName } })
    const user = await User.create({ username, name })
    if (team) await Membership.create({ userId: user.id, teamId: team.id })
    // create notes
    notes.forEach(async note => {
      await Note.create({ ...note, userId: user.id })
    })
  })

  // assign user notes
  // const users = await User.findAll()
  // const notes = await Note.findAll()
  // await UserNote.create({userId: users[0].id, noteId: notes[notes.length - 1].id})
  // await UserNote.create({userId: users[users.length-1].id, noteId: notes[0].id})
}

const clearData = async () => {
  await Membership.destroy({ where: {} })
  await Team.destroy({ where: {} })
  await Note.destroy({ where: {} })
  await User.destroy({ where: {} })
}

const fill = async () => {
  await clearData()
  await rollbackMigration()
  await runMigrations()
  await createSampleData()
}

fill()
