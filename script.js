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
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''} tbody_container">
        <td><img class="picture" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td class="lastname">${person.lastName}</td>
        <td class="firstname">${person.firstName}</td>
        <td class="jobtitle">${person.jobTitle}</td>
        <td class="jobarea">${person.jobArea}</td>
        <td class="phonenumber">${person.phone}</td>
        <td class="">
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
		)
		.join('');
};


function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
    popup.classList.remove('open');
    await wait(1000);
    //remove it from the dom
    popup.remove();
    //remove it from the javascript memory
    popup = null;
}

const editPartner = (e) => {
	// code edit function here
	const editBtn = e.target;
		return new Promise(async function(resolve) {
		if (editBtn.closest('button.edit')) {
			editPartnerPopup();
		}
		if (editBtn.closest('button.cancelEdit')) {
			const cancelSubmit = document.querySelector('.popup');
			destroyPopup(cancelSubmit);
		}
	});
};

const editPartnerPopup = (e) => {
	//create edit popup here
	const container = document.querySelector('.tbody_container');
	const lastName = container.querySelector('.lastname').textContent;
	const firstName = container.querySelector('.firstname').textContent;
	const jobTitle = container.querySelector('.jobtitle').textContent;
	const jobArea = container.querySelector('.jobarea').textContent;
	const phoneNumber = container.querySelector('.phonenumber').textContent;
	const picture = container.querySelector('.picture').src;
		return new Promise(async function(resolve) {
			// First we need to create a popp with all the fields in it
			const popup = document.createElement('form');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin',   
			`
			<form action="" class="form_submit">
				<fieldset>
					<label for="picture">Avatar</label>
					<input type="url" id="picture" name="picture" value="${picture}" required>
				</fieldset>
				<fieldset>
					<label for="lastname">Last name</label>
					<input type="text" id="lastname" name="lastname" value="${lastName}" required>
				</fieldset>
				<fieldset>
					<label for="firstname">First name</label>
					<input type="text" id="firstname" name="firstname" value="${firstName}" required>
				</fieldset>
				<fieldset>
					<label for="jobTitle">Job title</label>
					<input type="text" id="jobTitle" name="jobTitle" value="${jobTitle}" required>
				</fieldset>
				<fieldset>
					<label for="jobArea">Job Area</label>
					<input type="text" id="jobArea" name="jobArea" value="${jobArea}" required>
				</fieldset>
				<fieldset>
					<label for="phoneNumber">Phone number</label>
					<input type="text" id="phoneNumber" name="phoneNumber" value="${phoneNumber}" required>
				</fieldset>
				<div class="buttons">
					<button type="submit" class="submitbtn">Save</button>
					<button type="button" class="cancelEdit">Cancel</button>
				</div>
				</form>
			`);
			document.body.appendChild(popup);
			await wait(50);
			popup.classList.add('open');
		});
};

const deletePartner = (e) => {
	// code delete function here
	const deletes = e.target;
	return new Promise(async function(resolve) {
		if (deletes.closest('button.delete')) {
				deleteDeletePopup()
		}
		if (deletes.closest('button.yes')) {
			const trElement = document.querySelector('.tbody_container');
			destroyPopup(trElement);
		}
		if (deletes.closest('button.cancel')) {
			const cancelBtn = document.querySelector('.popup');
			destroyPopup(cancelBtn);
		}
	});
};


const handleSubmit = (e) => {
	popup.addEventListener(
		'submit', 
		e => {
			console.log(e.target);
			e.preventDefault();
			//popup.input.value;
			let editedPerson = [];
			const form = e.target;
			const lastNameInput = form.lastName.value;
			const firstNameInput = form.firstName.value;
			const pictureInput = form.picture.value;
			const jobTitleInput = form.jobTitle.value;
			const jobAreaInput = form.jobArea.value;
			const phoneInput = form.phoneNumber.value;

			const html  = {
				id: faker.random.uuid(),
				lastName: lastName.textContent = lastNameInput,
				firstName: firstName.textContent = firstNameInput,
				jobTitle: jobTitle.textContent = jobTitleInput,
				jobArea: jobArea.textContent = jobAreaInput,
				phone: phoneNumber.textContent = phoneInput,
				picture: picture.src = pictureInput,
			}
			editedPerson.push(html);
			destroyPopup(popup);
		}, 
		{ once: true }
	);
}

const deleteDeletePopup = () => {
	// create confirmation popup here
	const container = document.querySelector('.tbody_container');
	const lastName = container.querySelector('.lastname').textContent;
	return new Promise(async function(resolve) {
		// First we need to create a popp with all the fields in it
		const popup = document.createElement('div');
			popup.classList.add('popup');
			popup.insertAdjacentHTML('afterbegin',   
		`	
			<p> ${lastName}</p>
			<p>Are you sure that you want to delete this partener</p>
			<button type="button" class="yes">yes</button>
			<button type="button" class="cancel">Cancel</button>
		`);
	document.body.appendChild(popup);
	await wait(50);
	popup.classList.add('open');
	}); 
};

window.addEventListener('click', editPartner);
window.addEventListener('click', deletePartner);

displayList(persons);
