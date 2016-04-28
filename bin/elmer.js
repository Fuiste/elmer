#!/usr/bin/env node

'use strict';

process.title = 'elmer';

var Elmer = require('../app/proc');

Elmer.run(process.argv);
