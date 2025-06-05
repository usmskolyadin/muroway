import simpleRestProvider from 'ra-data-simple-rest';

const customProvider = simpleRestProvider('/api');

const myDataProvider = {
  ...customProvider,
  create: async (resource: string, params: any) => {
    if (resource === 'tours') {
      const formData = new FormData();
      formData.append('data', JSON.stringify(params.data));

      if (params.data.images && Array.isArray(params.data.images)) {
        params.data.images.forEach((file: { rawFile: File }) => {
          formData.append('images', file.rawFile);
        });
      }

      const response = await fetch('/api/tours', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error uploading tour');
      }

      const result = await response.json();
      return { data: result };
    }

    return customProvider.create(resource, params);
  },
  update: async (resource: string, params: any) => {
  if (resource === 'tours') {
    const formData = new FormData();
    formData.append('data', JSON.stringify(params.data));

    if (Array.isArray(params.data.images)) {
      params.data.images.forEach((file: any) => {
        if (file.rawFile) {
          formData.append('images', file.rawFile);
        }
      });
    }

    const response = await fetch(`/api/tours/${params.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error updating tour');
    }

    const result = await response.json();
    return { data: result };
  }

  return customProvider.update(resource, params);
}

};

export default myDataProvider;