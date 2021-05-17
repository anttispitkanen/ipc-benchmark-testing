# !/bin/bash

NPM_TEST_COMMANDS=('test:benchmark' 'test:http' 'test:http-express-axios')

MOCK_DATA_SIZES=('small' 'medium' 'large')

# Run each test permutation 5 times

for command in "${NPM_TEST_COMMANDS[@]}"; do
  for size in "${MOCK_DATA_SIZES[@]}"; do
    for i in {1..5}; do
      MOCK_DATA_SIZE=$size npm run $command
    done
  done
done
