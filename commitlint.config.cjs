// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Dennis S. Richard Richter <richter@vivaldi.net>

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-max-line-length': [1, 'always', 255],
    }
};
