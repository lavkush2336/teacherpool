document.addEventListener('DOMContentLoaded', () => {
    const facultyList = document.getElementById('faculty-list');
    const searchBar = document.getElementById('faculty-search');
    let allFaculty = []; // To store all faculty data

    async function fetchFacultyData() {
        try {
            const response = await fetch('faculty_data.json');
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            allFaculty = json; // Store the fetched data
            displayFaculty(allFaculty);
        } catch (error) {
            console.error('Error fetching or parsing faculty data:', error);
            facultyList.innerHTML = '<p class="text-red-600 text-center col-span-full">Failed to load faculty data. Please try again later.</p>';
        }
    }

    function displayFaculty(facultyMembers) {
        facultyList.innerHTML = ''; // Clear previous results
        if (facultyMembers.length === 0) {
            facultyList.innerHTML = '<p class="text-gray-600 text-center col-span-full">No faculty members found.</p>';
            return;
        }

        facultyMembers.forEach(member => {
            const facultyCard = `
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100" data-aos="fade-up">
                    <img src="${member.Image || 'https://via.placeholder.com/150'}" alt="${member['Machine learning faluty']}" class="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-primary-600 ring-opacity-50">
                    <h3 class="text-xl font-semibold text-gray-800 mb-1">${member['Machine learning faluty'] || 'N/A'}</h3>
                    <p class="text-primary-700 font-medium mb-2">${member.Designation || 'N/A'}</p>
                    <p class="text-gray-600 text-sm mb-3">${member.Department || 'N/A'}</p>
                    <div class="text-gray-500 text-sm space-y-1">
                        ${member.Email ? `<p><i class="fas fa-envelope me-2"></i><a href="mailto:${member.Email}" class="hover:underline">${member.Email}</a></p>` : ''}
                        ${member.Phone ? `<p><i class="fas fa-phone me-2"></i><a href="tel:${member.Phone}" class="hover:underline">${member.Phone}</a></p>` : ''}
                        ${member.ResearchArea ? `<p><i class="fas fa-flask me-2"></i>Research: ${member.ResearchArea}</p>` : ''}
                        ${member.Website ? `<p><i class="fas fa-globe me-2"></i><a href="${member.Website}" target="_blank" rel="noopener noreferrer" class="hover:underline">Website</a></p>` : ''}
                    </div>
                </div>
            `;
            facultyList.innerHTML += facultyCard;
        });
    }

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFaculty = allFaculty.filter(member => {
            return (member['Machine learning faluty'] && member['Machine learning faluty'].toLowerCase().includes(searchTerm));
        });
        displayFaculty(filteredFaculty);
    });

    fetchFacultyData();
});
