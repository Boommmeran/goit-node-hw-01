import { program } from 'commander';
import * as contactsService from './contacts.js';

const invokeAction = async ({ action, id, ...data }) => {
	switch (action) {
		case 'list':
			const allContacts = await contactsService.listContacts();
			return console.table(allContacts);

		case 'find':
			const contact = await contactsService.getContactById(id);
			return console.log(contact);

		case 'remove':
			const removedContact = await contactsService.removeContact(id);
			return console.log(removedContact);

		case 'add':
			const newContact = await contactsService.addContact(data);
			return console.log(newContact);

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
};

program
	.option('-a, --action <type>')
	.option('-i, --id <type>')
	.option('-n, --name <type>')
	.option('-e, --email <type>')
	.option('-p, --phone <type>');

program.parse();

const options = program.opts();

invokeAction(options);