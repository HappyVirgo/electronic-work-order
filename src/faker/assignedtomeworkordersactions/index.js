import faker from 'faker'

export const fetchAssignedToMeWODataTEST = () => {

    let data = []

    for (let id=1; id <= 100; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();

    data.push({
        "id": id,
        "first_name": firstName,
        "last_name": lastName,
        "email": email
    });
    }

    return { "data": data }
}
