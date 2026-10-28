// Necessário para o Jest entender a sintaxe moderna (import/export e JSX).
// O Expo usa o mesmo preset ao empacotar o app.
module.exports = function (api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'] };
};
