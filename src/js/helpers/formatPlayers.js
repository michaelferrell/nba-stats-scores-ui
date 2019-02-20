export const formatPlayers = data =>
  data.reduce((obj, p) => {
    obj[p.personId] = {
      name: p.firstName + " " + p.lastName,
      team_id: p.teamId,
      jersey: p.jersey,
      pos: p.pos,
      height: p.heightFeet + "'" + p.heightInches + '"',
      weight: p.weightPounds,
      birthdate: p.dateOfBirthUTC,
      draft: p.draft,
      nbaDebutYear: p.nbaDebutYear,
      yearsPro: p.yearsPro,
      collegeName: p.collegeName,
      country: p.country,
      teams: p.teams,
      isActive: p.isActive
    }
    return obj
  }, {})
