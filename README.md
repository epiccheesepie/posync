# posync
Синхронизация приложения с POEditor

```js
  const po = POEditor.create();

  po.getTerms(); // выгрузка переводов из POEditor в локальные файлы
  po.deleteTerms(); // удаление ключей из POEditor, которых нет в локальных файлов
  po.uploadTranslates(); // загрузка новых ключей/переводов в POEditor (имеющиеся ключи в POEditor не меняются)
```

