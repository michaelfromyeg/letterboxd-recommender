# AWS

Helpful links and pointers for the AWS resources this project is using.

## Usage

0. Populate `env.json` with your `OPEN_API_KEY` and `TMDB_API_KEY`
1. Install [AWS SAM CLI](https://github.com/aws/aws-sam-cli/), e.g., `brew install aws-sam-cli`
2. Ensure [Docker](https://docker.com) is installed and running
3. Build the project:

    ```sh
    sam build
    ```

4. Invoke the AWS Lambda Function locally with:

    ```sh
    sam local invoke --event event.json --env-vars env.json
    ```

5. For usage with the front-end, run:

    ```sh
    sam local start-lambda
    ```

These commands are made more accessible via the provided `Makefile`.

## Notes

Imports to source code within the TypeScript project need to have the `.js` file extension. I know, it sucks.
