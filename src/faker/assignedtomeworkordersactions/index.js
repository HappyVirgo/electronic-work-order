import faker from 'faker'

export const fetchAssignedToMeWODataTEST = () => {

    let data = {
        work_orders: []
    }

for (let id=1; id <= 10; id++) {

let description = faker.lorem.paragraph();
let number = faker.random.number();
let image = faker.image.imageUrl();
let company = faker.company.companyName();
let companySfx = faker.company.companySuffix();
let prices = faker.random.number(1000);

const newData = data.work_orders
newData.push({
        "workOrderId": number,
        "description": description,
        "asset": {
        "images": [
            {
            "documentId": number,
            "documentType": "photo",
            "moduleTypeId": 3,
            "documentTypeId": 12,
            "referenceId": number,
            "fileName": image,
            "status": 1
            }
        ],
        "assetId": number,
        "assetName": company,
        "assetDescription": null,
        "modelNumber": "SSH60",
        "serialNumber": "G15LC093418",
        "assetType": {
            "assetTypeId": 23,
            "description": `${companySfx}-${company}`,
            "tradeNte": prices,
            "status": 1,
            "warrantyNte": prices
        }
        },
        "priority": {
        "priorityId": 2,
        "description": "L1 - Emergency"
        },
        "status": {
        "statusId": 50,
        "description": "UnAssigned"
        },
        "profile": {
        "userProfileId": number,
        "userId": 0,
        "companyName": `${companySfx}-${company}`,
        "firstName": "",
        "lastName": "",
        "phoneNumber": null
        }
    });
}

return { "data": data }
}
