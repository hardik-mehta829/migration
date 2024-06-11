async function listTechArticlesWithoutSubcategory(dynamodb, event) {
  const category = event['category'];
  const scan_params = {
    TableName: process.env.STORAGE_NBNWAPPROVEDNEWS_NAME,
    FilterExpression:
      'category = :category AND attribute_not_exists(subcategory)',
    ExpressionAttributeValues: {
      ':category': category,
    },
  };
  const data = await dynamodb.send(new ScanCommand(scan_params));
  return data.Items;
}
async function updateCategory(dynamodb, event) {
  console.log('Event is - ', event);
  const newsId = event['id'];
  const status = event['status'];
  const update_params = {
    TableName: process.env.STORAGE_NBNWAPPROVEDNEWS_NAME,
    Key: { id: newsId },
    UpdateExpression: 'SET category = :val',
    ExpressionAttributeValues: {
      ':val': status,
    },
  };
  const data = await dynamodb.send(new UpdateCommand(update_params));
  return data.Items;
}
