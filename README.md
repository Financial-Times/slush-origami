# Slush Origami [![CircleCI](https://circleci.com/gh/Financial-Times/slush-origami.svg?style=svg)](https://circleci.com/gh/Financial-Times/slush-origami)[![codecov](https://codecov.io/gh/Financial-Times/slush-origami/branch/master/graph/badge.svg)](https://codecov.io/gh/Financial-Times/slush-origami)


> Slush generator for rapidly scaffolding Origami components


## Getting Started

Install `slush-origami` globally:

```bash
$ npm install -g @Financial-Times/slush-origami
```

### Usage

Create a new folder for your component:

```bash
$ mkdir o-llama
```

Run the generator from within the new folder:

```bash
$ cd o-llama && slush origami
```

## Features

* Ability to scaffold with or without Sass or JS
* Ability to scaffold ES6 classes, stateless components or higher-order components
* Scaffolds unit tests when JavaScript is included
* Choose your assertion library — Chai or Proclaim
* Choose your polyfill service requirements from the scaffolder

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/aendrew/slush-origami/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/aendrew/slush-origami/issues).

## License

The MIT License

Copyright (c) 2017 Financial Times

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
