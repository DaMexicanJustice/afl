<?php
if ($_SERVER['REQUEST_METHOD'] === "POST") {
	if (empty($_POST['email'])) {
		$emailError = 'Email is empty';
	} else {
		$email = $_POST['email'];

		// validating the email
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$emailError = 'Invalid email';
		}
	}
	if (empty($_POST['message'])) {
		$messageError = 'Message is empty';
	} else {
		$message = $_POST['message'];
	}
	if (!empty($_POST['name'])) {
		$name = $_POST['name'];
	}
	if (empty($emailError) && empty($messageError)) {
		$date = date('j, F Y h:i A');

		$emailBody = "
			<html>
			<head>
				<title>$email is contacting you</title>
			</head>
			<body style=\"background-color:#fafafa;\">
				<div style=\"padding:20px;\">
					Navn: <span style=\"color:#888\">$name</span>
					<br>
					Dato: <span style=\"color:#888\">$date</span>
					<br>
					Email: <span style=\"color:#888\">$email</span>
					<br>
					Emne: <span style=\"color:#888\">$subject</span>
					<br>
					Besked: <div style=\"color:#888\">$message</div>
				</div>
			</body>
			</html>
		";

		$headers = 	'From: Contact Form <info@vintagegames.dk>' . "\r\n" .
    				"Reply-To: $email" . "\r\n" .
    				"MIME-Version: 1.0\r\n" . 
					"Content-Type: text/html; charset=iso-8859-1\r\n";

		$to = 'info@vintagegames.dk';
		$testTo = 'businesspfdsj@gmail.com';
        
        if (!empty($_POST['subject'])) {
            $subject = $_POST['subject'];
        } else {
		    $subject = 'Intet emne';
        }

		/*if (mail($to, $subject, $emailBody, $headers)) {
			$sent = true;	
		}*/

		if (mail($to, $subject, $emailBody, $headers))
		{
			echo "Din mail er modtaget 👍";
			mail($testTo, $subject, $emailBody, $headers);
		}
		else
		{
    		echo "Error: Der skete en fejl. ";
		}
	}
}
?>