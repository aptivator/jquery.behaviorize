export default [
  [/([\w-]+)(?=\s*\:)/gi, '"$1"'],
  [/\'/g, '"'],
  [/\"\s*\"/g, 'null']
];
