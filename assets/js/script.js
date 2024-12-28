document.addEventListener("DOMContentLoaded", () => {
    const ranges = document.querySelectorAll(".range");
    const charactersContainer = document.getElementById("characters-container");

    async function fetchCharacters(start, end) {
        charactersContainer.innerHTML = "<p>Loading...</p>";
        const characters = [];

        for (let i = start; i <= end; i++) {
            try {
                const response = await fetch(`https://swapi.tech/api/people/${i}`);
                if (!response.ok) throw new Error("Failed to fetch data");
                const { result } = await response.json();
                characters.push({
                    name: result.properties.name,
                    height: result.properties.height,
                    mass: result.properties.mass
                });
            } catch (error) {
                console.error(`Error fetching character ${i}:`, error);
            }
        }

        displayCharacters(characters);
    }

    function displayCharacters(characters) {
        charactersContainer.innerHTML = "";
        characters.forEach(character => {
            const characterDiv = document.createElement("div");
            characterDiv.className = "character";
            characterDiv.innerHTML = `
                <h3>${character.name}</h3>
                <p>Height: ${character.height} cm</p>
                <p>Mass: ${character.mass} kg</p>
            `;
            charactersContainer.appendChild(characterDiv);
        });
    }

    ranges.forEach(range => {
        range.addEventListener("mouseenter", () => {
            const [start, end] = range.dataset.range.split("-").map(Number);
            fetchCharacters(start, end);
        });
    });
});
