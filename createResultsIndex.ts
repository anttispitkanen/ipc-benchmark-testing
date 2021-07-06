import * as fs from 'fs';
import * as path from 'path';

/**
 * Create an index (array of file names) of analyzed results files to be published
 * in the results branch. This file can then be fetched by the UI as an index of
 * available results files, that can then be individually be fetched.
 */
const createResultsIndex = async () => {
  try {
    const files = await fs.promises.readdir(path.join('results'));

    // const analyzedFiles = files.filter(file => /.analyzed.json/.test(file));
    const analyzedFiles = files; // FIXME: change when on-the-fly analysis is implemented

    fs.writeFileSync(
      path.join('results', 'index.json'),
      JSON.stringify(analyzedFiles, null, 2),
    );
  } catch (err) {
    console.error(err);
  }
};

createResultsIndex();
