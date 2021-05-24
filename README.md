
# YAPPI Chat

**(Yet Another Person to Person Interface)**

![](https://img.shields.io/badge/version-0.4.0-lightgrey)
![](https://img.shields.io/badge/ES-2020-green) ![node-current](https://img.shields.io/node/v/npm) ![web-pack](https://img.shields.io/badge/webpack-5.37-green) ![npm type definitions](https://img.shields.io/npm/types/typescript)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b04381de-147a-42f1-bf72-eff2e6dbd7f7/deploy-status)](https://app.netlify.com/sites/yappi-chat/deploys) [![Heroku App Status](http://heroku-shields.herokuapp.com/yappi-chat)](https://yappi-chat.herokuapp.com)
------------
Самостоятельная практическая работа Яндекс.Практики курса мидл фронтенд-разработчика:
https://praktikum.yandex.ru/middle-frontend/
------------
Чат, общение 1 на 1 с различными пользователями

**Реализовано в 4 спринте:**
- Переход в TypeScript на полный strict режим
- Проведен частичный рефакторинг согласно последнему PR
- Добавлены стили переходов
- Миграция на Webpack:
    - Сборка в зависимости от среды
    - Поднятие локального сервера для разработки на 3000 порту
    - Добавлены лоадеры для различных ресурсов
    - Использование плагинов
- Настроен `precommit` (`husky/lint-staged`)
- Зафиксированы все `npm` зависимости
- Проведен `npm audit`. Не прохдит для `stylelint`, на данный момент проблема не решается, но на релиз никак не влияет.
- Создан Docker-образ на базе `alpine/nginx`. Сборка через `docker-compose`. Команда: `npm run docker`.
- Docker-образ размещен на Heroku: https://yappi-chat.herokuapp.com/

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
- Доработать стили (адаптивность под малые экраны)
- Добавить модальные окна (сейчас используется нативные `confirm` и `prompt`) и всплывающие меню

------------
#### Как можно поиграться:

Заходим сюда:
https://yappi-chat.netlify.app/
или сюда:
https://yappi-chat.herokuapp.com/

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
#### Ссылка на Pull Request "Sprint 4":

https://github.com/StopNGo/middle.messenger.praktikum.yandex/pull/3

#### Ссылка на макет в Figma:

https://www.figma.com/file/yrJkXOausM5ZgxMMwWUroi/YAPPI-chat?node-id=37%3A285&viewport=1081%2C541%2C0.5163934230804443

#### Ссылка на деплой ветки _sprint_4_ с этого репозитория в Netlify:

https://yappi-chat.netlify.app/


#### Ссылка на деплой Docker-образа на Heroku:

https://yappi-chat.herokuapp.com/


------------

Установка и использование:

-  `npm install` — установка стабильной версии;
-  `npm run dev` — запуск версии для разработчика, порт: 3000;
-  `npm run build` — сборка стабильной версии.
-  `npm test` — запуск тестов.
-  `npm run docker` — создание Docker-образа, порт: 3000.

------------
#### Ссылка на Pull Request "Sprint 4":

https://github.com/StopNGo/middle.messenger.praktikum.yandex/pull/3

------------
Коментарии и пожелания приветствуются!

![](https://media3.giphy.com/media/ME8tqJAgmQSH4Uo4Lg/giphy.gif?cid=ecf05e47mtq1fec44qom1ndttyqwheefa01ujz337keulekx&rid=giphy.gif)
