# Get Things Done Front End

## What's in this repo?

This repository showcases my abilities as a System Engineer. It contains a simple app for task management, encompassing a full CI/CD pipeline. The implementation includes continuous integration, trunk-based development, component testing, end-to-end testing, unit testing, build processes, release processes, and versioning processes. It adheres to good practices such as Clean Code and TDD (Test-Driven Development).

## Technologies involved

The technologies used include React.js 18, TypeScript, Vite, Storybook, Styled Components, CSS, Firebase, GitHub Actions, Docker, Docker-Compose, Bash scripting, Cypress, React Testing Library, Babel, Jest, Prettier, and Axios.

### Why React.js 18, TypeScript, Vite, Storybook, Styled Components, CSS?

The idea behind using React.js 18, TypeScript, Vite, Storybook, and Styled Components is to create a small project that is easy to manage and update. To achieve this, it's crucial to maintain all the logic in the same language. With this combination of technologies, I am capable of coding primarily in TypeScript, ensuring consistency and efficiency throughout the project.

## Practicies

### How Does CI/CD Work?

To answer this question, we first need to define what we seek in a pipeline. We can say that a pipeline is a unique way to release software to users, where the approach is clear, understandable, reliable, and repeatable. Additionally, a pipeline helps us verify and trace our changes.

To achieve that, I follow a structure with the following steps:

### Preparation:

Here, we install all the dependencies and configure the app for later use in the pipeline. The idea is to use the same set of dependencies and configurations to ensure we have installed everything we need!

In the pipeline of this repo, this step is achieved in the job `install-dep`.

### Validation:

In this step, we want to ensure that our code can run and be understood by the rest of the team members. Generally, here we run lint validation, execute unit tests, and generate evidence of the results, e.g., test coverage.

In the pipeline of this repo, this step is achieved in the jobs lint, test, and `component_testing`.

### Building:

In this step, our aim is to create our binary or package to be released in all the environments we have. The idea is to generate ONE binary file/package/release to be promoted throughout the deployment process. Simultaneously, this process makes this result available to others, e.g., pushing a package into a repository or a Docker image into DockerHub.

In the pipeline of this repo, this step is achieved in the jobs `build`, `version`, and `creating_release`.

### Verification:

Similar to the Validation step, but with a difference, here we want to run Acceptance Tests. Acceptance tests are those tests which exercise the whole app, including integration with the database, authentication, etc. We run the minimum tests needed to ensure the app is running with the new changes and does not disrupt the app's flow.

In the pipeline of this repo, this step is achieved in the job `end_to_end_testing`.

### Deployment:

Finally, we can deploy our app into the environment we selected! In this step, we aim to run all the necessary processes to deploy our binaries into a new environment (usually production). The output of the result is stored to be read in the future if necessary.

In the pipeline of this repo, this step is achieved in the job `deploy_on_firebase`.

### Deployment Is Not the Same as Release:

After all these steps, your changes and code are in a new environment, but that does not mean the users can see it! Deploying a change ensures your code is running in a new `PC`, different from yours. Release means all users of your app can use your new code and changes. This difference is important because in other types of apps, it involves further actions and processes to achieve. In this case, we use `Continuous Integration` and `Trunk-Based Development`, meaning all changes in main/master are deployed and released in `production`.
