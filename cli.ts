import { spawnSync } from 'child_process';
import * as prompts from 'prompts';
import { EIPCMethod, EMockDataSize } from 'ipc-benchmark-testing-types';

type SettingsParameter = 'ipcMethod' | 'mockDataSize' | 'variety';

const main = async () => {
  const questions: prompts.PromptObject<SettingsParameter>[] = [
    {
      type: 'select',
      name: 'ipcMethod',
      message: 'Which IPC method to run?',
      choices: [
        ...Object.values(EIPCMethod).map(method => ({
          title: method,
          value: method,
        })),
        { title: 'Full test suite', value: 'fullTestSuite' },
      ],
    },
    {
      type: (_, values) =>
        values.ipcMethod === 'fullTestSuite' ? null : 'select',
      name: 'mockDataSize',
      message: 'Which mock data size to run?',
      choices: [
        ...Object.values(EMockDataSize).map(size => ({
          title: size,
          value: size,
        })),
      ],
    },
    {
      type: (_, values) =>
        values.ipcMethod === 'fullTestSuite' ? null : 'select',
      name: 'variety',
      message: 'Inside Docker or raw?',
      choices: [
        { title: 'Docker', value: 'docker' },
        { title: 'Raw', value: 'raw' },
      ],
    },
  ];

  const config = await prompts(questions);

  const spawnCommand =
    config.ipcMethod === 'fullTestSuite'
      ? 'npm run full-test-suite'
      : `MOCK_DATA_SIZE=${config.mockDataSize} npm run test:${
          config.ipcMethod
        }${config.variety === 'raw' ? ':raw' : ''}`;

  spawnSync(spawnCommand, {
    shell: true,
    stdio: 'inherit',
  });

  const { shouldContinue } = await prompts({
    type: 'confirm',
    name: 'shouldContinue',
    message: 'Run again?',
    initial: true,
  });

  if (shouldContinue) {
    main();
  }
};

main();
