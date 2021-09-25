// Выход из личного кабинета

const logoutButton = new LogoutButton;
logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
}

// Получение информации о пользователе

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard;

requestExchangeRates = () => {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}

requestExchangeRates();
setInterval(() => requestExchangeRates(), 60000);

// Операции с деньгами

const moneyManager = new MoneyManager;

// Пополнение баланса

moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, `Валюта успешно добавлена!`);
		} else {
			moneyManager.setMessage(response.success, `Произошла ошибка: ${response.error}`);
		}
	});
}

// Конвертирование валюты

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, `Валюта успешно конвертирована!`);
		} else {
			moneyManager.setMessage(response.success, `Произошла ошибка: ${response.error}`);
		}
	});
}

// Перевод валюты

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, `Валюта успешно переведена!`);
		} else {
			moneyManager.setMessage(response.success, `Произошла ошибка: ${response.error}`);
		}
	});
}

// Работа с избранным

const favoritesWidget = new FavoritesWidget;

//Запрос начального списка избранного

ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

// Добавление в список избранных пользователей

favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, `Пользователь успешно добавлен!`);
		} else {
			favoritesWidget.setMessage(response.success, `Произошла ошибка: ${response.error}`);
		}
	});
}

// Удаление из списка избранных пользователей

favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, `Пользователь успешно добавлен!`);
		} else {
			favoritesWidget.setMessage(response.success, `Произошла ошибка: ${response.error}`);
		}
	});
}
