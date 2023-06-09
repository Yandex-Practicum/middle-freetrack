## Описание

У вас есть библиотека `lib.js`, которая экспортирует два объекта: `catAndDogFetcher`

и `magicalCatRecognizer`. 

- Объект `catAndDogFetcher` содержит метод `fetchAll()`, который запрашивает объект с животными и возвращает `Promise` с уже отсортированым по количеству лайков массивом животных.
- Объект `magicalCatRecognizer` содержит метод `recognize(animalObject)`, который на вход принимает объект с животным и возвращает `Promise` c `true`, если это кот, или c `false`, если это не кот.

Найдите трёх котов с наибольшим количеством лайков. Сделайте так, чтобы все проверки в тренажёре проходили успешно.

Не читерите :)

## Подсказка

Вспомните, как в JS реализуется асинхронность.

1. Получите объект с животными. Для этого вспомните, как в JS можно получить данные из `Promise`.

2. Получите трёх котов с наибольшим количеством лайков.

## Текст успешного прохождения

Отлично! В JS есть три способа работы с асинхронным кодом — `callback`, `promise`, `async-await` — которые позволяют не блокировать основной поток выполнения.

