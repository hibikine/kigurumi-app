export const useFetchData = <TData, TVariables>(
  query: string,
  options?: RequestInit['headers']
): ((variables?: TVariables) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  return async (variables?: TVariables) => {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //...headers,
        ...(options ?? {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..';
      throw new Error(message);
    }

    return json.data;
  };
};
