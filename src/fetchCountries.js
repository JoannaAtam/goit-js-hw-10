export function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error("Error fetching countries:", error);
            throw error;
        });
}
