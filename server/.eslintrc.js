module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
    },
    "overrides": [
        {
            "files": ["*.test.js"],
            "rules": {
                "no-unused-expressions": "off",
                "no-undef": "off",
                "no-unused-vars": "off"
            }
        }
    ]
};