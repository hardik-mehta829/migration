export async function retrieveApprovedNews(): Promise<Post[] | unknown> {
  const category = 'Pop Culture and Entertainment';
  try {
    const response = await get({
      apiName: BASEAPI,
      path: ApiPath.NEWS,
      options: {
        queryParams: {
          queryType: QueryType.APPROVED,
          category: category,
        },
      },
    }).response;
    return response.body.json().then((data) => {
      return data;
    });
  } catch (error) {
    console.error('Error retrieving news:', error);
    throw error;
  }
}
export async function ChangeCategory(id: string): Promise<Post | unknown> {
  const category = 'Culture';
  try {
    const response = await put({
      apiName: BASEAPI,
      path: ApiPath.NEWS,
      options: {
        queryParams: {
          id: id,
          queryType: QueryType.CHANGE,
          status: category,
        },
      },
    }).response;
    return response;
  } catch (error) {
    console.error('Error updating category: ', error);
    throw error;
  }
}
