**Functions used in backend**

<br />

```


async function listTechArticlesWithoutSubcategory(dynamodb, event) {
<br />
const category = event['category'];
<br />
const scan_params = {
<br />
TableName: process.env.STORAGE_NBNWNEWSTABLE_NAME,
<br />
FilterExpression:
<br />
'category = :category AND attribute_not_exists(subcategory)',
<br />
ExpressionAttributeValues: {
<br />
':category': category,
<br />
},
<br />
};
<br />
const data = await dynamodb.send(new ScanCommand(scan_params));
<br />
return data.Items;
<br />
}

```

<br />
This was the function used in backend to retrieve articles of a particular category  replace the tablename with the appropriate table name in your case.
<br />

async function updateCategory(dynamodb, event) {
<br />
console.log('Event is - ', event);
<br />
const newsId = event['id'];
<br />
const status = event['status'];
<br />
const update_params = {
<br />
TableName: process.env.STORAGE_NBNWNEWSTABLE_NAME,
<br />
Key: { id: newsId },
<br />
UpdateExpression: 'SET category = :val,subcategory= :val',
<br />
ExpressionAttributeValues: {
<br />
':val': status,
<br />
},
<br />
};
<br />
const data = await dynamodb.send(new UpdateCommand(update_params));
<br />
return data.Items;
<br />
}
<br />
This was the function used in backend to update category of each article and replace it with new category. replace the tablename with the appropriate table name in your case.

**Functions used in Frontend**

export async function retrieveApprovedNews(): Promise<
<br />
PostFrontend[] | unknown
<br />

{
<br />
const category = 'Business';
<br />
try {
<br />
const response = await get({
<br />
apiName: BASEAPI,
<br />
path: ApiPath.NEWS,
<br />
options: {
<br />
queryParams: {
<br />
queryType: QueryType.APPROVED,
<br />
category: category,
<br />
},
<br />
},
<br />
}).response;
<br />
return response.body.json().then((data) => {
<br />
return data;
<br />
});
<br />
} catch (error) {
<br />
console.error('Error retrieving news:', error);
<br />
throw error;
<br />
}
<br />
}

<br />
This function is used in frontend to retrieve articles of a particular category (in this case it is business) ..Change the apiName,path and options depending on your project .
<br />

export async function ChangeCategory(
<br />
id: string
<br />
): Promise<PostFrontend | unknown> {
<br />
const category = 'Business';
<br />
try {
<br />
const response = await put({
<br />
apiName: BASEAPI,
<br />
path: ApiPath.NEWS,
<br />
options: {
<br />
queryParams: {
<br />
id: id,
<br />
queryType: QueryType.CHANGE,
<br />
status: category,
<br />
},
<br />
},
<br />
}).response;
<br />
return response;
<br />
} catch (error) {
<br />
console.error('Error updating category: ', error);
<br />
throw error;
<br />
}
<br />
}

<br />
This function is used in frontend to change category of each article with the new category (in this case it is business).
<br />Change the apiName,path and options depending on your project .
```
