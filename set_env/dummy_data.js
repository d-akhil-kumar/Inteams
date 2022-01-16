const encryption = require('../utils/encryption')


const projects = [
    {
        name: 'MOB-12-Subscribe',
        groups: ['frontend', 'backend', 'devops', 'hr', 'manager', 'testing', 'consulting'],
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        stack: ['flutter', 'nodejs', 'aws', 'postgresql']

    },
    {
        name: 'WEB-123-Chat-10',
        groups: ['frontend', 'backend', 'devops', 'testing'],
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        stack: ['MERN', 'aws', 'ML']
    }
]


const users = [
    {
        'email' : 'abc@something.com',
        'password': encryption.encrypt('abcdefgh'),
        'isadmin': true,
    },
    {
        'email' : 'akhil@something.com',
        'password': encryption.encrypt('akhil#@$'),
        'isadmin': false,
        'projects': [
            {
                'name': 'WEB-123-Chat-10',
                'groups': ['backend']
            }
        ]
    },
    {
        'email' : 'rohan@something.com',
        'password': encryption.encrypt('rohan#@$'),
        'isadmin': false,
        'projects': [
            {
                'name': 'WEB-123-Chat-10',
                'groups': ['backend']
            },
            {
                'name': 'MOB-12-Subscribe',
                'groups': ['backend']
            },
        ]
    }
]


module.exports = {projects, users}