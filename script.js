import faker from 'faker';


function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const tbody = document.querySelector('tbody');

let persons = Array.from({ length: 10 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''} tr_container">
        <td><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
            <button class="edit" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
		)
		.join('');
};

function destroyPopup(popup) {
	popup.remove();
    //remove it from the javascript memory
    popup = null;
}

const editPartner = e => {
	// code edit function here
		if (e.target.closest('button.edit')) {
			const btn = e.target.closest('tr');
			const butonEdit = btn.querySelector('button.edit');
			const id = butonEdit.value;
			editPartnerPopup(id);
		}
};

const editPartnerPopup = (idToEdit) => {
	const findEdit = persons.find(person => person.id === idToEdit);
			console.log(findEdit);
		return new Promise(async function(resolve) {
			// First we need to create a popp with all the fields in it
			const popup = document.createElement('form');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin',   
			`
			<form action="" class="form_submit">
				<fieldset>
					<label for="picture">Avatar</label>
					<input type="url" id="picture" name="picture" value="${findEdit.picture}" required>
				</fieldset>
				<fieldset>
					<label for="lastname">Last name</label>
					<input type="text" id="lastname" name="lastname" value="${findEdit.lastName}" required>
				</fieldset>
				<fieldset>
					<label for="firstname">First name</label>
					<input type="text" id="firstname" name="firstname" value="${findEdit.firstName}" required>
				</fieldset>
				<fieldset>
					<label for="jobTitle">Job title</label>
					<input type="text" id="jobTitle" name="jobTitle" value="${findEdit.jobTitle}" required>
				</fieldset>
				<fieldset>
					<label for="jobArea">Job Area</label>
					<input type="text" id="jobArea" name="jobArea" value="${findEdit.jobArea}" required>
				</fieldset>
				<fieldset>
					<label for="phoneNumber">Phone number</label>
					<input type="text" id="phoneNumber" name="phoneNumber" value="${findEdit.phone}" required>
				</fieldset>
				<div class="buttons">
					<button type="submit" class="submitbtn">Save</button>
					<button type="button" class="cancelEdit">Cancel</button>
				</div>
				</form>
			`);
			popup.addEventListener(
				'submit', 
				e => {
					console.log(e.target);
					e.preventDefault();
					
						findEdit.lastName = e.target.lastname.value,
						findEdit.firstName = e.target.firstname.value,
						findEdit.jobTitle = e.target.jobTitle.value,
						findEdit.jobArea = e.target.jobArea.value,
						findEdit.phone = e.target.phoneNumber.value,
						findEdit.picture = e.target.picture.value,

					resolve(displayList(persons));
					destroyPopup(popup);
				}, 
				{ once: true }
			);
			window.addEventListener('click', (e) => {
				const cancelBtn = e.target.closest('.cancelEdit');
				if (cancelBtn) {
					destroyPopup(popup);
				}
				const clickOutside = e.target.closest('table');
				if (clickOutside) {
					destroyPopup(popup);
				}
			});
			window.addEventListener('keyup', e => {
				if (e.key === 'Escape') {
					destroyPopup(popup);
				}
			});

			document.body.appendChild(popup);
			await wait(50);
			popup.classList.add('open');
		});
};

const deletePartner = (e) => {
	// code delete function here
		if (e.target.closest('button.delete')) {
			const findClosest = e.target.closest('tr');
			const btnDelete = findClosest.querySelector('button.delete');
			const id = btnDelete.value;
				deleteDeletePopup(id)
		}
};

const deleteDeletePopup = (idToDelete) => {
	// create confirmation popup here
	const filteredName = persons.find(person => person.id === idToDelete);
	console.log(filteredName.lastName);
	return new Promise(async function(resolve) {
		// First we need to create a popp with all the fields in it
		const div = document.createElement('div');
			div.classList.add('container');
			div.insertAdjacentHTML('afterbegin',   
		`	
			<h3>Are you sure that you want to delete this partener</h3>
			<p class="lastname">${filteredName.lastName}</p>
			<div class="deletebtns">
				<button type="button" class="yes">yes</button>
				<button type="button" class="cancelDelete">Cancel</button>
			</div>
		`);
		window.addEventListener('click', (e) => {
			const cancelDeleteBtn = e.target.closest('.cancelDelete');
			if (cancelDeleteBtn) {
				destroyPopup(div);
			}
			if (e.target.closest('button.yes')) {
				const trElement = document.querySelector('.tr_container');
				destroyPopup(trElement);
			}
			const clickOutside = e.target.closest('table');
			if (clickOutside) {
				destroyPopup(div);
			}
		});
		window.addEventListener('keyup', e => {
			if (e.key === 'Escape') {
				destroyPopup(div);
			}
		});

	document.body.appendChild(div);
	await wait(50);
	div.classList.add('open');
	}); 
};

window.addEventListener('click', editPartner);
window.addEventListener('click', deletePartner);

displayList(persons);
