import { Resend } from "resend";

export async function submitContactForm(data: {
    name: string;
		email: string;
    phone: string;
		address: string;
    service: string;
    date: string;
    time: string;
}) {
	const resend = new Resend('re_gaHpCK6H_NfX3MxiLQ2sw9wUZ8m21igNs');

	await resend.emails.send({
		from: 'Krux Lab Form Submissions <noreply@kruxlab.com>',
		to: ["jokadetailing@gmail.com", "jsmitty41494@gmail.com", "schillingkaden@gmail.com"],
		subject: 'New Form Submission on JokaDetailing.com',
		text: `
			Hello,
			
			You've recieved a new form submission on jokadetailing.com.

			Name: ${data.name}
			Email: ${data.email}
			Phone: ${data.phone}
			Address: ${data.address}
			Service: ${data.service}
			Date: ${data.date}
			Time: ${data.time}

			Thanks,
			Krux Lab
		`
	});
}