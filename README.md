
# YAPPI Chat

**(Yet Another Person to Person Interface)**

![](https://img.shields.io/badge/version-0.3.0-lightgrey)
![](https://img.shields.io/badge/ES-2020-green)![node-current](https://img.shields.io/node/v/npm)  ![](https://img.shields.io/badge/parcel-1.12-green)
![npm type definitions](https://img.shields.io/npm/types/typescript)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b04381de-147a-42f1-bf72-eff2e6dbd7f7/deploy-status)](https://app.netlify.com/sites/yappi-chat/deploys)
------------
Самостоятельная практическая работа Яндекс.Практики курса мидл фронтенд-разработчика:
https://praktikum.yandex.ru/middle-frontend/
------------
Чат, общение 1 на 1 с различными пользователями

**Реализовано в 3 спринте:**
- Добавлен роутинг с переадресацией, страницей ошибки, переходами по истории
- Внедрен HTTP API чатов (необходимый минимальный набор), можно авторизоваться, добавлять/удалять чаты, добавлять/удалять к ним пользователей, получать данные своего профиля
- Подключен WebSocket, возможен обмен сообщениям (см. инструкцию для теста ниже)
- В архитектуру компонентов добавлен контроллер, как посредник между отображением и внешними данными
- Добавлены простые, но эффективные (насколько это возможно в такой реализации) функции защиты от XSS и DOS атак
- Созданы тесты для классов шаблонизатора, блока, роутера, XMLHttpRequest обертки (`*.spec.ts` файлы в папке модуля, запуск тестов `npm test`)

**Реализовано во 2 спринте:**
- Архитектура компнентов и шины событий без использования сторонних библиотек
- Простой шаблонизатор на базе регулярных выражений

**Планируется:**
- Доработать стили (переходы, интерактив)
- Добавить модальные окна (сейчас используется нативные `confirm` и `prompt`) и всплывающие меню

------------
#### Как можно поиграться:

Заходим сюда:
https://yappi-chat.netlify.app/

Создано 2 пользователя для теста (`login/pass`):
- `zukko/asd123F`
- `zukko2/asd123F`

Открываем чат в двух разных (важно!) браузерах. Использовать режим инкогнито не получиться, т.к. сервер не работает без cookies.
Наслаждаемся беседой с самым умным человеком в мире.

------------
#### Известные баги:

Наверняка много разных, но самый заметный:
- Север периодически через API отдает неправильные последнее сообщение и счетчик непрочитанных сообщений. Можно исправить на стороне клиента, определяя последнее сообщение и кол-во непрочитанных (тут под вопросом) через WebSocket.

------------
#### Ссылка на Pull Request "Sprint 3:

https://github.com/StopNGo/middle.messenger.praktikum.yandex/pull/2

#### Ссылка на макет в Figma:

https://www.figma.com/file/yrJkXOausM5ZgxMMwWUroi/YAPPI-chat?node-id=37%3A285&viewport=1081%2C541%2C0.5163934230804443

#### Ссылки на деплой ветки _sprint_3_ с этого репозитория в Netlify:

https://yappi-chat.netlify.app/




------------

Установка и использование:

-  `npm install` — установка стабильной версии;
-  `npm run start` — запуск версии для разработчика, порт: 3000;
-  `npm run build` — сборка стабильной версии.
-  `npm test` — запуск тестов.

------------
#### Ссылка на Pull Request "Sprint 3":

https://github.com/StopNGo/middle.messenger.praktikum.yandex/pull/2

------------
Коментарии и пожелания приветствуются!

![](https://media3.giphy.com/media/ME8tqJAgmQSH4Uo4Lg/giphy.gif?cid=ecf05e47mtq1fec44qom1ndttyqwheefa01ujz337keulekx&rid=giphy.gif)
