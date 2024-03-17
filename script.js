let searchText = '13';

function searchHandler(isShowAll) {
    loading(true);
    const searchField = document.getElementById("searchField");
    searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

const loading = (isLoading) => {
    const loadingElement = document.getElementById("loading");
    if (isLoading) {
        loadingElement.classList.remove('hidden');
    } else {
        loadingElement.classList.add('hidden');
    }
}

const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = '';

    const showAllBtn = document.getElementById("showALLBtn");
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }

    // Display first 12 phones if not showing all
    const phonesToDisplay = isShowAll ? phones : phones.slice(0, 12);
    phonesToDisplay.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl p-5`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    // Hide loading spinner
    loading(false);
}

function showBtn() {
    searchHandler(true); // Call searchHandler with isShowAll = true
}

// Show Details
const showDetailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (details) => {
    my_modal.showModal();
    const modelName = document.getElementById('detailsPhoneName');
    const brandName = document.getElementById('detailsBrand');
    const detailsSpec = document.getElementById('detailsSpec');
    const releaseDate = document.getElementById('releaseDate');
    const imageDiv = document.getElementById('imgContainer');

    imageDiv.innerHTML = `<img src="${details.image}" alt="">`;
    modelName.innerText = details.name;
    brandName.innerText = `Brand: ${details.brand}`;
    const features = details.mainFeatures;
    let string = "";
    for (const key in features) {
        string += `${key}: ${features[key]} \n`;
    }
    detailsSpec.innerText = string;
    releaseDate.innerText = `${details.releaseDate}`;
}

// Initially load the phones
loadPhone(searchText);
