#!/usr/bin/env node
"use strict";

// Compatibility entry point retained for older local commands and documentation.
// Coordination policy is verified canonically by verify-coordination-system.js;
// documentation authority and stale-text checks belong to
// verify-documentation-consistency.js. Do not rebuild a parallel policy engine here.
require("./verify-coordination-system");
