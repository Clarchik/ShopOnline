import * as shell from 'shelljs';

shell.cp('-R', './ejs/', '../../dist/server/ejs');
shell.cp('-R', './views/', '../../dist/server/views');
