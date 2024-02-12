export const apiService = async (param) => {
    const response = await fetch(param.url);
    return response.json()
}