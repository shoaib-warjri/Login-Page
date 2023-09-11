const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function(e) {
	const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
	password.setAttribute('type', type);
	this.classList.toggle('fa-eye-slash');
});


document.getElementById("rememberMe").addEventListener('change', handleRememberMe);

function handleRememberMe() {
	let checkbox = document.getElementById("rememberMe")
	let userName = document.getElementById("username").value;
	console.log(userName);
	let passWord = document.getElementById("password").value;
	console.log(passWord);
	if (checkbox.checked) {
		setCookie('username', userName);
		setCookie('password', passWord);
		console.log(document.cookie);
	} else {
		document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
		document.cookie = 'password=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
	}
}
function setCookie(name, value) {


	const encodedValue = encodeURIComponent(value)
	let d = new Date();
	d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();

	document.cookie = `${name} = ${encodedValue}; ${expires};path=/`;
}
window.addEventListener('load', getCookieData);
function getCookieData() {
	var usernameInput = document.getElementById('username');
	var passWordInput = document.getElementById('password');

	const savedUserName = getCookie('username');
	const savedPassWord = getCookie('password');

	fetch("index.json")
		.then(response => response.json())
		.then(data => {

			const user = data.find(u => u.userName === savedUserName && u.passWord === savedPassWord);
			if (user) {
				usernameInput.value = savedUserName;
				passWordInput.value = savedPassWord;
			}
		})
		.catch(error => {
			console.error("Error fetching json data: ", error);
		});
}
function getCookie(name) {
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split('=');
		if (cookieName === name) {
			return (decodeURIComponent(cookieValue))
		}

	}
	return null;
}
document.getElementById("submit").addEventListener("click", checkCredentials);
function checkCredentials() {
	const userName = document.getElementById("username").value;
	const passWord = document.getElementById("password").value;
	if (userName.length === 0 || passWord.length === 0) {
		alert("Enter the Username and Password");
	} else {
		fetch("index.json")
			.then(response => response.json())
			.then(data => {
				const user = data.find(u => u.userName === userName && u.passWord === passWord);
				if (user) {
					alert("Login Sucessfull!")
				} else {
					alert("Login Failed!. Invalid Username or Password");
				}
			})
			.catch(error => {
				console.error("Error fetching json data: ", error);
			});
	}
}