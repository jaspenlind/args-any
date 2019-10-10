# option-parser

- Utility lib for parsing command options

## Installation

```sh
npm install option-parser
```

## Test

```sh
npm test
```

## Usage

### Parse command line arguments to a map

```ts
import parser from "option-parser";

const args = ["-singleDashOption", "value1", "--doubleDashOption", "value2", "otherarg"];

const options = parser.parse(args);

const single = options.get("singleDashOption");
==> "value1"

const double = options.get("doubleDashOption");
==> "value2"

const otherArg = options.has("otherarg");
==> false
```

### Map command line arguments to a partial interface

```ts
import parser from "option-parser";

interface Server {
  name: string;
  memorySize: number;
  isClustered: boolean;
  location: string;
}

const args = ["-name", "server 1", "-memorySize", "1024" , "-isClustered", "true"];

const server = parser.parse(args).asPartial<Server>();

==> {
  name: "server 1",
  memorySize: 1024,
  isClustered: true
};
```

### Filter a list based on partial properties

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

const filtered = parser.parse(["-memorySize", "2048"]).filter(...servers);

==> [{
  name: "name1"
  ...
}, {
  name: "name2"
  ...
}
]
```
