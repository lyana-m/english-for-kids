interface IAdmin {
  login: string;
  password: string;
}

const basePath = 'http://localhost:5000';
// const basePath = 'https://powerful-badlands-97890.herokuapp.com';

export const getAccessToken = async (body: IAdmin) => {
  try {
    const response = await fetch(`${basePath}/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
}

export const getCategories = async (mode: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/categories?mode=${mode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(error);

  }
}

export const createCategory = async (category: FormData, mode: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/categories?mode=${mode}`, {
      method: 'POST',
      body: category,
      headers: {
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.ok;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const updateCategory = async (category: FormData) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/categories`, {
      method: 'PUT',
      body: category,
      headers: {
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.ok;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteCategory = async (categoryId: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/categories?id=${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.ok;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const getWords = async (categoryId: string, mode: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/words?mode=${mode}&categoryId=${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const getAllWords = async (mode: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/allwords?mode=${mode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const createWord = async (word: FormData) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/words`, {
      method: 'POST',
      body: word,
      headers: {
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.ok;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const updateWord = async (word: FormData) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/words`, {
      method: 'PUT',
      body: word,
      headers: {
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.ok;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteWord = async (wordId: string) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${basePath}/words?id=${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${accessToken}`,
      },
    });
    if (response.ok) {
      return response.ok;
    }
  } catch (error) {
    throw new Error(error);
  }
}