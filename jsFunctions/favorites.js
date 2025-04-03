
//using local storage
export function toggleFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(`ID ${id} added to favorites.`);
    } else {
        const index = favorites.indexOf(id);
        if (index !== -1) {
            favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
                console.log(`ID ${id} removed from favorites.`);
            }
}