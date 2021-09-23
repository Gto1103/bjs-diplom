"use strict";

const userForm = new UserForm();

// Авторизация пользователя

userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, (response) => {
		if (response.success) {
			location.reload();
		}
		else {
			userForm.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);
		}
	});
};

// Регистрация пользователя

userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, (response) => {
		if (response.success) {
			location.reload();
		}
		else {
			userForm.setRegisterErrorMessage(`Произошла ошибка: ${response.error}`);
		}
	});
};