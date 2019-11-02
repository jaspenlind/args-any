# option-parser

## Utility lib for parsing command options

[![Build Status](https://travis-ci.com/jaspenlind/option-parser.svg?branch=master)](https://travis-ci.com/jaspenlind/option-parser)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d59c0c25d1434d5d905e8933856142a1)](https://www.codacy.com/manual/jaspenlind/option-parser?utm_source=github.com&utm_medium=referral&utm_content=jaspenlind/option-parser&utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/jaspenlind/option-parser/badge.svg?branch=master)](https://coveralls.io/github/jaspenlind/option-parser?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![David](https://img.shields.io/david/jaspenlind/option-parser)
![GitHub](https://img.shields.io/github/license/jaspenlind/option-parser)

## Installation

```sh
npm install option-parser
```

## Test

```sh
npm test
```

## Usage

### Parse arguments to a map

```ts
import { parse } from "option-parser";
const args = ["-option1", "value1", "-option2>4", "-option3 lt 5"]

const options = parse(args);

options.has("option1");
==> true

options.get("option2");
==> {
  key: "option2",
  operator: Operator.Gt,
  value: "4"
}
```

### Map arguments to a partial type

```ts
import { parse } from "option-parser";

const args = ["-name", "server 1", "-memorySize", "1024" , "-isClustered", "true"];

interface Server {
  name: string;
  memorySize: number;
  isClustered: boolean;
  location: string;
}

const server = parse(args).asPartial<Server>();

==> {
  name: "server 1",
  memorySize: 1024,
  isClustered: true
};
```

### Filter a list based on arguments

```ts
const servers = [{
  name: "name 1",
  memorySize: 2048
}, {
  name: "name 2",
  memorySize: 2048
}, {
  name: "name 3",
  memorySize: 512
}];

const filtered = parse(["-memorySize=2048"]).filter(...servers);

==> [{
  name: "name1"
  ...
}, {
  name: "name2"
  ...
}
]
```
