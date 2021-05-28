const core = require('@actions/core');

try {
  const regexPattern = core.getInput('regex_pattern');
  const regexFlags = core.getInput('regex_flags');
  const searchString = core.getInput('search_string');
  const returnGlobalOrFirst = core.getInput('return_global_or_first_match');
  if (!regexPattern) {
    core.setFailed('regex_pattern input is required');
    return;
  }
  if (!regexFlags) {
    core.setFailed('regex_flags input is required');
    return;
  }
  if (!searchString) {
    core.setFailed('search_string input is required');
    return;
  }
  if (!returnGlobalOrFirst) {
    core.setFailed('return_global_or_first_match input is required');
    return;
  }
  if (returnGlobalOrFirst !== 'global' && returnGlobalOrFirst !== 'first') {
    core.info(`return_global_or_first_match: ${return_global_or_first_match}`);
    core.setFailed('return_global_or_first_match param should be "global" or "first"');
    return;
  }
  const regex = new RegExp(regexPattern, regexFlags);
  const matches = searchString.match(regex);
  if (!matches) {
    core.info(`Could not find any matches`);
    return;
  }
  core.info(`Found: ${matches}`);
  core.info(`First match: ${matches[0]}`);
  if(returnGlobalOrFirst === 'global') {
    const matchStr = matches.join(', ');
    core.info(`set output global match: ${matchStr}`);
    core.setOutput('match', matchStr);
  } else {
    core.info(`ALL "match": ${matches}`);
    core.info(`FIRST "match": ${matches[0]}`);
    core.setOutput('match', matches[0]);
  }
} catch (error) {
  core.setFailed(error.message);
}
