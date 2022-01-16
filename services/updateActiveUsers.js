//TODO use a DB, redis maybe to maintain activeUSers data

let activeUsers = {}
let idMapProject = {}

exports.makeUserActive = async ({ email, project, group }, id) => {

    const groupName = `${project}/${group}`

    if (activeUsers[groupName] == null)
        activeUsers[groupName] = []

    activeUsers[groupName].push({ email: email, id: id })
    idMapProject[id] = groupName

    console.log(activeUsers)
    console.log(idMapProject)

    return activeUsers[groupName]
}

exports.makeUserInactive = async (id) => {
    const groupName = idMapProject[id]

    const index = activeUsers[groupName].findIndex(ele => ele.id == id)

    if (index !== -1)
        activeUsers[groupName].splice(index, 1)

    console.log(activeUsers)
    return { actUsers: activeUsers[groupName], grpName: groupName }
}